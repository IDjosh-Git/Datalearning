-- Data Analysis Learning Path — optional cloud-progress schema.
-- Apply only to the intended Supabase project configured in assets/supabase-config.js.
-- The project is shared by other applications: keep its existing Auth Site URL; add
-- your learning domain under Auth > URL Configuration > Redirect URLs instead.
-- Creates only learning-specific tables; does not touch portfolio, library or auth triggers.
-- Safe to rerun after reviewing and backing up your existing project.
create table if not exists public.course_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check(course_slug in ('introduction','excel','sql','powerbi')),
 week_no integer not null check(week_no between 1 and 10),
 completed boolean not null default false,
 completed_at timestamptz,
 updated_at timestamptz not null default now(),
 primary key(user_id,course_slug,week_no)
);
create table if not exists public.quiz_results (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check(course_slug in ('excel','sql','powerbi')),
 week_no integer not null check(week_no between 1 and 10),
 score integer not null check(score>=0),
 answered integer not null check(answered>=0),
 total integer not null check(total>0),
 percentage integer not null check(percentage between 0 and 100),
 submitted_at timestamptz not null default now(),
 primary key(user_id,course_slug,week_no)
);
create table if not exists public.certificates (
 certificate_id text primary key check(certificate_id ~ '^(IJL-(EXL|PBI|SQL)-[0-9]{8}-[A-F0-9]{6}|DALP-(EXL|PBI|SQL)-[0-9]{8}-[A-F0-9]{12})$'),
 user_id uuid not null references auth.users(id) on delete cascade,
 learner_name text not null,
 course_slug text not null check(course_slug in ('excel','sql','powerbi')),
 course_title text not null,
 completion_date date not null default current_date,
 issued_at timestamptz not null default now(),
 status text not null default 'active' check(status in ('active','revoked'))
);
create index if not exists course_progress_user_idx on public.course_progress(user_id);
create index if not exists quiz_results_user_idx on public.quiz_results(user_id);
create index if not exists certificates_user_idx on public.certificates(user_id);
alter table public.course_progress enable row level security;
alter table public.quiz_results enable row level security;
alter table public.certificates enable row level security;
revoke all on public.course_progress,public.quiz_results,public.certificates from anon,authenticated;
grant select,insert,update,delete on public.course_progress to authenticated;
grant select,insert,update on public.quiz_results to authenticated;
grant select,insert on public.certificates to authenticated;

drop policy if exists progress_select_own on public.course_progress;
create policy progress_select_own on public.course_progress for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists progress_insert_own on public.course_progress;
create policy progress_insert_own on public.course_progress for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists progress_update_own on public.course_progress;
create policy progress_update_own on public.course_progress for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
drop policy if exists progress_delete_own on public.course_progress;
create policy progress_delete_own on public.course_progress for delete to authenticated using ((select auth.uid())=user_id);

drop policy if exists quiz_select_own on public.quiz_results;
create policy quiz_select_own on public.quiz_results for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists quiz_insert_own on public.quiz_results;
create policy quiz_insert_own on public.quiz_results for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists quiz_update_own on public.quiz_results;
create policy quiz_update_own on public.quiz_results for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

drop policy if exists certificates_select_own on public.certificates;
create policy certificates_select_own on public.certificates for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists certificates_insert_when_complete on public.certificates;
create policy certificates_insert_when_complete on public.certificates for insert to authenticated with check (
 (select auth.uid())=user_id and
 (select count(*) from public.course_progress p where p.user_id=(select auth.uid()) and p.course_slug=certificates.course_slug and p.completed=true)>=10
);
-- Public verification reads only limited fields for an exact, active record ID.
-- Keep elevated lookup logic in an UNEXPOSED schema. Public SECURITY INVOKER
-- wrappers are used because Supabase exposes the public schema by default.
create schema if not exists learning_private;
revoke all on schema learning_private from public;
grant usage on schema learning_private to anon,authenticated;
create or replace function learning_private.lookup_completion_record(p_certificate_id text)
returns table(certificate_id text,learner_name text,course_title text,completion_date date,status text,issued_at timestamptz)
language sql stable security definer set search_path=''
as $$ select c.certificate_id,c.learner_name,c.course_title,c.completion_date,c.status,c.issued_at
  from public.certificates c where c.certificate_id=p_certificate_id and c.status='active' limit 1; $$;
