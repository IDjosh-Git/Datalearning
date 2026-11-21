-- DataLearning cloud-backed learner workspace. Applied to the connected Supabase project
-- on 2026-11-11. Safe to reapply to a separate deployment.
create table if not exists public.learner_workspace_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  state_key text not null,
  state_value jsonb not null default 'null'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, state_key),
  constraint learner_state_key_limit check (char_length(state_key) between 1 and 160),
  constraint learner_state_value_limit check (pg_column_size(state_value) <= 131072)
);
alter table public.learner_workspace_state enable row level security;
revoke all on public.learner_workspace_state from anon;
grant select, insert, update, delete on public.learner_workspace_state to authenticated;
drop policy if exists learner_workspace_select on public.learner_workspace_state;
create policy learner_workspace_select on public.learner_workspace_state for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists learner_workspace_insert on public.learner_workspace_state;
create policy learner_workspace_insert on public.learner_workspace_state for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists learner_workspace_update on public.learner_workspace_state;
create policy learner_workspace_update on public.learner_workspace_state for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
drop policy if exists learner_workspace_delete on public.learner_workspace_state;
create policy learner_workspace_delete on public.learner_workspace_state for delete to authenticated using ((select auth.uid())=user_id);
