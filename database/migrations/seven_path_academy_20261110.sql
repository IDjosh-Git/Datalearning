-- DataLearning seven-course curriculum: non-destructive migration.
-- ALREADY APPLIED to the connected DataLearning Supabase project in November 2026.
-- Use on a different project only after reviewing existing constraints, policies and functions.
BEGIN;
ALTER TABLE public.course_progress DROP CONSTRAINT IF EXISTS course_progress_course_slug_check;
ALTER TABLE public.course_progress ADD CONSTRAINT course_progress_course_slug_check
 CHECK (course_slug IN ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'));
ALTER TABLE public.quiz_results DROP CONSTRAINT IF EXISTS quiz_results_course_slug_check;
ALTER TABLE public.quiz_results ADD CONSTRAINT quiz_results_course_slug_check
 CHECK (course_slug IN ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'));
ALTER TABLE public.capstone_submissions DROP CONSTRAINT IF EXISTS capstone_submissions_course_slug_check;
ALTER TABLE public.capstone_submissions ADD CONSTRAINT capstone_submissions_course_slug_check
 CHECK (course_slug IN ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'));
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_course_slug_check;
ALTER TABLE public.certificates ADD CONSTRAINT certificates_course_slug_check
 CHECK (course_slug IN ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'));
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_certificate_id_valid;
ALTER TABLE public.certificates ADD CONSTRAINT certificates_certificate_id_valid CHECK
 (certificate_id ~ '^(IJL-(EXL|PBI|SQL)-[0-9]{8}-[A-F0-9]{6}|DALP-(EXL|PBI|SQL|AIA|PYT|DAN|TBL|PQY|STA)-[0-9]{8}-[A-F0-9]{12})$');
CREATE TABLE IF NOT EXISTS public.mastery_results (
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 course_slug text NOT NULL CHECK (course_slug IN ('introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai')),
 score integer NOT NULL CHECK (score BETWEEN 0 AND 10),
 total integer NOT NULL DEFAULT 10 CHECK (total=10),
 percentage integer NOT NULL CHECK (percentage BETWEEN 0 AND 100),
 submitted_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id,course_slug)
);
ALTER TABLE public.mastery_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mastery_results_select_own ON public.mastery_results;
CREATE POLICY mastery_results_select_own ON public.mastery_results FOR SELECT TO authenticated
 USING ((SELECT auth.uid())=user_id);
DROP POLICY IF EXISTS mastery_results_insert_own ON public.mastery_results;
CREATE POLICY mastery_results_insert_own ON public.mastery_results FOR INSERT TO authenticated
 WITH CHECK ((SELECT auth.uid())=user_id);
DROP POLICY IF EXISTS mastery_results_update_own ON public.mastery_results;
CREATE POLICY mastery_results_update_own ON public.mastery_results FOR UPDATE TO authenticated
 USING ((SELECT auth.uid())=user_id) WITH CHECK ((SELECT auth.uid())=user_id);
GRANT SELECT,INSERT,UPDATE ON public.mastery_results TO authenticated;
-- Retain the original instructor-review and certificate issuance function, extending
-- its course-name and certificate-code mappings, without changing authorization checks.
DO $mig$
DECLARE definition text;
BEGIN
 definition := pg_get_functiondef('learning_private.publish_capstone_review(uuid,jsonb,text,text[],text[],text[],text)'::regprocedure);
 IF position('when ''sql'' then ''SQL for Data Analytics'' when ''ai'' then ''AI Integration in Data Analysis'' else ''Power BI'' end' IN definition)>0 THEN
  definition := replace(definition,
   'when ''sql'' then ''SQL for Data Analytics'' when ''ai'' then ''AI Integration in Data Analysis'' else ''Power BI'' end',
   'when ''sql'' then ''SQL for Data Analytics'' when ''ai'' then ''AI Integration in Data Analysis'' when ''powerbi'' then ''Power BI'' when ''introduction'' then ''Data Analysis Foundations'' when ''tableau'' then ''Tableau'' when ''powerquery'' then ''Power Query'' when ''statistics'' then ''Introductory Statistics'' when ''python'' then ''Python for Data Analytics'' else ''Power BI'' end');
 END IF;
 IF position('when ''sql'' then ''SQL'' when ''ai'' then ''AIA'' else ''PBI'' end' IN definition)>0 THEN
  definition := replace(definition,
   'when ''sql'' then ''SQL'' when ''ai'' then ''AIA'' else ''PBI'' end',
   'when ''sql'' then ''SQL'' when ''ai'' then ''AIA'' when ''powerbi'' then ''PBI'' when ''introduction'' then ''DAN'' when ''tableau'' then ''TBL'' when ''powerquery'' then ''PQY'' when ''statistics'' then ''STA'' when ''python'' then ''PYT'' else ''PBI'' end');
 END IF;
 EXECUTE definition;
END $mig$;
COMMIT;
