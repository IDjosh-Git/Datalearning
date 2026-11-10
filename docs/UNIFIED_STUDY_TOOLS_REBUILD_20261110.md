# DataLearning · unified public and learner UI

**Release date:** 10 November 2026

## Delivered

- One rendered, responsive public footer across the 38 public HTML routes, including lesson pages, quizzes, sign-in, verification, and the retired legacy course references. It uses one shared component (`assets/scripts/public-footer.js`) and shared CSS (`assets/styles/unified-site-v5.css`). No duplicated inline footers remain.
- A new `/study-tools.html` premium tool directory, with cards for Learning Coach, Learning Lab, AI Tutor, Practice Arena, Practice Studio, Reference Library and Prompt Library.
- Study Tools in the desktop and mobile navigation of the Academy and earlier public pages, plus a link in the role-aware learner navigation.
- A reworked Learning Coach/Learning Lab layout on `/learning-lab.html`. The seven-session planner, local session progress, backup import/export, active recall, reflections, searchable lesson library and review controls retain their existing form IDs and logic.
- Reworked Tutor Studio presentation: premium intro, learning resource shortcuts, calmer chat and settings surfaces. Offline guide, authenticated live AI mode, chat composer, provider safeguards and responsive control drawer are unchanged in functionality.
- Consistent workbench typography, colours, contrast, buttons, focus states and spacing across Practice Studio, Arena, capstone and reference pages, as well as eight protected administrative/learner pages.
- All seven course paths, 70 expanded weekly modules, weekly assessment pages, Formula Lab, grading and Supabase integration remain present.

## Validation

- `npm run verify:deployment` passed: Academy, protected access, Tutor, Arena, formula engine, Python runtime, style and script syntax tests.
- `tests/unified-site-v5.mjs` confirms 38 shared footers and the preserved Coach/Tutor control IDs.
- Isolated Chromium checks at widths 390 and 1440 for all 38 public routes (76 route/viewports) found no page-wide overflow, no duplicate footers, and no page errors in the static render.
- Additional visual tests at 320, 390, 768 and 1440 for key pages, plus eight private routes at 390/1440, found no page-wide overflow in those isolated views.
- The visual preview browser does not perform a full signed-in Supabase or AI-provider session. Re-test those workflows after Vercel deployment using actual learner credentials.

## Deployment

1. Replace the GitHub project contents with the files inside the package `datalearning/` folder.
2. Keep existing Vercel environment variables and Supabase project credentials; do not commit production secrets.
3. Deploy and verify sign-in, cloud progress, Tutor live AI, Practice Arena and certificate verification using the live site.

**Database migration:** none. All changes are frontend presentation, footer navigation and test additions.
