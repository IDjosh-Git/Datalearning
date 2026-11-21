-- DataLearning: count people who actually use or sign in to this app.
-- Apply AFTER ADMIN_LEARNER_MIGRATION.sql, alongside the learning overview migration.
-- Creates no Auth accounts; existing external, seeded or unverified accounts are not counted.
-- A guest may browse without becoming a registered app learner.
BEGIN;

CREATE TABLE IF NOT EXISTS public.datalearning_app_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_used_at timestamptz NOT NULL DEFAULT now(),
  last_used_at timestamptz NOT NULL DEFAULT now(),
  last_signed_in_at timestamptz
);
CREATE INDEX IF NOT EXISTS datalearning_app_users_last_used_idx
  ON public.datalearning_app_users (last_used_at DESC);
ALTER TABLE public.datalearning_app_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.datalearning_app_users FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.datalearning_app_users TO authenticated;

DROP POLICY IF EXISTS dalp_app_users_read_self ON public.datalearning_app_users;
CREATE POLICY dalp_app_users_read_self ON public.datalearning_app_users
  FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
DROP POLICY IF EXISTS dalp_app_users_insert_self ON public.datalearning_app_users;
CREATE POLICY dalp_app_users_insert_self ON public.datalearning_app_users
  FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
DROP POLICY IF EXISTS dalp_app_users_update_self ON public.datalearning_app_users;
CREATE POLICY dalp_app_users_update_self ON public.datalearning_app_users
  FOR UPDATE TO authenticated USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));
DROP POLICY IF EXISTS dalp_app_users_read_admin ON public.datalearning_app_users;
CREATE POLICY dalp_app_users_read_admin ON public.datalearning_app_users
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.site_admins s WHERE s.user_id = (select auth.uid()))
  );

-- SECURITY INVOKER: writes a single row for the caller, using their verified JWT.
-- The caller cannot provide an arbitrary user ID, and anonymous Auth users are ignored.
CREATE OR REPLACE FUNCTION public.record_datalearning_use(p_event text DEFAULT 'use')
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE v_uid uuid := (select auth.uid());
BEGIN
  IF v_uid IS NULL OR p_event NOT IN ('use', 'sign_in')
    OR COALESCE((auth.jwt()->>'is_anonymous')::boolean, false) THEN
    RETURN false;
  END IF;
  INSERT INTO public.datalearning_app_users(user_id, first_used_at, last_used_at, last_signed_in_at)
  VALUES(v_uid, now(), now(), CASE WHEN p_event='sign_in' THEN now() ELSE NULL END)
  ON CONFLICT (user_id) DO UPDATE SET
    last_used_at = now(),
    last_signed_in_at = CASE WHEN p_event='sign_in' THEN now()
      ELSE public.datalearning_app_users.last_signed_in_at END;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.record_datalearning_use(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_datalearning_use(text) TO authenticated;

-- Public-facing counts are k-suppressed and never expose individual identities.
-- Keep SECURITY DEFINER in a non-exposed schema and expose only the invoker wrapper.
CREATE SCHEMA IF NOT EXISTS datalearning_private;
REVOKE ALL ON SCHEMA datalearning_private FROM PUBLIC;
GRANT USAGE ON SCHEMA datalearning_private TO anon, authenticated;
CREATE OR REPLACE FUNCTION datalearning_private.app_learner_counts()
RETURNS TABLE(users_total integer, users_30d integer)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
  WITH event_rows AS (
    SELECT user_id, last_used_at AS event_time FROM public.datalearning_app_users
    UNION ALL SELECT user_id, updated_at FROM public.course_progress
    UNION ALL SELECT user_id, submitted_at FROM public.quiz_results
    UNION ALL SELECT user_id, created_at FROM public.capstone_submissions
  ), learners AS (
    SELECT e.user_id, max(e.event_time) AS last_event
    FROM event_rows e
    WHERE e.user_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id=e.user_id)
      AND NOT EXISTS (SELECT 1 FROM public.capstone_reviewers r WHERE r.user_id=e.user_id)
    GROUP BY e.user_id
  ), totals AS (
    SELECT count(*)::integer AS total,
      count(*) FILTER (WHERE last_event >= now()-interval '30 days')::integer AS recent
    FROM learners
  )
  SELECT CASE WHEN total >= 5 THEN total END,
         CASE WHEN recent >= 5 THEN recent END
  FROM totals;
$$;
REVOKE ALL ON FUNCTION datalearning_private.app_learner_counts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION datalearning_private.app_learner_counts() TO anon, authenticated;
CREATE OR REPLACE FUNCTION public.public_datalearning_user_summary()
RETURNS TABLE(users_total integer, users_30d integer)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT users_total, users_30d FROM datalearning_private.app_learner_counts();
$$;
REVOKE ALL ON FUNCTION public.public_datalearning_user_summary() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.public_datalearning_user_summary() TO anon, authenticated;
COMMENT ON FUNCTION public.public_datalearning_user_summary() IS
  'Distinct actual DataLearning users: verified in-app sign-ins/visits or learning activity, excluding staff and unverified Auth-only registrations. Counts under five suppressed.';
COMMIT;
