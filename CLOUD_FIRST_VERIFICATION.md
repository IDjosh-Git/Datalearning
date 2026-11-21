# Cloud-first status (2026-11-21)

Supabase: `course_enrollments`, `course_progress`, `practice_progress`, and `learner_workspace_state` are present. My Learning filters course cards to explicit enrolments. Career preferences use Supabase Auth user metadata. Browser storage is used by Supabase Auth for session persistence; `DALP_STORAGE` is an in-memory adapter backed by `learner_workspace_state` for many app-specific states.

Updated `assets/scripts/practice-cloud.js` to hydrate cloud workspace first, merge existing practice records, refresh remote progress before an upsert, and retry failures. This is not a transactional conflict-resolution guarantee; simultaneous edits on two devices can still race. Authenticated end-to-end tests on two devices have not been completed.

Important limitations: Some course and practice UI code still stages changes in RAM and uses the existing cloud adapters; a network failure can lose unsaved changes when a tab closes. Existing legacy browser data is read once for migration and removed after successful upload. Supabase Auth may retain session tokens in browser storage. No production deployment was performed.

Release gate: test first registration, career choice persistence, starting a course, My Learning only showing enrolled courses, weekly progress, SQL/Excel/Python practice on two browsers, sign-out and account switching, network failure and recovery, and capstone revision. Check browser Storage tab for remaining application-owned persistent keys after legacy migration.
