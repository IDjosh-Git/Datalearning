# DataLearning Practice + Capstone follow-up

## Implemented in source (not deployed)
- Adds a Practice Arena entry inside each of the ten weeks of SQL, Excel and Python course pages (30 entry points).
- Keeps existing verified direct challenge mappings. For other weeks, links to the appropriate subject catalogue with a week/lesson hint; these are NOT asserted to be verified exact curriculum matches.
- Displays local practice attempts/passed status beside verified lesson links.
- Adds a learner-facing capstone attempt history and explicit revision guidance; latest submission remains current.
- Adds a database migration to serialize capstone submissions per learner/course, prevent new attempts while assessment is pending or after certification, and permit another attempt only when latest status is `needs_revision`.

## Important limitations / required next work
- Apply `database/migrations/20261121_capstone_resubmission_guard.sql` to Supabase before publishing the new capstone flow. Migration has NOT been applied to production.
- The existing partial index is changed to cover `needs_manual_review`; inspect production indexes/triggers before migration.
- Practice progress is still device-local, NOT synced to Supabase or My Learning. Do not describe it as account-level tracking.
- Exact challenge-to-week mapping has not been verified for all 30 weeks. Only existing curated direct mappings are used.
- No production browser-based end-to-end test or Vercel deployment was performed.
- Existing AI grading rule has a 14/20 technical minimum whereas manual grading may use only overall 70; align policy separately.
