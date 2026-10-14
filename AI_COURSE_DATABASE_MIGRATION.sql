-- Run in the Supabase SQL editor before learners use AI Integration cloud sync.
-- Add AI to pre-existing CHECK constraints safely, retaining other allowed slugs.
DO $$ DECLARE r record; BEGIN
 FOR r IN SELECT conrelid::regclass AS tbl, conname, pg_get_constraintdef(oid) AS definition
  FROM pg_constraint WHERE contype='c' AND connamespace='public'::regnamespace
    AND pg_get_constraintdef(oid) ILIKE '%course_slug%'
    AND pg_get_constraintdef(oid) ILIKE '%powerbi%'
 LOOP
  EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %I',r.tbl,r.conname);
  IF r.definition ILIKE '%introduction%' THEN
   EXECUTE format('ALTER TABLE %s ADD CONSTRAINT %I CHECK (course_slug IN (''introduction'',''excel'',''sql'',''powerbi'',''ai''))',r.tbl,r.conname);
  ELSE
   EXECUTE format('ALTER TABLE %s ADD CONSTRAINT %I CHECK (course_slug IN (''excel'',''sql'',''powerbi'',''ai''))',r.tbl,r.conname);
  END IF;
 END LOOP;
END $$;

-- Re-apply the authoritative instructor-only function definitions with AI slug mappings.
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
    when 'sql' then 'SQL for Data Analytics' when 'ai' then 'AI Integration in Data Analysis' else 'Power BI' end;
   v_code := case s.course_slug when 'excel' then 'EXL' when 'sql' then 'SQL' when 'ai' then 'AIA' else 'PBI' end;
   v_id := 'DALP-'||v_code||'-'||to_char(current_date,'YYYYMMDD')||'-'||upper(substr(md5(gen_random_uuid()::text),1,12));
   insert into public.certificates(certificate_id,user_id,learner_name,course_slug,course_title,completion_date,issued_at,status,capstone_submission_id)
   values (v_id,s.user_id,s.learner_name,s.course_slug,v_course_title,current_date,now(),'active',s.id);
  end if;
  update public.capstone_submissions c set certificate_id=v_id where c.id=s.id;
 end if;
 return query select s.id,total,v_status,v_id;
end $$;

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
 if p_user_id is null or p_course_slug is null or p_course_slug not in ('introduction','excel','sql','powerbi','ai') then
  raise exception 'Invalid learner or course';
 end if;
 if not exists(
  select 1
  from auth.users u
  where u.id=p_user_id
    and u.email_confirmed_at is not null
    and not exists(
      select 1 from public.capstone_reviewers r where r.user_id=u.id
    )
 ) then
  raise exception 'Learner account not found or not confirmed';
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

