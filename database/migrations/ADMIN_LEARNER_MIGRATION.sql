-- Data Analysis Learning Path: user profile + admin-role architecture.
-- Safe to rerun. Existing learning data is preserved.
-- Each learner is a ROW in learner_profiles and has per-user records in existing tables.
-- A separate SQL table per learner is deliberately NOT created.
BEGIN;
CREATE TABLE IF NOT EXISTS public.site_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.site_admins FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.site_admins TO authenticated;
DROP POLICY IF EXISTS site_admins_read_self ON public.site_admins;
CREATE POLICY site_admins_read_self ON public.site_admins FOR SELECT TO authenticated
 USING (user_id = (SELECT auth.uid()));

CREATE TABLE IF NOT EXISTS public.learner_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  joined_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz
);
CREATE INDEX IF NOT EXISTS learner_profiles_joined_at_idx ON public.learner_profiles(joined_at DESC);
ALTER TABLE public.learner_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.learner_profiles FROM PUBLIC,anon,authenticated;
GRANT SELECT ON TABLE public.learner_profiles TO authenticated;
GRANT UPDATE(full_name) ON TABLE public.learner_profiles TO authenticated;
DROP POLICY IF EXISTS learner_profiles_read_self ON public.learner_profiles;
CREATE POLICY learner_profiles_read_self ON public.learner_profiles FOR SELECT TO authenticated
 USING (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS learner_profiles_update_self ON public.learner_profiles;
CREATE POLICY learner_profiles_update_self ON public.learner_profiles FOR UPDATE TO authenticated
 USING (user_id = (SELECT auth.uid())) WITH CHECK (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS learner_profiles_read_admin ON public.learner_profiles;
CREATE POLICY learner_profiles_read_admin ON public.learner_profiles FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id = (SELECT auth.uid())));

-- The Auth trigger is invoked by Supabase at user registration; no client can impersonate another user.
CREATE OR REPLACE FUNCTION public.dalp_sync_learner_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
 INSERT INTO public.learner_profiles(user_id,full_name,email,joined_at,last_seen_at)
 VALUES(NEW.id, left(COALESCE(NEW.raw_user_meta_data->>'full_name',''),120),COALESCE(NEW.email,''),COALESCE(NEW.created_at,now()),NEW.last_sign_in_at)
 ON CONFLICT(user_id) DO UPDATE SET
   email=excluded.email,
   full_name=CASE WHEN excluded.full_name<>'' THEN excluded.full_name ELSE public.learner_profiles.full_name END,
   last_seen_at=COALESCE(excluded.last_seen_at, public.learner_profiles.last_seen_at);
 RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.dalp_sync_learner_profile() FROM PUBLIC,anon,authenticated;
DROP TRIGGER IF EXISTS dalp_user_profile_sync ON auth.users;
CREATE TRIGGER dalp_user_profile_sync
 AFTER INSERT OR UPDATE OF email,raw_user_meta_data,last_sign_in_at ON auth.users
 FOR EACH ROW EXECUTE FUNCTION public.dalp_sync_learner_profile();
INSERT INTO public.learner_profiles(user_id,full_name,email,joined_at,last_seen_at)
 SELECT id,left(COALESCE(raw_user_meta_data->>'full_name',''),120),COALESCE(email,''),COALESCE(created_at,now()),last_sign_in_at
 FROM auth.users
 ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,
  full_name=CASE WHEN public.learner_profiles.full_name='' THEN excluded.full_name ELSE public.learner_profiles.full_name END;

-- Preserve the existing authorised owner: existing reviewer allowlist has been
-- checked before migration. If additional reviewers were authorised later,
-- do NOT elevate them without explicit approval. The seed below is for initial installation.
INSERT INTO public.site_admins(user_id)
 SELECT user_id FROM public.capstone_reviewers
 ON CONFLICT(user_id) DO NOTHING;

-- Admin read access across learner-owned learning data; learner ownership rules remain intact.
DROP POLICY IF EXISTS progress_select_admin ON public.course_progress;
CREATE POLICY progress_select_admin ON public.course_progress FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS quiz_select_admin ON public.quiz_results;
CREATE POLICY quiz_select_admin ON public.quiz_results FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS certificates_select_admin ON public.certificates;
CREATE POLICY certificates_select_admin ON public.certificates FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id = (SELECT auth.uid())));
DROP POLICY IF EXISTS capstones_select_admin ON public.capstone_submissions;
CREATE POLICY capstones_select_admin ON public.capstone_submissions FOR SELECT TO authenticated
 USING (EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id = (SELECT auth.uid())));
COMMIT;

-- To add a new admin, run this in the secure SQL editor, replacing the UUID:
-- INSERT INTO public.site_admins(user_id) VALUES('ADMIN-UUID') ON CONFLICT DO NOTHING;
-- INSERT INTO public.capstone_reviewers(user_id) VALUES('ADMIN-UUID') ON CONFLICT DO NOTHING;
-- Never allow learner sign-up or browser-side code to assign admin status.
