-- Data Analysis Learning Path — optional cloud-progress schema.
-- Apply only to the intended Supabase project configured in assets/supabase-config.js.
-- The project is shared by other applications: keep its existing Auth Site URL; add
-- your learning domain under Auth > URL Configuration > Redirect URLs instead.
-- Creates only learning-specific tables; does not touch portfolio, library or auth triggers.
-- Run once after reviewing in Supabase SQL Editor.
create table if not exists public.course_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check(course_slug in ('excel','sql','powerbi')),
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
-- Keep elevated lookup logic in an UNEXPOSED schema; the exposed API wrapper is
-- SECURITY INVOKER. In Supabase Data API expose 'api', never 'learning_private'.
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
create schema if not exists api;
grant usage on schema api to anon,authenticated;
create or replace function api.verify_certificate(p_certificate_id text)
returns table(certificate_id text,learner_name text,course_title text,completion_date date,status text,issued_at timestamptz)
language sql stable security invoker set search_path=''
as $$ select * from learning_private.lookup_completion_record(p_certificate_id); $$;
revoke all on function api.verify_certificate(text) from public;
grant execute on function api.verify_certificate(text) to anon,authenticated;
