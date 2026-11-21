-- Safe revision workflow. Apply to Supabase before enabling resubmission in production.
-- Preserves all previous submissions and prevents concurrent attempts or post-pass submissions.
-- The existing capstone_on_insert trigger continues to reset learner-supplied grading fields.
create or replace function public.capstone_guard_new_attempt()
returns trigger language plpgsql security definer set search_path = '' as $$
declare last_status text;
begin
  -- Serialize inserts per learner/course; concurrent requests cannot both pass the check.
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text || ':' || new.course_slug, 0));
  if exists(select 1 from public.certificates c where c.user_id=new.user_id and c.course_slug=new.course_slug and c.status='active') then
    raise exception 'Course already passed. Contact an administrator to reopen assessment.';
  end if;
  select s.status into last_status from public.capstone_submissions s
   where s.user_id=new.user_id and s.course_slug=new.course_slug
   order by s.created_at desc, s.id desc limit 1;
  if last_status is not null and last_status <> 'needs_revision' then
    raise exception 'A new submission is allowed only after the latest attempt requires revision.';
  end if;
  return new;
end $$;
drop trigger if exists capstone_guard_attempt on public.capstone_submissions;
create trigger capstone_guard_attempt before insert on public.capstone_submissions
for each row execute function public.capstone_guard_new_attempt();
-- Replace partial index so error/manual-review states cannot be bypassed by new submissions.
drop index if exists public.capstone_one_active_per_course;
create unique index if not exists capstone_one_active_per_course
on public.capstone_submissions(user_id,course_slug)
where status in ('submitted','processing','review_error','needs_manual_review','approved');
