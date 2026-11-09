# DataLearning — Premium Weekly Learning + Standalone Quiz

**Release:** 8 November 2026  
**Scope:** All six courses; ten weekly lessons for each of Excel, SQL, Power BI, Python and AI Integration, plus eight Data Analysis Foundations lessons.

## Learner-facing experience

- The original, substantial weekly lesson material, demonstrations, guided labs, resources, practice exercises and week completion controls remain available.
- Each week has a consistent, premium, responsive orientation panel: **what you will learn**, **why it matters at work**, **the big idea**, **three steps to follow**, **expected result**, and a practical next action. The original teaching examples are retained; orientation summarizes and scaffolds them rather than replacing the lessons.
- Week pages visibly separate **Learn**, **Guided practice** and **Questions to try**, with a prominent CTA at the end of the practice flow.
- The questions now live on `quiz.html?course=<slug>&week=<1..10>` rather than in an expanding question block at the bottom of lessons. `quiz.html?course=introduction&week=final` runs the original foundation assessment and `quiz.html?course=<slug>&week=mastery` runs the course mastery checkpoint.
- Dedicated quiz screen includes course breadcrumb, back-to-lesson route, responsive gradient banner, accessible multiple-choice selections, answer-progress indicator, score, correct options, explanations, retry and previous/next assessment links where relevant. Mastery uses its original question pool and scoring logic in a responsive card grid.
- Existing quiz question texts, option keys and course concepts were preserved. The Introduction lesson guide now includes eight specific applied learning examples and three-step routes.

## Data, access and compatibility

- Quiz pages remain publicly viewable, consistent with the original courses; no account is required to practise.
- Quiz scores are kept in local storage and, when signed in, existing weekly result records are upserted into the existing Supabase `quiz_results` table using the same columns and conflict keys as `course-sync.js`.
- Quiz scores **do not automatically mark the lesson completed**. The existing completion control in the lesson remains the authoritative user action.
- The client-side quiz bank is embedded with original question content and answer keys. No backend additions, schema migrations, or API keys are required.
- Styling extends `premium-unified.css` for consistency with the Blueprint/melon/ivory design system. Existing accessibility focus rings and mobile contrast states remain.

## Files added or updated

- New: `quiz.html`, `assets/scripts/weekly-quiz-bank.js`, `assets/scripts/premium-quiz-page.js`, `assets/scripts/premium-lesson-data.js`, `assets/scripts/premium-lesson-upgrade.js`
- Updated: all six `courses/*.html` entry points, `assets/scripts/weekly-workspace.js`, `assets/scripts/course-checkpoints.js`, `assets/styles/premium-unified.css`, `assets/scripts/premium-search.js`
- Updated: `docs/SITE_ROUTE_MANIFEST.json` and navigation/style/integrity tests, with `tests/premium-weekly-learning-route.mjs` for future regression checks.

## Verification and deployment

- `npm run verify:deployment` (build, lint, full test suite) passed in the local working copy.
- In-memory Chromium rendering and event checks covered Excel, AI, Python, Introduction and mastery assessment UI at 390px and Excel at 1440px: no quiz-page horizontal overflow; weekly scoring, feedback and retry passed.
- Mobile lesson components were instantiated in Chromium for Excel, AI and Introduction. A stripped-down, in-memory HTML preview intentionally omitted the site's existing styles; use a real deployment preview to confirm final cross-device appearance and authentication on the live domain.
- Publish **the contents of the ZIP's `data-analysis-learning-path` folder** into the GitHub repository root and redeploy through Vercel. Do not replace only the new quiz file. No live deployment or production database changes were performed here.
