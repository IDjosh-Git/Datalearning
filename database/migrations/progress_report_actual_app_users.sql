-- DataLearning: Progress Reports show actual DataLearning participants only.
-- Apply AFTER database/migrations/app_usage_only_users.sql.
-- No learner records are deleted or modified. Existing instructor access remains.
BEGIN;

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
 with eligible_learners as (
  select u.id,u.email,u.raw_user_meta_data
  from auth.users u
  where u.email_confirmed_at is not null
    -- Staff should not be included as learners.
    and not exists (
      select 1 from public.capstone_reviewers r where r.user_id=u.id
    )
    and not exists (
      select 1 from public.site_admins s where s.user_id=u.id
    )
    -- An Auth account alone does not mean the learner used DataLearning.
    and (
      exists (select 1 from public.datalearning_app_users au where au.user_id=u.id)
      or exists (select 1 from public.course_progress cp where cp.user_id=u.id)
      or exists (select 1 from public.quiz_results qr where qr.user_id=u.id)
      or exists (select 1 from public.capstone_submissions cs where cs.user_id=u.id)
      or exists (select 1 from public.certificates c where c.user_id=u.id and c.status='active')
    )
 ), learning_activity as (
  select cp.user_id,cp.course_slug from public.course_progress cp
  union
  select qr.user_id,qr.course_slug from public.quiz_results qr
  union
  select cs.user_id,cs.course_slug from public.capstone_submissions cs
  union
  select c.user_id,c.course_slug from public.certificates c
 ), active_tracks as (
  select distinct la.user_id,la.course_slug
  from learning_activity la
  join eligible_learners el on el.id=la.user_id
  union
  select el.id,'introduction'::text
  from eligible_learners el
  where not exists(
    select 1 from learning_activity la where la.user_id=el.id
  )
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
 join eligible_learners u on u.id=a.user_id
 order by 2,4;
end $$;

REVOKE ALL ON FUNCTION learning_private.instructor_progress_overview()
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION learning_private.instructor_progress_overview()
  TO authenticated;
COMMENT ON FUNCTION learning_private.instructor_progress_overview()
  IS 'Only verified DataLearning app usage or learning activity; excludes Auth-only and staff accounts.';
COMMIT;
