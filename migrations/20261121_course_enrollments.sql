-- Account-owned course enrolments; no browser storage of enrolment state.
create table if not exists public.course_enrollments (
 user_id uuid not null references auth.users(id) on delete cascade,
 course_slug text not null check (course_slug in ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai')),
 enrolled_at timestamptz not null default now(),
 primary key (user_id, course_slug)
);
alter table public.course_enrollments enable row level security;
revoke all on public.course_enrollments from anon;
grant select, insert, delete on public.course_enrollments to authenticated;
drop policy if exists "Learners read own enrollments" on public.course_enrollments;
create policy "Learners read own enrollments" on public.course_enrollments for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Learners start own courses" on public.course_enrollments;
create policy "Learners start own courses" on public.course_enrollments for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Learners remove own enrollments" on public.course_enrollments;
create policy "Learners remove own enrollments" on public.course_enrollments for delete to authenticated using ((select auth.uid()) = user_id);