revoke all on function learning_private.lookup_completion_record(text) from public;
grant execute on function learning_private.lookup_completion_record(text) to anon,authenticated;
create or replace function public.verify_certificate(p_certificate_id text)
returns table(certificate_id text,learner_name text,course_title text,completion_date date,status text,issued_at timestamptz)
language sql stable security invoker set search_path=''
as $$ select * from learning_private.lookup_completion_record(p_certificate_id); $$;
revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon,authenticated;

-- ======================================================================
-- V3: Owner-reviewed capstones. No AI assessor, cron or delayed publication.
-- Existing learning data, historical submissions and certificates are retained.
-- ======================================================================
create table if not exists public.capstone_reviewers (
 user_id uuid primary key references auth.users(id) on delete cascade,
 added_at timestamptz not null default now()
);
alter table public.capstone_reviewers enable row level security;
revoke all on public.capstone_reviewers from anon,authenticated;
grant select on public.capstone_reviewers to authenticated;
drop policy if exists capstone_reviewers_select_own on public.capstone_reviewers;
create policy capstone_reviewers_select_own on public.capstone_reviewers
 for select to authenticated using (user_id=(select auth.uid()));
-- No INSERT/UPDATE/DELETE granted to website users. Add the owner via SQL
-- Editor using OWNER_SETUP.sql after finding their Auth user ID.

create table if not exists public.capstone_submissions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check(course_slug in ('excel','sql','powerbi')),
 learner_name text not null check(length(btrim(learner_name)) between 3 and 90),
 project_title text not null check(length(btrim(project_title)) between 5 and 110),
 project_summary text not null check(length(btrim(project_summary)) between 80 and 4000),
 attachments jsonb not null check(jsonb_typeof(attachments)='array' and jsonb_array_length(attachments) between 1 and 4),
 status text not null default 'submitted' check(status in ('submitted','processing','review_error','approved','needs_revision','needs_manual_review')),
 created_at timestamptz not null default now(),
 review_due_at timestamptz not null default now() + interval '5 days', -- instructor target, NOT a grade-release gate
 review_started_at timestamptz,
 reviewed_at timestamptz,
 review_attempts integer not null default 0 check(review_attempts between 0 and 10),
 score integer check(score between 0 and 100),
 score_breakdown jsonb not null default '{}'::jsonb,
 review_summary text,
 strengths jsonb not null default '[]'::jsonb,
 improvements jsonb not null default '[]'::jsonb,
 next_steps jsonb not null default '[]'::jsonb,
 evidence_notes text,
 review_error_detail text,
 reviewed_by uuid references auth.users(id) on delete set null,
 certificate_id text references public.certificates(certificate_id) on delete set null
);
alter table public.capstone_submissions add column if not exists reviewed_by uuid references auth.users(id) on delete set null;
create index if not exists capstone_due_idx on public.capstone_submissions(status,review_due_at);
create index if not exists capstone_learner_idx on public.capstone_submissions(user_id,course_slug,created_at desc);
create unique index if not exists capstone_one_active_per_course on public.capstone_submissions(user_id,course_slug)
 where status in ('submitted','processing','review_error','approved');

-- All user-supplied grading fields are overwritten on insertion.
-- Evidence paths must belong to the authenticated learner's new submission.
create or replace function public.capstone_on_insert()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare f jsonb;
begin
 new.status := 'submitted'; new.created_at := now();
 new.review_due_at := now() + interval '5 days'; -- expected turnaround, not automatic assessment
 new.review_started_at := null; new.reviewed_at := null; new.review_attempts := 0;
 new.score := null; new.score_breakdown := '{}'::jsonb;
 new.review_summary := null; new.strengths := '[]'::jsonb;
 new.improvements := '[]'::jsonb; new.next_steps := '[]'::jsonb;
 new.evidence_notes := null; new.review_error_detail := null;
 new.reviewed_by := null; new.certificate_id := null;
 for f in select value from jsonb_array_elements(new.attachments)
 loop
  if jsonb_typeof(f) <> 'object' or
     left(coalesce(f->>'path',''),length(new.user_id::text || '/' || new.id::text || '/')) <> new.user_id::text || '/' || new.id::text || '/' or
     coalesce(f->>'name','') = '' or
     coalesce(f->>'size','') !~ '^[0-9]{1,10}$' or
     (f->>'size')::bigint > 12582912
  then raise exception 'Invalid evidence attachment or ownership path'; end if;
 end loop;
 return new;
end $$;
drop trigger if exists set_capstone_submission_defaults on public.capstone_submissions;
create trigger set_capstone_submission_defaults before insert on public.capstone_submissions
 for each row execute function public.capstone_on_insert();

