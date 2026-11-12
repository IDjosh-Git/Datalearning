## Admin Course Analysis and Learner Detail Refinement — 12 November 2026

- Restored the dark navy/teal gradient Course Analysis header with light text and accessible contrast.
- Eliminated page-wide borders/outlines while retaining meaningful boundaries around individual cards.
- Redesigned the Learners & Progress detail drawer with account avatar, role, circular overall progress, four key metrics, filterable nine-course cards, score and individual-week details.
- On narrow screens the drawer fits the viewport width, with independently scrolling content and readable compact layout.
- Existing administrator permissions, data requests, and learning activity calculations are unchanged.

## 12 November 2026 — Unified Learners & Progress, admin engagement and clean layouts

- Merged the duplicate Learner Management and Progress Reports admin navigation into one role-filterable **Learners & Progress** view on the current Admin Dashboard. No admin short link or search destination points to the retired progress page. The historical URL remains protected for existing bookmarks.
- Added verified role/learning KPI cards, per-account progress bars, course and status filters, accessible View details sheets with nine course summaries, per-course quiz/capstone/certificate outcomes and ten weekly checkpoints.
- Fixed the analytics bug that excluded the signed-in administrator from course engagement metrics. A verified administrator who genuinely studies is included as an engaged learner in overview, analytics and personal detail views; role-based access is unchanged.
- Added verified account role and email to the shared private sidebar directly above Sign out. Both administrator and learner identities display on their respective accounts.
- Removed obsolete page-wide dark roster and course-header underlay rules, eliminated unused decorative hero HTML and included a scoped premium admin/review design stylesheet. Fixed legacy content-box sizing that clipped the mobile learner detail drawer.
- Automated tests and isolated Chromium mobile/tablet/desktop checks passed. **Source only:** deploy and smoke-test with real accounts before considering the live site updated. Full notes: `docs/ADMIN_UNIFIED_LEARNER_PROGRESS_20261112.md`.

---

## 11 November 2026 — Mobile refresh recovery & Tutor AI response readability

- Fixed the server session renewal endpoint's navigation failure path: when a Supabase refresh token is invalid, the browser returns to the sign-in screen with its original destination instead of displaying raw `{"error":"Session expired"}` JSON.
- Invalid first-party session and refresh cookies are cleared to prevent a redirect loop. Temporary Supabase connection problems show a minimal human-readable **Retry session** page without discarding the intended course route.
- Reuse still-valid access tokens on navigation instead of rotating refresh credentials prematurely, reducing refresh-token race conditions during mobile page reloads.
- Refined Tutor Studio's shared AI response styles: inline emphasis stays inline; paragraphs, headings and lists use consistent vertical rhythm; chat response bubbles have intrinsic height instead of fixed/limited height. Wide tables and code blocks scroll within their own containers, and code text has explicit readable contrast.
- Scoped legacy `.bubble b` label styling to the bubble's direct child and loaded the shared response stylesheet last on Tutor Studio to avoid competing older theme rules. Floating AI remains on the shared formatter.
- Added tests for expired refresh-token redirects, network failures, live-token reuse and Tutor response styling. Full `npm test` passed; isolated Chromium renders of content-heavy replies passed at 320, 390, 768 and 1440px without page overflow or adjacent-card overlap.
- These fixes are in source files only. The live site requires redeployment and an authenticated mobile-device smoke test to confirm the real-world session lifecycle.

---

## 11 November 2026 — Current release: administrator access and stylesheet hygiene

