# DataLearning source cleanup and mobile Python performance — 5 November 2026

## Delivered

- Reused a **single lazily initialized Python Web Worker** for both Run Python and Python challenge checking in each Practice Arena tab. Previous grading created a fresh Pyodide worker for every attempt, causing repeated downloads and initialization on mobile.
- Preserved genuine Python execution via Pyodide, including optional pandas modules. No fake evaluator was substituted. Optional imports load only when needed and then remain cached inside the worker.
- Added execution timeouts, explicit Stop and worker reset/recovery, limits for excessive outputs, and clear first-run/package-loading feedback. Startup still requires a network download on a fresh device; pandas and limited-memory phones can remain slower.
- Derived SQL, Excel and Python challenge counts from loaded challenge records rather than relying on duplicated fixed numbers in HTML.
- Removed an orphaned `learner-home.js` file that was no longer loaded anywhere. Updated tests that were checking the retired implementation instead of active Discover/My Learning features.
- Consolidated root release history into this document and README; retained required curriculum, database scripts, learner downloads, and functional stylesheets.
- Improved shared light-theme form fields, editor focus states, readable narrow-screen typography, flexible button rows and independent scrolling of code/results.
- Refreshed the public cache revision to `dalp-public-premium-editorial-v38`.

## Verification

- `npm run verify:deployment` includes build, lint, course, security, Tutor and Arena tests.
- New `tests/python-worker-reuse.mjs` proves worker reuse, parallel-run rejection, Stop/cancellation, and runtime recovery using a mock Worker. This does not measure Pyodide startup speed on a physical phone.
- Inline-CSS browser render review checked 14 representative page templates at 320, 390, 768 and 1440px, with no whole-page overflow or severely narrow visible text areas found. This static review does not validate external APIs, signed-in states, live Python downloads, or every dynamic overlay.

## Deployment and remaining QA

1. Publish the **complete source**, not just changed styles, from the GitHub repository connected to the Vercel project.
2. Review applicable Supabase migrations separately, including `database/migrations/app_usage_only_users.sql` and `database/migrations/learning_overview_aggregate.sql`, before applying any migration that has not already been installed. These were not run by this release.
3. Verify the deployed Practice Arena on actual Android/iOS devices, including first-run runtime download, repeated grades, pandas exercise, Stop while running, memory pressure, and slow-network errors.
4. Verify public navigation and all seven protected pages with a real test account in staging.

No production deployment or Supabase mutation was performed.
