# Progress repair and deployment cleanup — 14 November 2026

The connected DataLearning database was inspected read-only. It contains 38 completed week records across Excel, Introduction and Power BI, all within their valid week ranges. Ownership-based SELECT/INSERT/UPDATE policies exist, and the database health check returned no notices. No learner records, policies or schema were changed.

## Repairs

- Course progress waits for the shared verified sign-in restoration before looking up a user. Previously an early lookup could return no user and leave the page at its initial zero state.
- A stale cloud read cannot overwrite a newer completion click. Newer edits and pending writes are merged before progress is displayed.
- Failed completion writes now say they have not reached the account and offer retry. The old “saved locally” wording was inaccurate because the app uses transient memory rather than persistent browser progress storage.
- The dashboard counts all nine courses and 90 weeks, including Python and AI. Its obsolete seven-course denominator and separate persistent progress snapshot were removed.
- Progress refreshes on returning to the dashboard, restoring a page, reconnecting or selecting Refresh progress. Read failures display an unavailable state instead of presenting initial zero figures as verified progress.

## Consolidation

Signed-in Progress navigation leads to `account.html#course-progress-heading`. The separate learner overview, duplicate catalogue and old administrator progress report are excluded from the published static output. Existing URLs redirect as follows:

| Old URL | Maintained destination |
| --- | --- |
| `/overview.html`, `/overview` | `/account.html#course-progress-heading` |
| `/catalog.html` | `/index.html#zaDiscoverCards` |
| `/progress.html` | `/admin.html#admin-learners` |

The source copies remain only to support existing regression checks and compatibility auditing; they are not deployed as active pages. The retired administrator progress script and stylesheet are also excluded from deployment. The build creates a clean `dist` directory containing maintained static runtime files. Development tests, historical reports, database scripts and source helpers are not published as static files. Server functions and routing middleware retain their normal Vercel source locations.

Obsolete root release and audit reports were archived outside this package to remove contradictory deployment notes. The README points to this release's setup and progress behaviour.

## Verification

New runtime tests cover delayed authentication, saved progress after a fresh page load, learner isolation, failed-write retry, stale-read races and preservation of loaded progress after read failure. Dashboard tests execute the actual rendering functions and verify Python/AI counts, the 90-week denominator, duplicate-row resolution and invalid-week rejection. The clean-deployment test checks 2,764 published resource references and verifies retired pages and development files are excluded.

`npm run verify:deployment` passed after these changes: build, lint, academy, security, practice, Tutor and cloud/media suites. Final targeted progress, dashboard syntax/rendering and clean-output checks also passed.

Automated verification uses simulated accounts and service failures. The production database was checked read-only; a real learner's completion was not changed. No browser-based sign-in or production deployment was performed in this update. Work that never reached the database cannot be reconstructed automatically.

## Deployment

Use the enclosed `datalearning` directory as the Vercel project root. Keep `vercel.json`, `middleware.js`, `api` and `lib`, and retain existing environment variables. The build command remains `npm run build`; the output directory is now **dist**. If the Vercel dashboard has an Output Directory override, set it to **dist** or disable that override so `vercel.json` applies. Deploy this release as one complete package.

## Sign-out destination
All app sign-out controls now return to the public homepage at /. This also applies to sign-out events on nested course pages. Unauthenticated attempts to open protected pages still go to sign-in with their requested destination preserved. Targeted runtime authentication, shared sign-out, middleware and clean-deployment checks passed for this update.

