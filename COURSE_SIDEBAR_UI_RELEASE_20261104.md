# DataLearning — Course sidebar UI release
4 November 2026

## User-visible changes
- Excel, SQL, Power BI and Python: redesigned weekly navigator with individual subject accents, clear lesson-number icons, active/completed states, readable search, course-mark header, bordered shortcuts and a progress card.
- The weekly lesson index automatically opens on desktop so users can discover the 10 lessons immediately; it remains collapsible and opens on mobile when a week is selected or the search is used.
- Introduction: rebuilt the lesson-map colours, active-state contrast, number badges and tutor-help panel.
- AI: rebuilt the small-screen week navigator's label, pills, hover/current state and contrast.
- Course drawers now begin below the 76px sticky global header on narrow screens so the course name isn't obscured.
- Service-worker cache key advanced to `dalp-public-course-rail-v31`; release assertions updated accordingly.

## Preservation
- No learning datasets or challenges deleted; no course lesson text rewritten.
- Course progress, search, keyboard focus, lesson navigation, student state and main page functionality remain in place.
- Other pages retain their original UI except for the new cache revision and the scoped public-motion course selectors.

## Verification
- `npm run build`: passed.
- `npm run lint`: passed.
- `npm test`: passed (all core/responsive/learning/security/arena/tutor suites).
- `npm run test:responsive` after the mobile header correction: passed.
- `tests/course-sidebar-modern.mjs`: passed; verifies four 10-week navs, six course types, icons, search and contrast pairs meeting >=4.5:1.
- Chromium HTML/CSS layout checks for SQL/Excel/Power BI/Python at 1440px, Introduction at 1440px, AI at 390px, and SQL drawer at 390px: no horizontal overflow detected. Screenshots are CSS-rendered local previews, not signed-in Vercel browser tests.

## Publishing
- Extract the complete ZIP into the Git-linked `Datalearning` repository, preserving folder paths, and push a **new commit** to the production branch. A Vercel rebuild of an older Git commit cannot publish these source changes.
- Verify deployed course routes in desktop/mobile browsers and confirm the Vercel deployment references that new commit.