- **Learners cannot open administrator pages.** The `site_admins` table is checked through Supabase, administrator navigation is hidden by default, and Vercel middleware denies direct access to administration pages and their protected assets. A signed-in learner receives HTTP 403 for a protected admin URL; no CSS-only access control is used.
- Removed **10 unnecessary Practice Studio stylesheet requests** from learner, Tutor, capstone and administrative pages. The genuine `studio.html` still loads `practice-workspace-premium.css`; `practice.html` continues using its consolidated Arena stylesheet. Shared styles required by other features remain installed.
- Cleaned **820 identical repeat CSS declarations** and 127 empty rule blocks from 15 stylesheets, using exact selector and media-context matching to preserve effective cascade behavior. The stylesheet audit found no whole CSS file that was safe to delete: all 51 stylesheets have a runtime reference. The deletion of truly unused older stylesheet files was handled in earlier releases.
- Added an explicit display safeguard for hidden administrator navigation to prevent generic card/display rules from inadvertently showing an Admin group while role verification runs.
- Updated the Studio layout regression test to enforce route-appropriate styles, plus a new stylesheet hygiene and administrator navigation test. No page, challenge, teaching image, user record, or database schema was removed.
- Automated tests passed. This is **source code only**, not a live deployment; administrator access and performance should be smoke-tested after publishing. Previous entries below are historical change notes, not descriptions of the current state when newer changes supersede them (for example, course cards now use compact icons, while lesson visuals remain).

---

## 11 November 2026 — One sign-in across Learning Dashboard and every app page

- Fixed a race on `account.html` where the dashboard checked Supabase before `DALP_AUTH_RESTORE` completed and incorrectly sent signed-in learners back to `auth.html`. Dashboard data now waits for the shared `DALP_AUTH_GATE.whenReady` signal, which only resolves after user verification.
- The profile editor and public/private profile-navigation controls now also respect the existing verified session instead of briefly treating a restoring account as a guest.
- Added a server-side renewal continuation for a valid HttpOnly Supabase refresh cookie when the short-lived access cookie expires. Navigation securely renews the cookie then resumes the requested local app page; missing/invalid refresh credentials still require normal sign-in. No access tokens are placed in redirect URLs and all protected routes remain gated.
- Renamed **My Learning** to **Learning Dashboard** on the dashboard, public header, mobile navigation, private sidebar and search/navigation copy. The dashboard link now uses a premium two-line card with an accessible icon; the dashboard's progress widget has refined styling.
- Added/updated tests covering deferred readiness, premium dashboard links, session expiry renewal, private assets and open-redirect prevention. Full project automated suite passed. Isolated Chromium layout checks passed at phone, tablet and desktop widths. No live deployment or live-account authentication smoke test has been performed.

---

## 11 November 2026 — Study Pulse cloud-save status correction

- Removed the obsolete Study Pulse footer claiming notes and study history stay in local browser storage, plus the inaccurate "auto-saved on this device" note.
- The footer now displays an accessible, live status for Supabase cloud readiness, pending saves, successful saves, signed-out use and failed saves. No cloud confirmation is displayed until a save finishes successfully.
- Study Pulse refreshes its notes, habits, bookmarks and spaced-revision data after the authenticated cloud workspace hydrates. Temporary unsynced edits remain in memory only.
- Added a cloud-storage persistence acknowledgement that also works if the debounced background save finishes before Study Pulse checks the result. Regression tests cover success, failure, guest access and stale copy removal.
- Source project only; production website has not been redeployed. The existing authenticated Supabase project is unchanged.

---

## 11 November 2026 — All-course illustrated cards and cleaner Excel results

- Every course now shows a dedicated first-week instructional illustration in both the home discovery cards and course catalog cards, rather than relying on an icon alone. The full set of 90 week-specific lesson interface images remains present, with lazy loading and consistent responsive aspect ratios.
- Removed the redundant visible Excel formula textarea beneath the worksheet disclosure. Its original input stays mounted, explicitly hidden and synchronized with the single formula bar so challenge grading keeps working.
- Redesigned the Excel calculation output as a labeled result card with separate value, formula, status, explanatory guidance and a clear error state. Numbers are displayed with readable digit grouping; calculations still use the original numeric output, with no change to the evaluator.
- Full automated test suite passed. Direct browser navigation in this build environment was blocked, so no claim of browser-rendered testing is made. Source-only; live deployment not performed.

---

## 11 November 2026 — Full-width, scrollable SQL query results

