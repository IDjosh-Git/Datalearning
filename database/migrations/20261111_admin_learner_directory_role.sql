-- Migration deployed to the DataLearning Supabase project on 2026-11-11.
-- Administrator authorization stays in public.site_admins. The role field is a protected mirror.
ALTER TABLE public.learner_profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'learner';
ALTER TABLE public.learner_profiles DROP CONSTRAINT IF EXISTS learner_profiles_role_check;
ALTER TABLE public.learner_profiles ADD CONSTRAINT learner_profiles_role_check CHECK (role IN ('learner','admin'));
REVOKE UPDATE ON public.learner_profiles FROM anon, authenticated;
GRANT SELECT ON public.learner_profiles TO authenticated;
GRANT UPDATE (full_name) ON public.learner_profiles TO authenticated;
CREATE SCHEMA IF NOT EXISTS datalearning_private;
REVOKE ALL ON SCHEMA datalearning_private FROM PUBLIC, anon, authenticated;
CREATE OR REPLACE FUNCTION datalearning_private.enforce_profile_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
BEGIN
 NEW.role := CASE WHEN EXISTS (SELECT 1 FROM public.site_admins a WHERE a.user_id=NEW.user_id) THEN 'admin' ELSE 'learner' END;
 RETURN NEW;
END;$fn$;
REVOKE ALL ON FUNCTION datalearning_private.enforce_profile_role() FROM PUBLIC,anon,authenticated;
DROP TRIGGER IF EXISTS learner_profiles_role_guard ON public.learner_profiles;
CREATE TRIGGER learner_profiles_role_guard BEFORE INSERT OR UPDATE ON public.learner_profiles FOR EACH ROW EXECUTE FUNCTION datalearning_private.enforce_profile_role();
CREATE OR REPLACE FUNCTION datalearning_private.sync_admin_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
BEGIN
 IF TG_OP IN ('DELETE','UPDATE') THEN UPDATE public.learner_profiles SET role='learner' WHERE user_id=OLD.user_id; END IF;
 IF TG_OP IN ('INSERT','UPDATE') THEN
  INSERT INTO public.learner_profiles(user_id,full_name,email,role)
  SELECT id,COALESCE(NULLIF(btrim(raw_user_meta_data->>'full_name'),''),split_part(COALESCE(email,''),'@',1),'Administrator'),COALESCE(email,''),'admin'
  FROM auth.users WHERE id=NEW.user_id ON CONFLICT(user_id) DO UPDATE SET role='admin';
 END IF;
 RETURN NULL;
END;$fn$;
REVOKE ALL ON FUNCTION datalearning_private.sync_admin_profile() FROM PUBLIC,anon,authenticated;
DROP TRIGGER IF EXISTS site_admins_profile_role_sync ON public.site_admins;
CREATE TRIGGER site_admins_profile_role_sync AFTER INSERT OR DELETE OR UPDATE OF user_id ON public.site_admins FOR EACH ROW EXECUTE FUNCTION datalearning_private.sync_admin_profile();
UPDATE public.learner_profiles p SET role=CASE WHEN EXISTS(SELECT 1 FROM public.site_admins a WHERE a.user_id=p.user_id) THEN 'admin' ELSE 'learner' END;
INSERT INTO public.learner_profiles(user_id,full_name,email,role) SELECT u.id,COALESCE(NULLIF(btrim(u.raw_user_meta_data->>'full_name'),''),split_part(COALESCE(u.email,''),'@',1),'Administrator'),COALESCE(u.email,''),'admin' FROM public.site_admins a JOIN auth.users u ON u.id=a.user_id ON CONFLICT(user_id) DO UPDATE SET role='admin';
