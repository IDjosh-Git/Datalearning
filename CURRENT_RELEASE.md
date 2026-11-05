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