- SQL query results now occupy a dedicated full-width panel beneath the editor, rather than the narrow side column. Excel and Python retain their existing layouts.
- The table preserves readable column widths, with horizontal scrolling for wide result sets and a height-capped vertical scroll for long queries; neither causes sideways page overflow on mobile.
- Added clear result status spacing, alternating row surfaces, a sticky header, a scroll hint, an accessible table caption, keyboard-focusable scroll region and column headers.
- Preserved the read-only SQL execution engine, errors, console, grading, and query-input handling. No changes to datasets, progress, user accounts or any of the nine courses.
- All project tests passed. A browser-rendered 50-row, seven-column SQL result was verified at 320, 390, 430, 768, 1024 and 1440px; horizontal movement remains inside the table. No live deployment performed.

---

## 11 November 2026 — Single career roadmap and nine course entry points

- Removed the obsolete standalone `courses/python-roadmap.html` and `courses/ai-roadmap.html` files from the release entirely.
- Removed/replaced every link to those obsolete pages in the Python and AI course readers and their supplementary extension guides. Their navigation now points to the canonical `career-path.html` page.
- The new **Your Complete Data Career Path** page features nine premium, responsive guided-course cards: Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, Statistics, Python, and AI. Every card links directly to its 10-week course.
- All 31 advanced roadmap modules retain their teaching content, business examples and challenges, with context-specific links to related courses; Python and AI are included using existing `courseBridges` definitions.
- Updated the route manifest and retired the obsolete-page expectations in the test contracts; added `tests/roadmap-single-source.mjs` to prevent regressions.
- The full `npm test` suite passes. An isolated Chromium rendering verified nine cards, Python and AI links, no runtime errors and no horizontal overflow at 320, 390, 768 and 1440px.
- The existing six-stage collapsible **in-course** Python/AI learning guide remains available; only the two redundant standalone Course Roadmap pages were removed. This ZIP does not perform a live deployment.

---

## November 11, 2026 — Premium paginated Formula & Code / Prompt Libraries

- Replaced the former library-only layouts with a shared, theme-aligned responsive design.
- Removed unused `assets/styles/reference.css` (227 KB) and `assets/styles/prompt-library.css` (223 KB) entirely; both pages load only `assets/styles/learning-libraries-premium.css` with route-scoped selectors. Other public pages are unaffected.
- Formula & Code Lab retains all 639 existing references and deep links (`?group=...&q=...`), category/difficulty filters, saved bookmarks and code copy, with an accessible full-example dialog.
- Prompt Library retains all 300 prompts, topic/level search, existing saved prompts, exports, downloadable Markdown, AI course links and accessible full-prompt dialog.
- Replaced unbounded cards / incremental load-more with 12-card page navigation (Previous and Next); standard desktop uses 3 columns, very wide desktop 4, tablet 2, mobile 1. Filters reset to the first page; page changes return focus to the results viewport.
- Improved keyboard focus states, reduced-motion behaviour, modal focus return, code scroll, small-phone sizing and empty-state help.
- No course progress, assessment, capstone, Supabase schema or application-routing changes.
- Added `tests/library-premium-pagination.mjs` and ran the complete deployment regression suite. Full browser navigation is restricted; interactive behaviour was verified in an isolated browser rendering with actual library content and scripts.

---

# DataLearning — Formula & Code Lab and five-question specialist quizzes (11 November 2026)

- AI and Python: each weekly quiz is **five questions**; both final mastery checks now use five representative weeks. Python gained two topic-specific questions per week. Other courses keep their existing quizzes and progress IDs.
- The Reference Library now includes real **Python/pandas** and **Power Query M** examples as well as Excel, DAX, SQL and the existing Power Query examples. Its search accepts prefiltered links from the lessons.
- Week-specific **Formula & Code Lab** shortcuts are shown in the relevant Excel, Power BI/DAX, SQL, Python, Power Query and AI-generation lessons. The link includes category and topic filtering, without creating a duplicate lab page.
- Snippets explain why they work and how to validate them; the reference is for copying/study, not code execution. Use the Practice Arena for supported execution; M and DAX must be run in compatible tools.
- The existing `mastery_results` database requires `total=10`. The five-question specialist mastery result is **normalized to a ten-point score** when saved to the cloud; the learner-facing quiz and local record still show five questions. No database migration is required.
- Public cached imagery stays intact; old HTML/JS/CSS caches are purged by the updated service worker version. All existing course pages, progress, datasets, quizzes and capstones are preserved.


