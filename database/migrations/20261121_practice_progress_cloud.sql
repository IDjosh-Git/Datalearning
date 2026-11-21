-- Per-account challenge progress; drafts and source code remain local.
create table if not exists public.practice_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 challenge_id text not null check(length(challenge_id) between 1 and 160),
 passed boolean not null default false,
 attempts integer not null default 0 check(attempts >= 0),
 updated_at timestamptz not null default now(),
 primary key(user_id,challenge_id)
);
alter table public.practice_progress enable row level security;
revoke all on public.practice_progress from anon;
grant select,insert,update on public.practice_progress to authenticated;
drop policy if exists practice_read_own on public.practice_progress;
create policy practice_read_own on public.practice_progress for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists practice_insert_own on public.practice_progress;
create policy practice_insert_own on public.practice_progress for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists practice_update_own on public.practice_progress;
create policy practice_update_own on public.practice_progress for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
