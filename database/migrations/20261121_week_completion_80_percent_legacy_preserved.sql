-- Applied to connected Supabase project 2026-11-21.
-- Existing completed rows captured in legacy snapshot; 80% gate on new completions.
-- Note: client-supplied quiz_results scores are not server-graded and can be forged by malicious clients.
create table if not exists public.course_completion_legacy (
 user_id uuid not null,course_slug text not null,week_no integer not null,
 captured_at timestamptz not null default now(),
 primary key(user_id,course_slug,week_no)
);
revoke all on public.course_completion_legacy from anon,authenticated;
alter table public.course_completion_legacy enable row level security;
insert into public.course_completion_legacy(user_id,course_slug,week_no)
select user_id,course_slug,week_no from public.course_progress where completed=true on conflict do nothing;
create or replace function public.dalp_enforce_week_completion()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.completed=true and (tg_op='INSERT' or old.completed is distinct from true) then
  if not exists(select 1 from public.course_completion_legacy l where l.user_id=new.user_id and l.course_slug=new.course_slug and l.week_no=new.week_no)
  and not exists(select 1 from public.quiz_results q where q.user_id=new.user_id and q.course_slug=new.course_slug and q.week_no=new.week_no and q.percentage>=80) then
   raise exception 'Weekly assessment score of at least 80 percent required for new completion' using errcode='23514';
  end if;
 end if;
 return new;
end;$$;
drop trigger if exists dalp_completion_score_gate on public.course_progress;
create trigger dalp_completion_score_gate before insert or update of completed on public.course_progress
for each row execute function public.dalp_enforce_week_completion();
