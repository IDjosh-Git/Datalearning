# Data Learning Path — Version 20.0
## Unobstructed Learning Coach and progress-save feedback

**Base:** Version 19.0. This is a complete replacement build, not a patch to copy into an older version.

### User-facing changes

- Removed the persistent floating **My Learning Coach** action that could cover lesson controls and the mobile bottom navigation.
- On **each of the five course pages**, added a compact, in-flow **Course study tools** row *before the hero section*, containing **Learning Coach**, **Practice Arena**, and (where supported) account sync status. The row automatically wraps on narrow phones.
- On **other learner pages**, the coach now lives in the primary header (desktop) or near the **top** of the **More** navigation drawer (mobile/tablet), instead of hovering above content.
- The coach itself opens as a dismissible, scrollable dialog: backdrop, Escape key, a clear close button, and a keyboard focus loop. It supports light and dark mode and mobile safe-area sizing.
- The **Progress saved** indicator is now an in-flow status button inside each course's tools row, not a fixed badge in the bottom-right corner. It remains clickable for a manual sync/retry and preserves all existing cloud sync behavior.
- Removed redundant **floating Practice Arena** shortcuts from learner pages; access remains in the primary navigation, and course pages have the new in-flow Practice Arena shortcut.
- Updated coach and sync asset query versions to `20261022.20` to avoid retaining stale cached scripts; added a final common stylesheet `assets/course-utilities-v20.css` to all 22 pages.

### Technical scope

Modified `assets/learner-companion.js`, `assets/course-sync.js`, all five course HTML pages and the relevant learner HTML pages. Added `assets/course-utilities-v20.js`, `assets/course-utilities-v20.css`, and `tests/course-utilities-v20.mjs`.

Learner authentication, cloud sync semantics, review schedules, bookmarks, study notes, learning materials, quizzes, capstone assessments, certificates, instructor workflows and administrator access-control logic were retained. Practice Arena links now use the course utility row, not fixed positioning.

### Verification

- **56 completed browser layout scenarios**: 7 representative screens (home, five courses, account) × 2 themes × 4 viewport widths (320, 390, 768, 1440). **56/56 passed** with no document-wide horizontal overflow and with coach/sync actions not fixed over the interface.
- Additional learning-coach open, close, and layout checks at **390, 768, and 1440** in light/dark selections; panel visible, editor present, and close control functional.
- Existing `npm test`, `npm run test:responsive`, `npm run test:workspace`, `npm run test:admin`, `npm run test:server-auth`, `npm run test:courses:v17`, and `npm run test:theme:v18` passed.
- New source-level check `node tests/course-utilities-v20.mjs` passed, confirming all 22 pages, course toolbar integration and removal of fixed practice buttons.

These are **isolated browser visual/interaction checks** and automated tests; a live production authenticated device QA pass has **not** been completed. The application has **not been deployed**. When deploying, replace the full version and invalidate older cached assets.
