-- STEP 1: In Supabase Dashboard > Authentication > Users, open YOUR owner
-- account and copy its User UID. Sign in to the learning app with this same
-- account. Do not use an email address or a learner's UID here.
-- STEP 2: Replace the sample UID below, then run the statement in SQL Editor.
-- Repeat ONLY for another person you deliberately wish to authorize.
insert into public.capstone_reviewers (user_id)
values ('00000000-0000-0000-0000-000000000000'::uuid)
on conflict (user_id) do nothing;
-- STEP 3: Verify the correct UID was added:
select user_id, added_at from public.capstone_reviewers;
-- To revoke somebody's reviewer access later, run:
-- delete from public.capstone_reviewers where user_id = 'THE-UID'::uuid;