alter table public.capstone_submissions enable row level security;
revoke all on public.capstone_submissions from anon,authenticated;
grant select,insert on public.capstone_submissions to authenticated;
drop policy if exists capstone_read_own on public.capstone_submissions;
create policy capstone_read_own on public.capstone_submissions for select to authenticated
 using (user_id=(select auth.uid()));
drop policy if exists capstone_read_reviewer on public.capstone_submissions;
create policy capstone_read_reviewer on public.capstone_submissions for select to authenticated
 using (exists(select 1 from public.capstone_reviewers a where a.user_id=(select auth.uid())));
drop policy if exists capstone_insert_after_course on public.capstone_submissions;
create policy capstone_insert_after_course on public.capstone_submissions for insert to authenticated
 with check (user_id=(select auth.uid()) and
  (select count(*) from public.course_progress cp
   where cp.user_id=(select auth.uid()) and cp.course_slug=capstone_submissions.course_slug and cp.completed=true)=10);

-- Only the learner and the allowlisted owner can fetch a private evidence file.
insert into storage.buckets(id,name,public,file_size_limit)
values ('capstone-evidence','capstone-evidence',false,12582912)
on conflict (id) do update set public=false,file_size_limit=12582912;
drop policy if exists capstone_evidence_upload_own on storage.objects;
create policy capstone_evidence_upload_own on storage.objects for insert to authenticated
 with check (bucket_id='capstone-evidence' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists capstone_evidence_read_own on storage.objects;
create policy capstone_evidence_read_own on storage.objects for select to authenticated
 using (bucket_id='capstone-evidence' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists capstone_evidence_read_reviewer on storage.objects;
create policy capstone_evidence_read_reviewer on storage.objects for select to authenticated
 using (bucket_id='capstone-evidence' and exists(select 1 from public.capstone_reviewers a where a.user_id=(select auth.uid())));
drop policy if exists capstone_evidence_remove_own on storage.objects;
create policy capstone_evidence_remove_own on storage.objects for delete to authenticated
 using (bucket_id='capstone-evidence' and (storage.foldername(name))[1]=(select auth.uid())::text);

-- Learners cannot manufacture a completion certificate from browser progress.
drop policy if exists certificates_insert_when_complete on public.certificates;
revoke insert,update,delete on public.certificates from authenticated;
grant select on public.certificates to authenticated;
alter table public.certificates add column if not exists capstone_submission_id uuid
 references public.capstone_submissions(id) on delete set null;

-- Remove the v2 automated reviewer functions if this script is run as an upgrade.
drop function if exists public.claim_due_capstones(integer);
drop function if exists public.issue_capstone_certificate(uuid);

-- One atomic owner-only action: check scoring rubric, publish feedback and
-- (for a passing project) register a certificate immediately. No five-day gate.
create or replace function learning_private.publish_capstone_review(
 p_submission_id uuid,
 p_scores jsonb,
 p_summary text,
 p_strengths text[],
 p_improvements text[],
 p_next_steps text[],
 p_evidence_notes text default null
)
returns table(submission_id uuid,published_score integer,review_status text,issued_certificate_id text)
language plpgsql security definer set search_path = '' as $$
declare s public.capstone_submissions%rowtype;
 rubric text[] := array['problem_and_objectives','data_preparation_and_quality','technical_execution','analysis_and_insights','communication_and_evidence'];
 maxima integer[] := array[25,20,20,20,15];
 i integer; n integer; total integer := 0; v_status text; v_id text; v_course_title text; v_code text;
begin
 if (select auth.uid()) is null or not exists(
  select 1 from public.capstone_reviewers a where a.user_id=(select auth.uid())
 ) then raise exception 'Only the authorised capstone reviewer can publish an assessment' using errcode='42501'; end if;
 if p_submission_id is null then raise exception 'Choose a submission'; end if;
 if p_scores is null or jsonb_typeof(p_scores)<>'object' or
   (select count(*) from jsonb_object_keys(p_scores))<>5
 then raise exception 'All five rubric scores are required'; end if;
 for i in 1..5 loop
  if not (p_scores ? rubric[i]) or jsonb_typeof(p_scores->rubric[i])<>'number' or
    (p_scores->>rubric[i]) !~ '^[0-9]{1,3}$'
  then raise exception 'Invalid rubric score: %',rubric[i]; end if;
  n := (p_scores->>rubric[i])::integer;
  if n<0 or n>maxima[i] then raise exception 'Rubric score out of range: %',rubric[i]; end if;
  total := total+n;
 end loop;
 if length(btrim(coalesce(p_summary,''))) not between 20 and 4000 then
  raise exception 'Write a summary of 20–4000 characters'; end if;
 if length(coalesce(p_evidence_notes,''))>2000 or
    coalesce(array_length(p_strengths,1),0)>10 or
    coalesce(array_length(p_improvements,1),0)>10 or
    coalesce(array_length(p_next_steps,1),0)>10
 then raise exception 'Feedback is too long'; end if;
 select * into s from public.capstone_submissions c where c.id=p_submission_id for update;
 if not found then raise exception 'Submission not found'; end if;
 if s.status not in ('submitted','processing','review_error','needs_manual_review') then
  raise exception 'This submission has already been assessed'; end if;
 if (select count(*) from public.course_progress cp
     where cp.user_id=s.user_id and cp.course_slug=s.course_slug and cp.completed=true)<>10
 then raise exception 'Ten synced weeks are required before publishing'; end if;
 v_status := case when total>=70 then 'approved' else 'needs_revision' end;
 update public.capstone_submissions c set
  score=total,score_breakdown=p_scores,status=v_status,review_summary=btrim(p_summary),
  strengths=to_jsonb(coalesce(p_strengths,array[]::text[])),
  improvements=to_jsonb(coalesce(p_improvements,array[]::text[])),
  next_steps=to_jsonb(coalesce(p_next_steps,array[]::text[])),
  evidence_notes=nullif(btrim(coalesce(p_evidence_notes,'')),''),reviewed_at=now(),reviewed_by=(select auth.uid()),
  review_error_detail=null
 where c.id=s.id;
 if total>=70 then
  perform pg_advisory_xact_lock(hashtext(s.user_id::text || ':' || s.course_slug)::bigint);
  select c.certificate_id into v_id from public.certificates c
  where c.user_id=s.user_id and c.course_slug=s.course_slug and c.status='active'
  order by c.issued_at desc limit 1;
  if v_id is null then
   v_course_title := case s.course_slug when 'excel' then 'Excel Data Analysis'
    when 'sql' then 'SQL for Data Analytics' else 'Power BI' end;
   v_code := case s.course_slug when 'excel' then 'EXL' when 'sql' then 'SQL' else 'PBI' end;
   v_id := 'DALP-'||v_code||'-'||to_char(current_date,'YYYYMMDD')||'-'||upper(substr(md5(gen_random_uuid()::text),1,12));
   insert into public.certificates(certificate_id,user_id,learner_name,course_slug,course_title,completion_date,issued_at,status,capstone_submission_id)
   values (v_id,s.user_id,s.learner_name,s.course_slug,v_course_title,current_date,now(),'active',s.id);
  end if;
  update public.capstone_submissions c set certificate_id=v_id where c.id=s.id;
 end if;
 return query select s.id,total,v_status,v_id;
end $$;
revoke all on function learning_private.publish_capstone_review(uuid,jsonb,text,text[],text[],text[],text) from public,anon,authenticated;
grant execute on function learning_private.publish_capstone_review(uuid,jsonb,text,text[],text[],text[],text) to authenticated;

-- Expose only a thin public, invoker-rights RPC; it delegates to the protected
-- function in a NON-exposed schema, which checks the logged-in user against
-- the reviewer allowlist before touching any learner data.
create or replace function public.submit_capstone_review(
 p_submission_id uuid,p_scores jsonb,p_summary text,
 p_strengths text[],p_improvements text[],p_next_steps text[],p_evidence_notes text default null
)
returns table(submission_id uuid,published_score integer,review_status text,issued_certificate_id text)
language sql security invoker set search_path = '' as $$
 select * from learning_private.publish_capstone_review(
  p_submission_id,p_scores,p_summary,p_strengths,p_improvements,p_next_steps,p_evidence_notes
 );
$$;
revoke all on function public.submit_capstone_review(uuid,jsonb,text,text[],text[],text[],text) from public,anon,authenticated;
grant execute on function public.submit_capstone_review(uuid,jsonb,text,text[],text[],text[],text) to authenticated;

-- Limited public certificate verification by exact certificate ID only.
create or replace function learning_private.lookup_capstone_score(p_certificate_id text)
returns table(capstone_score integer,reviewed_at timestamptz)
language sql stable security definer set search_path = '' as $$
 select s.score,s.reviewed_at from public.certificates c
 join public.capstone_submissions s on s.id=c.capstone_submission_id
 where c.certificate_id=p_certificate_id and c.status='active' and s.status='approved'
 limit 1;
$$;
revoke all on function learning_private.lookup_capstone_score(text) from public;
grant execute on function learning_private.lookup_capstone_score(text) to anon,authenticated;
create or replace function public.verify_capstone(p_certificate_id text)
returns table(capstone_score integer,reviewed_at timestamptz)
language sql stable security invoker set search_path = '' as $$
 select * from learning_private.lookup_capstone_score(p_certificate_id);
$$;
revoke all on function public.verify_capstone(text) from public;
grant execute on function public.verify_capstone(text) to anon,authenticated;


-- V5: Introduction progress is now cloud-synced across devices.
-- It is tracked for learning analytics only and never qualifies for a certificate.
do $$
begin
 if exists(select 1 from pg_constraint where conrelid='public.course_progress'::regclass and conname='course_progress_course_slug_check') then
  alter table public.course_progress drop constraint course_progress_course_slug_check;
 end if;
 alter table public.course_progress add constraint course_progress_course_slug_check
  check(course_slug in ('introduction','excel','sql','powerbi'));
exception when duplicate_object then null;
end $$;

-- ======================================================================
-- V4: Instructor-only learner progress reporting.
-- Keeps learner-owned RLS unchanged; instructor access is provided only
-- through protected RPC functions that verify capstone_reviewers.
-- ======================================================================
create or replace function learning_private.instructor_progress_overview()
returns table(
 learner_user_id uuid,
 learner_name text,
 learner_email text,
 course_slug text,
 completed_weeks integer,
 progress_percent integer,
 quizzes_taken integer,
 quiz_average integer,
 capstone_status text,
 capstone_score integer,
 certificate_id text,
 last_activity timestamptz
)
language plpgsql stable security definer set search_path = '' as $$
begin
 if (select auth.uid()) is null or not exists(
  select 1 from public.capstone_reviewers r where r.user_id=(select auth.uid())
 ) then
  raise exception 'Only the authorised instructor can view learner progress' using errcode='42501';
 end if;

 return query
 with learning_activity as (
  select cp.user_id,cp.course_slug from public.course_progress cp
  union
  select qr.user_id,qr.course_slug from public.quiz_results qr
  union
  select cs.user_id,cs.course_slug from public.capstone_submissions cs
  union
  select c.user_id,c.course_slug from public.certificates c
 ), active_tracks as (
  select distinct la.user_id,la.course_slug from learning_activity la
 )
 select
  a.user_id as learner_user_id,
  coalesce(
   (select cs.learner_name from public.capstone_submissions cs where cs.user_id=a.user_id order by cs.created_at desc limit 1),
   (select c.learner_name from public.certificates c where c.user_id=a.user_id order by c.issued_at desc limit 1),
   nullif(btrim(coalesce(u.raw_user_meta_data->>'full_name','')),''),
   nullif(split_part(coalesce(u.email,''),'@',1),''),
   'Learner'
  )::text as learner_name,
  coalesce(u.email,'')::text as learner_email,
  a.course_slug::text,
  (select count(*)::integer from public.course_progress cp where cp.user_id=a.user_id and cp.course_slug=a.course_slug and cp.completed=true) as completed_weeks,
  round((select count(*)::numeric from public.course_progress cp where cp.user_id=a.user_id and cp.course_slug=a.course_slug and cp.completed=true) / (case when a.course_slug='introduction' then 8 else 10 end) * 100)::integer as progress_percent,
  (select count(*)::integer from public.quiz_results qr where qr.user_id=a.user_id and qr.course_slug=a.course_slug) as quizzes_taken,
  coalesce((select round(avg(qr.percentage))::integer from public.quiz_results qr where qr.user_id=a.user_id and qr.course_slug=a.course_slug),0) as quiz_average,
  (select cs.status from public.capstone_submissions cs where cs.user_id=a.user_id and cs.course_slug=a.course_slug order by cs.created_at desc limit 1)::text as capstone_status,
  (select cs.score from public.capstone_submissions cs where cs.user_id=a.user_id and cs.course_slug=a.course_slug order by cs.created_at desc limit 1)::integer as capstone_score,
  (select c.certificate_id from public.certificates c where c.user_id=a.user_id and c.course_slug=a.course_slug and c.status='active' order by c.issued_at desc limit 1)::text as certificate_id,
  (select max(x.activity_at) from (
    select max(cp.updated_at) as activity_at from public.course_progress cp where cp.user_id=a.user_id and cp.course_slug=a.course_slug
    union all
    select max(qr.submitted_at) from public.quiz_results qr where qr.user_id=a.user_id and qr.course_slug=a.course_slug
    union all
    select max(coalesce(cs.reviewed_at,cs.created_at)) from public.capstone_submissions cs where cs.user_id=a.user_id and cs.course_slug=a.course_slug
    union all
    select max(c.issued_at) from public.certificates c where c.user_id=a.user_id and c.course_slug=a.course_slug
   ) x) as last_activity
 from active_tracks a
 join auth.users u on u.id=a.user_id
 order by 2,4;
end $$;
revoke all on function learning_private.instructor_progress_overview() from public,anon,authenticated;
grant execute on function learning_private.instructor_progress_overview() to authenticated;

create or replace function public.instructor_progress_overview()
returns table(
 learner_user_id uuid,
 learner_name text,
 learner_email text,
 course_slug text,
 completed_weeks integer,
 progress_percent integer,
 quizzes_taken integer,
 quiz_average integer,
 capstone_status text,
 capstone_score integer,
 certificate_id text,
 last_activity timestamptz
)
language sql stable security invoker set search_path = '' as $$
 select * from learning_private.instructor_progress_overview();
$$;
revoke all on function public.instructor_progress_overview() from public,anon,authenticated;
grant execute on function public.instructor_progress_overview() to authenticated;

create or replace function learning_private.instructor_progress_detail(p_user_id uuid,p_course_slug text)
returns table(
 week_no integer,
 completed boolean,
 completed_at timestamptz,
 quiz_percentage integer,
 quiz_score integer,
 quiz_total integer,
 quiz_submitted_at timestamptz
)
language plpgsql stable security definer set search_path = '' as $$
begin
 if (select auth.uid()) is null or not exists(
  select 1 from public.capstone_reviewers r where r.user_id=(select auth.uid())
 ) then
  raise exception 'Only the authorised instructor can view learner progress' using errcode='42501';
 end if;
 if p_user_id is null or p_course_slug is null or p_course_slug not in ('introduction','excel','sql','powerbi') then
  raise exception 'Invalid learner or course';
 end if;
 if not exists(
  select 1 from public.course_progress cp where cp.user_id=p_user_id and cp.course_slug=p_course_slug
  union all
  select 1 from public.quiz_results qr where qr.user_id=p_user_id and qr.course_slug=p_course_slug
  union all
  select 1 from public.capstone_submissions cs where cs.user_id=p_user_id and cs.course_slug=p_course_slug
  union all
  select 1 from public.certificates c where c.user_id=p_user_id and c.course_slug=p_course_slug
 ) then
  raise exception 'No learning activity found for this learner and course';
 end if;
 return query
 select
  g.week_no::integer,
  coalesce(cp.completed,false) as completed,
  cp.completed_at,
  qr.percentage::integer as quiz_percentage,
  qr.score::integer as quiz_score,
  qr.total::integer as quiz_total,
  qr.submitted_at as quiz_submitted_at
 from generate_series(1,case when p_course_slug='introduction' then 8 else 10 end) as g(week_no)
 left join public.course_progress cp on cp.user_id=p_user_id and cp.course_slug=p_course_slug and cp.week_no=g.week_no
 left join public.quiz_results qr on qr.user_id=p_user_id and qr.course_slug=p_course_slug and qr.week_no=g.week_no
 order by g.week_no;
end $$;
revoke all on function learning_private.instructor_progress_detail(uuid,text) from public,anon,authenticated;
grant execute on function learning_private.instructor_progress_detail(uuid,text) to authenticated;

create or replace function public.instructor_progress_detail(p_user_id uuid,p_course_slug text)
returns table(
 week_no integer,
 completed boolean,
 completed_at timestamptz,
 quiz_percentage integer,
 quiz_score integer,
 quiz_total integer,
 quiz_submitted_at timestamptz
)
language sql stable security invoker set search_path = '' as $$
 select * from learning_private.instructor_progress_detail(p_user_id,p_course_slug);
$$;
revoke all on function public.instructor_progress_detail(uuid,text) from public,anon,authenticated;
grant execute on function public.instructor_progress_detail(uuid,text) to authenticated;


-- Refresh Supabase Data API function cache after a rerun.
notify pgrst, 'reload schema';
