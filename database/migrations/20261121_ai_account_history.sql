create table if not exists public.ai_conversation_history (
 user_id uuid primary key references auth.users(id) on delete cascade,
 messages jsonb not null default '[]'::jsonb,
 updated_at timestamptz not null default now(),
 constraint ai_history_is_array check (jsonb_typeof(messages)='array'),
 constraint ai_history_size check (pg_column_size(messages) <= 100000)
);
alter table public.ai_conversation_history enable row level security;
grant select,insert,update,delete on public.ai_conversation_history to authenticated;
create policy ai_history_select on public.ai_conversation_history for select to authenticated using ((select auth.uid())=user_id);
create policy ai_history_insert on public.ai_conversation_history for insert to authenticated with check ((select auth.uid())=user_id);
create policy ai_history_update on public.ai_conversation_history for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy ai_history_delete on public.ai_conversation_history for delete to authenticated using ((select auth.uid())=user_id);
