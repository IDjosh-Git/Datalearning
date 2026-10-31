# Course roadmap, extension and checkpoint updates

This release separates each course's large roadmap and curriculum extension from the main lesson page.

## What changed

- Added twelve lightweight, light-only resource pages: `courses/<course>-roadmap.html` and `courses/<course>-extension.html` for Introduction, Excel, SQL, Power BI, Python and AI.
- The first page combines the four-milestone orientation (where present) with a linked module plan. Each module links directly to its original lesson.
- The extension page retains the existing applied-unit worked examples and practice; Python now also has four newly authored applied units.
- Course heroes have visible **Course roadmap**, **Curriculum extension**, and **Mastery checkpoint** links without occupying a large section of vertical page space.
- The in-course roadmap and extension sections have been replaced by brief links, without deleting their instructional content.
- Expanded the Course Mastery Checkpoint from 3 questions to 10 in each of the six courses. The checkpoint is practice-only, with explanations, scoring, retry, best-score tracking, and a deep-link target.
- On desktop, mastery questions use two columns and the panel uses the reading column's available width. Mobile remains single-column. This stylesheet respects keyboard focus and reduced-motion preferences.
- Removed unnecessary technology/logo badges from the Practice Arena page header; challenge-specific difficulty information is still retained.

## Deployment and checking

- `npm run build`, `npm run lint`, `npm test` pass in the provided environment.
- `tests/course-resource-pages.mjs` checks guide links, targeted lesson IDs, the 60-question bank and the Practice Arena header.
- 38 HTML routes and 703 local links are checked by the project integrity suite.
- Vercel's `vercel.json` continues to use `"outputDirectory": "."`, so `index.html` remains deployable from the repository root without a `public` folder.

### Remaining live validation

The local Chromium browser is blocked from loading locally served pages with `ERR_BLOCKED_BY_ADMINISTRATOR`. Hence no end-to-end visual/interaction claim is made for the updated layout. After deploying to a preview URL, verify the new links, desktop two-column checkpoint at 1366/1920px, mobile at 390px, quiz scoring and retry, and expected Supabase/AI features with a test account. Existing course quiz and certificate requirements are unchanged.
