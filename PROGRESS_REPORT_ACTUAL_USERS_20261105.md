# Progress Report — actual DataLearning users only (5 Nov 2026)

- The report table, learner selector and KPI totals use `public.instructor_progress_overview()`; the updated private function filters eligible learners **before** generating rows.
- Includes confirmed learners with a verified DataLearning app visit/sign-in (`datalearning_app_users`) OR recorded course, quiz, capstone or active-certificate activity.
- Excludes accounts existing only in Supabase Auth, unconfirmed registrations, administrators and reviewers.
- A genuine app user who has signed in but has not yet started lessons remains under Introduction with status **Not started**.
- No user records are deleted. Existing instructor-only permissions, course calculations, details and authentication gates are maintained.

## Database deployment

Apply `database/migrations/progress_report_actual_app_users.sql` to the DataLearning Supabase project after `app_usage_only_users.sql`. Simply deploying HTML cannot correct the underlying SQL function. The existing public RPC wrapper automatically calls the updated private function.

## Tests

`node tests/progress-report-actual-app-users.mjs` and `npm run verify:deployment`.
