# Private experience v3 — 10 November 2026

## What changed
- `admin.html#admin-courses`: course analysis now has a distinct editorial header, four live read-only KPI tiles, accessible time filters, a comparison chart, nine refreshed course cards and a transparent reporting footnote.
- `admin-dashboard.js`: derives KPI values from the same read-only, scoped Supabase data already used by the administrator dashboard; filters retain their original semantics. No new tables, migrations, or permissions were added.
- `private-navigation.js`: the Courses analysis label and current breadcrumb now reflect hash-driven navigation, without creating additional navigation controls.
- `connection-test.html` and `sync-test.html`: upgraded from simple utility cards to branded, two-column diagnostics with preserved live check IDs and actions.
- `certificate.html`: upgraded credential header and retained viewer/print/download/verification hooks.
- Eight protected routes share a new final design layer at `assets/styles/private-experience-v3.css`. All page loaders, authentication guards, search, accessibility hooks, and session/role checks are retained.

## Scope and data caveats
- The existing admin dashboard reports all nine `COURSE` tracks, while the broader catalog can contain more learning paths. This release labels all nine as **tracked pathways**, covering the seven core courses and the Python/AI extensions.
- The sync diagnostic still checks its six explicitly supported cloud-sync paths; it is not represented as a nine-path sync service.
- KPI counts are sourced from `course_progress`, `quiz_results`, and `capstone_submissions`, excluding the signed-in administrator and respecting the date filters. They do not represent formal enrolments.
- No database or access-policy changes. A deployed preview with real learner/admin accounts is still needed to verify live data and visual appearance after sign-in.

## Deployment checks
1. Sign in as a verified administrator and open `admin.html#admin-courses`; confirm breadcrumb, charts, KPI numbers and responsive cards.
2. Set and clear the date range; confirm KPI, chart and card totals react and invalid ranges show a notice.
3. Choose **View learner records** on a course; verify directory filter and correct anchor.
4. Sign in as a learner; ensure admin-only routes remain blocked, and learner dashboard, profile and certificate load correctly.
5. Test connection diagnostics (administrator only) and progress sync (existing permissions). Verify empty, success and error states.
6. Verify public and private loaders remain the same, the sidebar text stays dark on light hover, and no extra profile icon appears.
7. Run `npm run verify:deployment` and `node tests/private-page-finish.mjs`.

## Learner dashboard reliability update
The learner dashboard now renders user-scoped cached progress first, fetches cloud progress without waiting for the nine-course synchronization, and re-reads after asynchronous recovery. The ring uses the seven core paths (70 units), while Python and AI extension cards retain their independent 10-week meters. The refresh control retries explicitly and reports errors rather than misrepresenting a failed cloud read as 0%.
