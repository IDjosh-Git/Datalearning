# Data Analysis Learning Path — Admin Console v6

## Scope
Redesigned **three admin-facing pages** (Academy Overview, Progress Reports, Assessment Desk) with one consistent, responsive administrator navigation system. Existing learner course and account pages, lesson content, quiz logic, assessment scoring rules and Supabase policies are preserved.

## Inspiration
The information architecture takes cues from Thinkific’s site-owner console (overview, learners, progress and analytics under one navigation system) and Canvas LMS account/learning analytics. This is an original layout and implementation—not a copy of copyrighted assets or proprietary source code.

- Thinkific Admin Dashboard: https://support.thinkific.com/hc/en-us/articles/360030719833-Admin-Dashboard-A-Closer-Look
- Canvas Admin Analytics: https://community.instructure.com/en/kb/articles/661420-how-do-i-view-the-admin-analytics-course-dashboard

## Pages and structure

1. `admin.html`: Academy overview, KPIs, pending assessments, recent activity, per-course performance, searchable and paginated learner directory, privacy-safe CSV export, detail drawer, quick links.
2. `progress.html`: Kept full instructor overview, 5-course filters including AI Integration, weekly drilldowns; adopts same sidebar/topbar and page density.
3. `reviewer.html`: Kept assessment queue, evidence preview and grading workflow; adopts same sidebar/topbar and mobile drawer.

### Navigation
Persistent admin sidebar on desktop; mobile drawer on phones/tablets, closed via backdrop and Escape. Top breadcrumb, protected-workspace label, learner portal shortcut, account link and secure sign-out.

### Data and access
No fictitious metrics are rendered in production. Overview cards derive from existing `learner_profiles`, `course_progress`, `quiz_results`, `capstone_submissions`, `certificates`. Restricted to verified administrator sessions, with existing Supabase RLS policies still governing data access. This release does not change database schema, security roles or reviewer backend functions. In particular, existing Progress/Reviewer screens retain their pre-existing reviewer allowlist and RPC permissions: administrators added later should also be granted reviewer access if they must use those tools.

The UI does not expose service-role/secret keys. CSV export is scoped to filtered matches and escapes potential formula injection. Search results are paginated at twelve learners per page, but underlying reads still fetch all records up to the existing 10,000-row client cap; large deployments should move aggregate analytics and directory filtering to server-side pagination/RPCs.

### Important notes
- Active learners means learners who have any course activity, **not** necessarily learners active today.
- Average course completion is based on started learners with recorded activity, not on purchase/enrolment data.
- Recent activity derives from persisted progress, quiz, capstone and sign-up records.
- All learner records remain separated by `user_id`.
- Browser-only UI gates do not prevent raw static HTML from being downloaded; hosting middleware is required for true file-level access controls.

## Tests performed
- All existing regression tests pass, including auth-first, role access, progress, assessment, responsive and weekly course workspaces.
- `tests/admin-console-v6.mjs` validates the shared admin routes, unique assets, available UI controls and key role and escaping checks.
- Rendered pages were verified in an isolated Chromium browser with mock learner datasets at 390, 768 and 1440 px (no horizontal overflow in any of the three admin pages). Interactions verified: mobile drawer open/close, directory paging/search, detail drawer open/Escape close.
- Direct browser navigation to local app URLs is blocked by the testing environment. Actual hosted sign-in/production Supabase end-to-end tests were not performed in this release.

## Deployment
Upload/replace the contents of `Datalearningpath/` as the site root, then refresh browser caches. Retain the existing environment settings and Supabase project. Test with a real admin user on staging, then a learner user (who must not access admin pages or another user's records). Validate grading and progress RPCs after deployment.