## 11 November 2026 — all nine mastery assessment links

- Verified AI and Python course pages share the same `academy-app.js` lesson renderer and course stylesheet as the other seven courses, rather than using legacy course HTML.
- All nine courses now show their actual final assessment in the course sidebar. The Week 10 mastery button has a refined premium treatment and the catalogue's expanded curriculum and learner progress cards include direct mastery links.
- Existing mastery assessments remain unchanged: 10 review questions for the seven core courses and 5 for AI and Python. Results continue using the existing `mastery_results` database table and ten-point scoring format.
- Added a regression test covering all nine course pages, links, quiz counts, and shared CSS. No migration or course data modifications.

- Updated course stylesheet query strings on all active course readers and the Courses catalogue to prevent stale premium styling after deployment. Verified CSS parsing and JavaScript syntax.

## Practice Arena unified workspace — 11 November 2026

- SQL, Excel and Python now use the same compact, responsive editor/output shell; the existing SQL engine, spreadsheet evaluator, Pyodide worker and Python challenge grader are unchanged.
- The Python editor, Run/Stop controls, grading button, runtime status and output are presented in the same first-class layout as SQL/Excel; live controls are moved rather than cloned.
- Switching a workspace tab changes subject immediately. The dedicated Browse Challenges button still opens the full challenge selector.
- Academy navy, orange, off-white and shared UI tokens now style the Practice Arena shell, results, tables, editor controls, cards and mobile action dock; the layout avoids page-level horizontal overflow down to 320px.
- One collapsible Challenge Brief remains above the editor. Hints, worked answers, grading and per-task drafts remain available.
- The secondary mobile Run control now calls Python Run when Python is selected instead of incorrectly displaying/calling SQL Run.
- Added `tests/practice-unified-three-workspaces.mjs` to the Arena regression suite.

Deployment: Upload the contents of this `datalearning/` project to the existing host using normal deployment procedures. This ZIP is project source, not a claim of production deployment.

## Mastery 50-question assessment & deeper weekly learning (11 Nov 2026)
- Nine course mastery assessments now include 50 course-specific questions each (five items from each of ten weeks). One visible question at a time; Check Answer disabled until a choice is made. Detailed answer rationale, every distractor, worked example, validation and pitfalls are shown after checking.
- Added Previous / Next navigation and per-week exam score report, with optional same-tab draft restoration. Existing weekly quizzes remain unchanged.
- Expanded every weekly module with business context, four core concepts, a guided analytical walkthrough, a worked scenario and verification notes.
- The existing Supabase mastery_results table requires a legacy 0–10 score and total=10; the UI displays and stores locally the true raw score out of 50, while cloud sync sends the accurate percentage and compatible normalized score. No schema changes are required.
- Changes are source-only and not deployed to a live domain.


## 11 November — Mastery selection and visual consolidation
- A course-less mastery assessment URL (`quiz.html?week=mastery` or `quiz.html`) opens a premium course-selection landing page and never displays questions until a course is chosen. Deep links with course parameters remain valid selections.
- A Change course control returns to the course selector. Existing 50-question exams, validation, explanations, and progress storage are preserved.
- The redundant advanced career/roadmap end-of-lesson section was removed from Python and AI core lessons; practical teaching material remains.
- The Reference Library hero heading and actions are centered across desktop, tablet and mobile.
- The Practice Arena loads a consolidated `practice-arena-premium-final.css` instead of six legacy override layers. The legacy mobile action dock was removed and a single canonical Run Query or Calculate button is used across screen sizes; the original SQL challenge action remains wired invisibly for execution.


## 11 November 2026 — AI/Python roadmap and Reference Library compact hero

