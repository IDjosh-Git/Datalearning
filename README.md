# Data Analysis Learning Path

A light-only, responsive learning platform for data analysis, Excel, SQL, Power BI, Python and AI-assisted analytics. Includes self-paced courses, practical exercises, downloadable datasets, learner progress, quizzes, certificates, a Practice Arena, an AI learning tutor, and administrator tools.

## Getting started

1. Review `.env.example` and `docs/SUPABASE_SETUP.txt` for authentication and API setup. Never put service-role credentials or other secret keys into browser JavaScript.
2. Install Node.js 24 and run `npm install`.
3. Run `npm run verify:deployment` before deploying to Vercel.
4. Deploy using the existing `vercel.json` configuration and configure environment variables on the hosting platform.

This is a multi-page static application with serverless API routes. Its `build` command verifies project integrity; it is **not** a compilation step. For authentication and remote services, test via an HTTP server or a configured staging deployment rather than opening pages with `file://`.

## Project layout

| Path | Contents |
| --- | --- |
| `index.html`, root `*.html` | Public and authenticated website pages |
| `courses/` | Six teaching tracks and their routes |
| `assets/styles/` | Compiled page-specific styling, shared access CSS and final `site-refresh.css` plus the new `experience.css` learning and accessibility layer |
| `assets/scripts/` | Browser code, local exercises, progress, and navigation |
| `assets/icons/` | Brand and learning-track icons |
| `downloads/` | Learner downloads and practice datasets |
| `curriculum/` | Current curriculum source data and regeneration utilities |
| `api/`, `lib/`, `middleware.js` | Serverless tutor, session verification, and access controls |
| `database/migrations/` | Database setup and migrations (server-side only) |
| `docs/` | Current setup guidance and cleanup report |
| `tests/` | Active automated checks; no retired release test scripts |

The 39 CSS files are page-oriented compatibility bundles. They replace over 120 individually loaded, version-suffixed stylesheets and preserve their cascade order, including splits at embedded page styles. The final shared light-only base is in `assets/styles/site-refresh.css`; `assets/styles/experience.css` is the **last loaded** stylesheet for motion, card geometry, responsive reading layouts and semantic learning tables. Make new presentation changes in `experience.css`, and avoid restoring versioned CSS bundles.

## Learning and interface improvements

All 26 HTML routes now load the shared `experience.css` and `experience.js` enhancement layer. The six course routes include 58 accessible concept tables (three examples per unit) and all 50 specialist modules now have guided practice prompts with learner-revealed verification and pitfall explanations. The original quizzes, project grading and progress logic remain unchanged. Motion honours reduced-motion preferences and the course tables support horizontal scrolling and keyboard focus on smaller viewports.

## Verification commands

```sh
npm run build
npm run lint
npm test
npm run test:responsive
npm run test:security
npm run test:learning
npm run test:arena
npm run test:tutor
npm run verify:deployment
```

**Validation limit:** The automatic tests check local URLs, source syntax, course and interactive logic with mocks, offline exercises, authorization and layout rules. Real sign-in, database synchronization, AI provider requests and browser interaction must be tested in a configured staging environment with test accounts.

Further details: [`docs/CLEANUP_REPORT.md`](docs/CLEANUP_REPORT.md) and [`docs/FRONTEND_AND_CURRICULUM_HANDOFF.md`](docs/FRONTEND_AND_CURRICULUM_HANDOFF.md).
