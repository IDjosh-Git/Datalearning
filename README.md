# Data Analysis Learning Path

A light-only, responsive learning platform for data analysis, Excel, SQL, Power BI, Python and AI-assisted analytics. Includes self-paced courses, practical exercises, downloadable datasets, learner progress, quizzes, certificates, a Practice Arena, an AI learning tutor, and administrator tools.

## Getting started

1. Review `.env.example` and `docs/SUPABASE_SETUP.txt` for authentication and API setup. Never put service-role credentials or other secret keys into browser JavaScript.
2. Install Node.js 24 and run `npm install`.
3. Run `npm run verify:deployment` before deploying to Vercel.
4. Deploy using the existing `vercel.json` configuration and configure environment variables on the hosting platform.

This is a multi-page static application with serverless API routes. Its `build` command verifies project integrity; it is **not** a compilation step. For authentication and remote services, test via an HTTP server or a configured staging deployment rather than opening pages with `file://`.

## Project layout

The canonical route and access inventory is in [`docs/SITE_ROUTE_MANIFEST.json`](docs/SITE_ROUTE_MANIFEST.json). The public **Dashboard** (`index.html`) and protected administrator dashboard (`admin.html`) are different routes. Public course content is browseable without an account; saving personal progress requires sign-in.


| Path | Contents |
| --- | --- |
| `index.html`, root `*.html` | Public and authenticated website pages |
| `courses/` | Six teaching tracks and their routes |
| `assets/styles/` | Current shared `design-system.css` and necessary page-specific course/layout bundles; obsolete site-wide styling removed |
| `assets/scripts/` | Browser code, local exercises, progress, and navigation |
| `assets/icons/` | Brand and learning-track icons |
| `downloads/` | Learner downloads and practice datasets |
| `curriculum/` | Current curriculum source data and regeneration utilities |
| `api/`, `lib/`, `middleware.js` | Serverless tutor, session verification, and access controls |
| `database/migrations/` | Database setup and migrations (server-side only) |
| `docs/` | Current architecture, route map, setup guidance and historical cleanup reports (see `docs/README.md`) |
| `tests/` | Active automated checks; no retired release test scripts |

The page-specific CSS files are page-oriented compatibility bundles. They replace over 120 individually loaded, version-suffixed stylesheets and preserve their cascade order, including splits at embedded page styles. The current, authoritative shared visual theme and learning-experience styles are in `assets/styles/design-system.css`. The older global themes `site-refresh.css`, `experience.css`, and `layout-tuning.css` were deleted; the functional `course-page-improvements.css` remains scoped to interactive lessons. Standalone learning guides use `course-guide-pages.css`. Avoid restoring versioned CSS bundles.

## Learning and interface improvements

The 26 original website routes retain the shared `design-system.css` styling and `experience.js` enhancement script, and 12 additional linked course-resource pages have their own lightweight responsive stylesheet. The six course routes include 58 accessible concept tables (three examples per unit) and all 50 specialist modules now have guided practice prompts with learner-revealed verification and pitfall explanations. The original quizzes, project grading and progress logic remain unchanged. Motion honours reduced-motion preferences and the course tables support horizontal scrolling and keyboard focus on smaller viewports.


## Roadmaps, curriculum extensions and mastery checkpoints

Each of the six course pages now links prominently to two standalone learning resources:

- `courses/<course>-roadmap.html`: milestones and a linked lesson-by-lesson study plan.
- `courses/<course>-extension.html`: applied practice cases, worked examples and exercises.

The Course Mastery Checkpoint now has 10 explanatory multiple-choice questions per track (60 total) and adapts to a two-column layout on wider Windows screens. The Practice Arena hero's redundant software badges have been removed. See [`docs/COURSE_GUIDES_AND_CHECKPOINTS.md`](docs/COURSE_GUIDES_AND_CHECKPOINTS.md).

For Vercel use the project root as the configured root directory, with `vercel.json` `"outputDirectory": "."`. The build script verifies the static project; it does not emit a separate `public` folder.

## Course navigation corrections

The former in-page roadmap grids, lengthy milestone panels, and JavaScript-generated module-by-module navigation have been removed from each lesson page. Use the **Course roadmap** and **Curriculum extension** links near the course heading or in the shared course sidebar. The roadmap pages retain the original preparation notes, milestones, and lesson links.

Navigation/course icons are embedded SVG artwork, rather than network-dependent images. The SVG assets remain under `assets/icons/` for other uses. For version-free deployed CSS/JS filenames, `vercel.json` now asks browsers to revalidate assets after deployment, and the service worker cache key has been refreshed. If an older deployment is open, reload the site after the new Vercel deployment is READY.

Cards and mastery questions now size to their content rather than stretching to match the tallest adjacent card. The course quick-access panel and responsive grids are designed for desktop, tablet, and phone widths.

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

Start with the [current organization audit and route map](docs/SITE_ORGANIZATION_AUDIT.md), [documentation index](docs/README.md) and [current styling guide](docs/CURRENT_STYLE_SYSTEM.md). Prior cleanup/handoff notes are historical references.

## Course roadmap navigation and live deployment

Every course page displays **View full course roadmap** and **Open curriculum extension** immediately above the introduction, without requiring JavaScript. The resource files live in `courses/<course>-roadmap.html` and `courses/<course>-extension.html`.

Excel, SQL, Power BI and Python keep the week navigation in an expandable **Browse course lessons** sidebar section. The course navigation uses CSS lettermark icons that do not depend on remote image URLs. The capstone route links to the standalone roadmap instead of showing a long checklist.

Vercel deploys this site from the linked GitHub repository. **Replacing a ZIP in a local folder does not update production**: extract this archive at the GitHub repository root, commit and push all changed files to `main`, then confirm the new production deployment uses that new commit. Keep `index.html`, `vercel.json`, `service-worker.js`, `assets/` and `courses/` at the repository root. The Vercel output directory is `.`. Course HTML is served with `Cache-Control: no-store`.

To verify the new release, open `https://datalearning.vercel.app/courses/excel.html` and look for the **Course resources** links above the title. If it is missing after a READY deployment, confirm the deployment's commit SHA is the one containing this change.


### Styling maintenance (current)

The current light UI theme is defined by `assets/styles/design-system.css`; active feature/page styles remain in `assets/styles/`. Do not restore retired fonts, palette values, glass overlays or embedded page `<style>` blocks. The audit and responsive test limitations are documented in `docs/LEGACY_STYLE_CLEANUP_AUDIT.md`. Run `npm run build && npm run lint && npm test` before deployment.


## Vercel-ready responsive release (3 November 2026)

This release pins Node.js 24 in `.nvmrc` and `package.json` and uses an explicit Vercel build command (`npm run build`) to verify route, asset, middleware, and responsive contracts. The static site is served from the repository root (`outputDirectory: "."`); its APIs and middleware are still Vercel functions. See [`docs/VERCEL_RESPONSIVE_RELEASE_20261103.md`](docs/VERCEL_RESPONSIVE_RELEASE_20261103.md) for browser matrices and release/preview instructions.

Unzip the project contents directly at the **Git repository root**, not inside another `learning-path-site/` folder. Push a preview branch and test real authentication before releasing.