- The optional six-stage "Your path from the interface to a professional report" section on AI and Python course pages is now presented inside a modern, responsive card.
- The roadmap is **collapsed by default**; the accessible **View roadmap + / Hide roadmap −** button controls a single panel. All existing stages, descriptions and practice tasks remain available.
- The Reference Library hero is shorter and centered vertically and horizontally. Its existing toolkit highlights are retained in a compact summary strip below the hero, not inside the large background.
- Updated course and Reference Library asset cache versions and added the focused regression test `tests/specialist-roadmap-toggle-reference-compact.mjs`.
- Confirmed visually at 1440, 768, 390 and 320px (Reference Library), and 1440, 390 and 320px (both roadmaps); no horizontal overflow; toggle expanded/collapsed successfully.

## 11 November — Mobile full-width Practice Arena and light SQL code surface
- Reduced the Practice Arena's mobile outer gutters to 6px per side and removed redundant nested spacing so all workspace cards, editors, tabs, and result panels use the available screen width.
- Corrected the SQL editor's historical overlapping dark and light layers: the query editor, syntax-highlight pre, and line-number gutter now render as one light surface with dark, contrast-aware syntax colours. The native textarea, selection, caret, input/composition events and scroll synchronisation remain intact.
- Added mobile screen-width assertions and a dedicated `tests/practice-mobile-sql-light.mjs` contract. Browser visual checks were performed at 320px, 390px, 768px and 1440px with no horizontal page overflow.
- Existing challenge selection, SQL/Excel execution and grading, Python worker, weekly lessons, mastery questions, progress and cloud schema are unchanged. The full `npm test` suite passed.
- Source release only; no live deployment was performed.

### App-wide premium sign-in (11 November 2026)
- Refined standalone mobile-first sign-in page with desktop split-panel design; all form modes remain keyboard accessible.
- Vercel request-time middleware covers the entire application instead of selected private pages. `/auth.html`, its needed assets, and `/api/auth/session` remain public; everything else requires an authenticated session.
- Sign-in must successfully establish a server-side HttpOnly session cookie before navigating into the app.
- All 37 non-auth HTML pages retain an additional client-side first-paint protection guard.
- No production deployment performed from this package.


## 2026-11-11 · Mobile sessions, Tutor layout, profile, navigation and account roles
- Mobile refresh: an expired navigation goes to first-party sign-in or a safe renewal page rather than showing raw JSON. Background JSON APIs still return status codes. No active login is deliberately revoked when a transient verification service is unavailable.
- Tutor: final rich-response stylesheet is loaded after legacy skins; message cards grow with content and wide tables scroll horizontally within each bubble.
- Profile: one top-navigation Profile entry opens the existing editor, updates Supabase Auth metadata, and synchronizes the learner directory name under RLS. Profile photos remain private in Supabase Storage.
- Navigation: admin and Review Desk links occur only in the admin sidebar on private workspace pages. The Profile control remains in the top bar; redundant sign-in and profile cards are removed from the sidebar.
- Supabase: `learner_profiles.role` mirrors `site_admins` through protected triggers. All actual admin accounts appear in the learner directory with a role badge, but authorization still checks `site_admins` and instructor allowlists. Learner client roles cannot be edited.
- Verification: run `npm test`, test an actual signed-in refresh and profile update on deployed hosting, and verify the admin directory with authorized accounts.


## 2026-11-11 — Verified app membership, learner counts and shared Supabase isolation

- The learner directory stopped inheriting all `auth.users` records; DataLearning login, explicit app use, documented learning activity, or the administrator allowlist is now required.
- Archived profiles of unrelated Auth accounts in a private, non-exposed schema; no accounts or learning history were deleted.
- The admin console loads `learner_profiles` as the authoritative app directory; registration awaits the DataLearning usage record before page navigation.
- Live reconciliation found 3 verified learners and 1 administrator, while 4 learners were expected. The fourth legacy learner must be identified by verified app sign-in or account reconciliation, rather than guessing from shared Supabase Auth sign-ins.
- See migration `database/migrations/20261111_verified_datalearning_members_only.sql`; applied to the connected Supabase project. Live app source still requires deployment.
