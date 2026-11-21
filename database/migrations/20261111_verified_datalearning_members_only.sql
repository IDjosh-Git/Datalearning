-- Applied on 2026-11-11 to the DataLearning Supabase project.
-- Run only after ADMIN_LEARNER_MIGRATION.sql, app_usage_only_users.sql,
-- and 20261111_admin_learner_directory_role.sql.
-- Verified DataLearning accounts ONLY: app sign-in/use, DataLearning study
-- records, and the protected site_admins allowlist. Do not infer membership
-- from arbitrary auth.users registrations or logins to other apps.

CREATE TABLE IF NOT EXISTS datalearning_private.learner_profiles_archive (
 user_id uuid PRIMARY KEY, full_name text NOT NULL, email text NOT NULL,
 joined_at timestamptz NOT NULL, last_seen_at timestamptz,
 role text NOT NULL, archived_at timestamptz NOT NULL DEFAULT now(),
 reason text NOT NULL DEFAULT 'no verified DataLearning activity'
);
REVOKE ALL ON datalearning_private.learner_profiles_archive FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION datalearning_private.is_data_learning_member(p_uid uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path='' AS $fn$
 SELECT p_uid IS NOT NULL AND (
  EXISTS(SELECT 1 FROM public.site_admins s WHERE s.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.datalearning_app_users d WHERE d.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.course_progress c WHERE c.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.quiz_results q WHERE q.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.mastery_results m WHERE m.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.capstone_submissions c WHERE c.user_id=p_uid)
  OR EXISTS(SELECT 1 FROM public.certificates c WHERE c.user_id=p_uid)
 );
$fn$;
REVOKE ALL ON FUNCTION datalearning_private.is_data_learning_member(uuid) FROM PUBLIC,anon,authenticated;

-- This old trigger was creating learner_profiles rows for every auth user.
DROP TRIGGER IF EXISTS dalp_user_profile_sync ON auth.users;
DROP FUNCTION IF EXISTS public.dalp_sync_learner_profile();

CREATE OR REPLACE FUNCTION datalearning_private.register_verified_datalearning_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $fn$
DECLARE v_uid uuid;
BEGIN
 v_uid:=NEW.user_id;
 IF NOT datalearning_private.is_data_learning_member(v_uid) THEN RETURN NEW; END IF;
 INSERT INTO public.learner_profiles (user_id,full_name,email,joined_at,last_seen_at,role)
 SELECT a.id,
  left(coalesce(nullif(btrim(a.raw_user_meta_data->>'full_name'),''),
        split_part(coalesce(a.email,''),'@',1),'Learner'),120),
  coalesce(a.email,''),a.created_at,a.last_sign_in_at,
  CASE WHEN EXISTS(SELECT 1 FROM public.site_admins s WHERE s.user_id=a.id) THEN 'admin' ELSE 'learner' END
 FROM auth.users a WHERE a.id=v_uid
 ON CONFLICT(user_id) DO UPDATE SET
   email=EXCLUDED.email,
   last_seen_at=COALESCE(EXCLUDED.last_seen_at,public.learner_profiles.last_seen_at),
   role=EXCLUDED.role;
 RETURN NEW;
END;
$fn$;
REVOKE ALL ON FUNCTION datalearning_private.register_verified_datalearning_profile() FROM PUBLIC,anon,authenticated;
DROP TRIGGER IF EXISTS dalp_app_user_profile_sync ON public.datalearning_app_users;
CREATE TRIGGER dalp_app_user_profile_sync AFTER INSERT OR UPDATE ON public.datalearning_app_users
 FOR EACH ROW EXECUTE FUNCTION datalearning_private.register_verified_datalearning_profile();
DROP TRIGGER IF EXISTS dalp_course_profile_sync ON public.course_progress;
CREATE TRIGGER dalp_course_profile_sync AFTER INSERT OR UPDATE ON public.course_progress
 FOR EACH ROW EXECUTE FUNCTION datalearning_private.register_verified_datalearning_profile();

-- Archive all non-app profiles before removing them from the live app directory.
-- No Supabase Auth user, course progress or historical record is deleted.
INSERT INTO datalearning_private.learner_profiles_archive
 (user_id,full_name,email,joined_at,last_seen_at,role)
SELECT user_id,full_name,email,joined_at,last_seen_at,role
FROM public.learner_profiles p
WHERE NOT datalearning_private.is_data_learning_member(p.user_id)
ON CONFLICT(user_id) DO NOTHING;
DELETE FROM public.learner_profiles p
WHERE NOT datalearning_private.is_data_learning_member(p.user_id);
