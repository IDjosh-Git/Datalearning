# DataLearning — Isolated Admin Views & Premium Diagnostics

**Release date:** 10 November 2026  
**Source:** DataLearning Premium Private Analytics Dashboard Fix (full project, not a patch)

## This release

1. **Admin navigation fixed:** `admin.html` now displays one view at a time: Admin Overview, Courses Analysis or Student Management. Selecting one hides the other two instead of scrolling through all three. The route remains linkable using `#admin-courses` and `#admin-learners`, and the browser back/forward buttons restore the correct view.
2. **Unwanted overlays removed:** Decorative section-level pseudo-overlay backgrounds were disabled for Courses Analysis and Student Management. The learner-detail backdrop closes when switching views; only an intentionally opened learner dialog or mobile menu uses a functional scrim. Retains the premium navy and teal hero panels.
3. **Consistent premium diagnostics:** Connection Check and Progress Sync now use a shared responsive utility design with compact dark-teal heroes, clear status tiles and help cards. The two superseded utility CSS files were removed; existing Supabase session, admin permission checks and progress synchronization logic remain unchanged.
4. **Navigation and accessibility:** Active sidebar/heading are synchronized; inactive view content is hidden from pointer and keyboard focus and marked `aria-hidden`; pressing `/` to search learners opens Student Management before moving focus. Administrator links remain role-gated.
5. **Release caching and regression checks:** Shared private assets have a new URL revision, the public-only service-worker cache name has advanced, and a new navigation-isolation test is included in the maintained security suite.

## Verification

- `npm run verify:deployment` — all maintained Academy, security, Practice Arena and Tutor suites passed.
- Offline headless Chromium visual checks at 1440px and 390px confirmed that each Admin view shows only itself (with both backdrops hidden), and Connection Check/Progress Sync have no horizontal viewport overflow. These checks used a simulated authenticated role with diagnostic result placeholders, **not** a real Supabase connection.
- After deployment, confirm real administrator sign-in, role-scoped learner records and live sync behaviour using authorized test accounts; do not treat the browser mocks as live database verification.

## Deployment

Replace the previous project with the **complete** new ZIP, not only a stylesheet. Verify `admin.html`, `admin.html#admin-courses`, `admin.html#admin-learners`, `connection-test.html`, and `sync-test.html` in a private browser session. No database schema or existing learner records were changed.

---

## Previous release notes

# DataLearning — Premium Private Experience & Dashboard Progress Fix

**Release date:** 10 November 2026  
**Source:** Unified Loader and Sidebar Contrast release (same existing DataLearning app)

## Included in this release

1. Redesigned **Administrator → Courses Analysis** with a premium dark-navy/teal editorial hero, warm-orange highlights, four live summary metrics, a responsive course activity chart, clear date filters and nine detailed learning-path cards. All nine paths are tracked (seven core courses plus Python and AI); figures are derived from the existing role-protected Supabase reads.
2. Updated **My Learning dashboard** with a cohesive premium hero, accessible progress ring, higher-contrast course meters, refined cards and a manual **Refresh progress** button. **Functional fix:** the dashboard no longer waits for all nine cloud sync operations to finish before displaying progress. It first presents previously verified user-specific cached rows (when available), loads authoritative cloud rows, then syncs queued edits and refreshes the figures again. A failed cloud query displays a status message rather than silently treating the result as 0%.
3. The circular dashboard progress indicator is visibly fixed: the inner layer sits **above** the conic track, not behind its background. The percentage uses the seven **core** 10-week paths (70 units); the Python and AI course cards show their own 10-week percentages.
4. Added one final premium styling layer for all **eight** protected pages: admin, account, reviewer, progress reports, profile, certificate viewer and both connection/sync diagnostics. Kept the shared public/private loader, role-specific sidebar, search panel and contrast repairs.
5. Extended the administrator course filter to include Tableau, Power Query and Statistics. Corrected the Introduction path denominator from 8 to 10 in the Courses Analysis cards to match the actual learner modules.
6. Added `tests/private-page-finish.mjs` to the normal automated suite; bumped visual asset revision and service-worker cache namespace. No database migrations or live account data were changed.

## Quality checks

- `npm run verify:deployment` — **passes** all maintained suites (Academy, security, Arena, Tutor and responsive UI checks).
- Headless Chromium with **mock Supabase records** — validated desktop/mobile layout, 9 analysis cards, learner Excel completion of 3/10 showing **30%**, core completion of 4/70 showing **6%**, and refresh after adding an Excel completion showing **40%**. No client runtime errors in the tested mock session.
- Real sign-in, Supabase RLS, and production deployment must be verified using an actual test learner and an authorized admin account. Mock browser checks do **not** establish production database connectivity.

## Deployment

Deploy the **complete project** and open a fresh session. Test `account.html` (progress and refresh) and `admin.html#admin-courses` (nine cards, date filters and learner actions) after authentication. If content looks stale, confirm `private-experience-v3.css?v=premium-20261110-r4` is served and refresh the client. No credentials should be placed in this ZIP.
