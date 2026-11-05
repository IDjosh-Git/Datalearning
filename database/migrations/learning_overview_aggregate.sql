-- PUBLIC AGGREGATE ONLY. Apply in Supabase SQL editor after reviewing access policy.
-- Does not reveal user identifiers, emails, profiles or individual learning rows.
-- Low-population course metrics (<5 distinct learners) are NULL, not published.
-- "learners_total" = distinct learners with recorded progress, quizzes or capstones,
-- not signups, page views or necessarily paid enrolments.
create or replace function public.public_course_activity_overview()
returns table(course_slug text, learners_total integer, learners_30d integer, completed_lessons integer, quiz_submissions integer, capstone_submissions integer)
language sql stable security definer set search_path = '' as $$
 with paths(course_slug) as (
   values ('introduction'::text),('excel'),('sql'),('powerbi'),('python'),('ai')
 ), activities as (
   select p.user_id,p.course_slug,p.updated_at as event_time, (case when p.completed then 1 else 0 end)::integer as lessons, 0::integer as quizzes, 0::integer as capstones
     from public.course_progress p
   union all
   select q.user_id,q.course_slug,q.submitted_at,0,1,0 from public.quiz_results q
   union all
   select s.user_id,s.course_slug,s.created_at,0,0,1 from public.capstone_submissions s
 ), valid as (
   select a.* from activities a
    where not exists(select 1 from public.capstone_reviewers r where r.user_id=a.user_id)
 ), counts as (
   select a.course_slug,count(distinct a.user_id)::integer as learners,
     count(distinct a.user_id) filter (where a.event_time >= now()-interval '30 days')::integer as recent,
     sum(a.lessons)::integer as lessons,sum(a.quizzes)::integer as quizzes,sum(a.capstones)::integer as capstones
   from valid a group by a.course_slug
 )
 select p.course_slug,
   case when coalesce(c.learners,0)>=5 then c.learners end,
   case when coalesce(c.learners,0)>=5 then c.recent end,
   case when coalesce(c.learners,0)>=5 then c.lessons end,
   case when coalesce(c.learners,0)>=5 then c.quizzes end,
   case when coalesce(c.learners,0)>=5 then c.capstones end
 from paths p left join counts c on c.course_slug=p.course_slug;
$$;
revoke all on function public.public_course_activity_overview() from public;
grant execute on function public.public_course_activity_overview() to anon,authenticated;
comment on function public.public_course_activity_overview() is 'Read-only, six-course privacy-suppressed aggregate statistics. No individual learner rows are exposed.';
