# DataLearning — canonical source cleanup (5 November 2026)

## Scope

Baseline: `DataLearning_Obsolete_Pages_Conflict_Cleanup_20261105.zip`. This is a conservative **source cleanup**, not a redesign or a database reset. No obsolete alternate HTML course players existed in the supplied baseline, so no legitimate linked course pages were deleted.

## Deleted obsolete files

- `assets/scripts/course-player-focus.js`: duplicated the premium sidebar's active-link, focus and mobile inert handling.
- `assets/scripts/course-lesson-disclosure.js`: duplicate lesson-disclosure controller.
- `COURSE_CONFLICT_CLEANUP_20261105.md`, `LESSON_SIDEBAR_PREMIUM_MOBILE_20261105.md`: outdated release notes.
- `docs/FRONTEND_AND_CURRICULUM_HANDOFF.md`: historical handoff with obsolete stylesheet references.

## Consolidated behavior

- `course-premium-sidebar.js` now owns mobile drawer, close/backdrop synchronization, focus, active lesson, lesson disclosure and search across all six course pages.
- `course-experience.js` keeps completion and mastery enhancements but no longer competes to update links, scroll position or drawer state.
- `course-reading-tables.js` owns the scroll/accessible teaching-table wrapper, preventing multiple nested regions. The old table wrapper was deleted from `learning-catalog.js`, and `experience.js` skips course pages while retaining other pages' accessibility enhancements.
- Cache identifier increased to `dalp-public-course-clean-v47`; static HTML/CSS/JS are still network-fetched, not service-worker cached.
- `docs/README.md` and root `README.md` now point only to existing current sources.

## Preserved

All six course players, the twelve linked roadmaps/extensions, remaining active public/private routes, premium styling, learning guide, sign-in, progress, quizzes, practice, tutoring, downloads, and database migrations. No production website, cloud data or authorization settings were changed.

## Verify

- `npm run verify:deployment` (build, lint, responsive, learning, security, practice and tutor): **PASS**.
- `tests/course-single-controller.mjs`: **PASS** — verifies all six course pages reference one current drawer and table enhancer.
- Isolated Chromium UI fixtures: **12/12 PASS** (all six courses at 390px and 1440px, drawer open/Escape/close, desktop lesson-disclosure).
- Isolated course-table fixture: **PASS** — one table region, no nested legacy wrapper.
- Full local-URL browser navigation was **blocked by the testing environment** (`ERR_BLOCKED_BY_ADMINISTRATOR`), so live Vercel preview, asset/CDN loading, and authenticated flows must still be checked after deployment.


## Course reading space, progress placement and loading (5 November 2026)

Baseline: `DataLearning_Latest_Clean_Consolidated_20261105.zip`.

### Course layout and visual fixes

- Corrected a high-specificity shared-theme regression that rendered six course headings and introductions as **white text on white backgrounds**. This was causing large, apparently empty hero spaces even though the content was present.
- Reclaimed the course reading width and reduced oversized hero padding on desktop and mobile.
- Expanded mastery and quiz panels to use the available content column. For Excel, SQL, Power BI and Python, the introductory learning grid now stacks the core lessons across the full reading width and arranges supplementary cards into responsive multi-column groups on larger displays.
- Kept the existing premium lesson-navigation sidebar and mobile drawer, with no second course-list sidebar.

### Progress status

- The save/sync badge now lives beneath the existing course-progress meter (Excel, SQL, Power BI, Python) or inside the progress card (AI); it is no longer inserted at the top of the teaching content.
- Introduction's save/sync status is relocated to the lesson-navigation support area; its visible lesson completion meter remains unchanged.
- Cloud sync, local progress, retry, and quiz saving logic are retained.

### Initial rendering improvements

- Modern browsers may skip expensive layout/paint for off-screen lessons and individual mastery blocks via `content-visibility:auto` and `contain-intrinsic-size`. Visible reading content renders normally.
- Removed course hero entry animations that could delay readable content, and reduced oversized introductory panels.
- Print views explicitly restore full rendering of all course sections.
- Service-worker version bumped to `dalp-public-course-reading-v48`; current HTML/CSS/JS remain network-first and are not stored in the public offline cache.

### Verification and limitations

- `npm run verify:deployment`: PASS, including learning, responsive, authentication, practice and tutor suites.
- Standalone responsive CSS/browser checks: **24/24** passes (six courses at 320px, 390px, 768px and 1440px), no horizontal overflow and readable course headings.
- Isolated Chromium progress badge placement fixture: PASS.
- `tests/course-content-first.mjs`: PASS.
- Browser URL navigation to local files is blocked by the browser testing environment. Tests used an isolated in-memory rendered HTML/CSS fixture; an actual production network waterfall, authenticated cloud sync, and field performance timings have **not** been measured. Confirm those on a Vercel preview before production rollout.

No published pages, learner data, server secrets or database records were deleted. The live Vercel deployment was not changed.

## Premium ivory lesson sidebar and header clearance (5 November 2026)

Source baseline: `DataLearning_Course_Layout_Progress_Performance_Fixed_20261105.zip`.

- Added one consistent **white-gradient** sidebar across Introduction, Excel, SQL, Power BI, Python and AI. Course identity, navigation buttons, active lesson indicators, lesson disclosure, search, tools, support and progress cards have bright, accessible surfaces.
- Preserved course-specific purple, green, blue, gold and indigo accents without restoring the removed course-list sidebar.
- Moved desktop lesson rails down beneath the sticky global navigation header using an administrator-style inset. Fixed the mobile drawer/header stacking with a header-aware top inset and properly ordered backdrop.
- Added the lightweight `course-sidebar-header-offset.js` observer for changing header heights when the viewport is resized. No data, authentication, quiz or progress logic was changed.
- Kept the CSS in the final shared `premium-unified.css`, rather than loading another stylesheet, to avoid additional blocking requests and satisfy the existing single final-style-layer contract.
- Advanced the public image-cache revision to `dalp-public-course-ivory-v49`. HTML/CSS/JS continue to be network-fetched.
- Project test suite: `npm run verify:deployment` PASS. Sidebar-only browser checks: 24/24 passes, with mobile drawer opening/Escape closure, no horizontal overflow, and no header overlap at 320/390/768/1440px. These were isolated in-memory Chromium tests because local browser URL navigation is blocked in this environment; verify the deployed Vercel preview independently.

The Vercel production deployment has not been changed.
