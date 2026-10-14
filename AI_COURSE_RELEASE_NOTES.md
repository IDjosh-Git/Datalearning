# AI Integration course + modern certificate

- Added `courses/ai.html`, a fully separate 10-week course with guided lessons, prompts, practice labs, QA checks, completion tracking, local storage and existing cloud sync hooks.
- Added its homepage card, progress indicator, capstone selector, reviewer filter and navigation.
- Redesigned the certificate visually without changing verified record fields, printing/export IDs, or the instructor-only issuance policy.

## Database release requirement

The database from this release has hard-coded course slug constraints and certificate title/code logic. Run `AI_COURSE_DATABASE_MIGRATION.sql` in Supabase SQL editor, which also updates the protected assessment and instructor detail functions. Until the migration is deployed, AI learner progress/submissions may fail server-side. Existing course certificates continue unchanged.

## Verification

Open `courses/ai.html` and complete a unit, reload the page, and verify local progress. Check the homepage AI card updates. Print an existing verified certificate through the capstone studio to inspect the redesigned layout. Do not manually issue certificates from the frontend.
