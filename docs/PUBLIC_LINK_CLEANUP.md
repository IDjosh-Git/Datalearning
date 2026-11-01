# Public link cleanup — 1 November 2026

## Scope

- Reviewed 29 public HTML pages (root-level public routes and course/roadmap/extension pages).
- Converted 310 public resource/action hyperlinks to a shared `.dalp-plain-link` style. The existing destination URL, semantics, controls and JavaScript-bound class names remain intact.
- Replaced four homepage quick-access cards with four ordinary links; the links retain their original destinations.
- Removed three unused, hidden floating learning-lab link containers.
- Unboxed the tutor resource list and standalone roadmap milestones. Course outlines, actual lesson content cards, progress panels, quizzes, forms, interactive buttons, accessibility and the global header were not flattened.
- Kept the existing `assets/styles/design-system.css` as the shared last stylesheet. No new stylesheets or script files are required for the design change.
- Added `tests/public-link-cleanup.mjs` to the existing core test run.

## Link design

Public content actions are underlined indigo text on transparent backgrounds, not pill buttons or nested cards. Focus outlines and touch-sized hit areas are retained. Text can wrap on narrow screens. The prompt-library callout is a pale background to ensure these links remain legible. Existing navigation and functional button styling are unaffected.

The `#3035b0` link colour has contrast of approximately 9.28:1 on white, 8.66:1 on `#f5f7fb`, and 8.24:1 on `#edf1ff`.

## Verification and limitation

Run `npm run verify:deployment`, or separately run `npm run build`, `npm run lint`, and `npm test`. The test suite includes the new public-link check, the navigation audit, and the existing course, authentication, admin and learning checks. Visual browser screenshots could not be obtained in this environment; verify desktop/mobile rendering after deployment.
