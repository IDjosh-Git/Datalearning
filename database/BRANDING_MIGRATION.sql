-- Run once in the existing Supabase project SQL editor. Service-role-only API access.
CREATE TABLE IF NOT EXISTS public.app_branding (
 id integer PRIMARY KEY DEFAULT 1 CHECK(id=1),
 name text NOT NULL DEFAULT 'DataLearning',
 "primary" text NOT NULL DEFAULT '#123B4A',
 secondary text NOT NULL DEFAULT '#183047',
 accent text NOT NULL DEFAULT '#B66B42',
 background text NOT NULL DEFAULT '#F8FAFC',
 logo text,
 version bigint NOT NULL DEFAULT 0
);
ALTER TABLE public.app_branding ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.app_branding FROM anon, authenticated;
INSERT INTO public.app_branding(id) VALUES (1) ON CONFLICT(id) DO NOTHING;
