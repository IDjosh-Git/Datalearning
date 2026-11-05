# DataLearning — Premium Learning Platform

DataLearning is a multi-page learning platform for data analysis, Excel, SQL, Power BI, Python, and AI-assisted analytics. It includes six guided courses, a Practice Arena with runnable SQL/Excel/Python exercises, a Learning Lab, AI Tutor, progress tracking, capstones and private dashboards.

**Current update:** Progress Reports filter only actual signed-in or engaged DataLearning users (see `PROGRESS_REPORT_ACTUAL_USERS_20261105.md`).

**Previous release:** 5 November 2026 — mobile responsiveness, shared theme and form styling, removal of unused source, and a shared Python runtime. See [the current release report](CLEANUP_AND_MOBILE_PERFORMANCE_20261105.md).

## Local verification and deployment

1. Install Node.js 24 (`.nvmrc`) and run `npm install`.
2. Run `npm run verify:deployment` (build/readiness, lint and all automated tests).
3. Deploy with the existing `vercel.json` (`framework: null`, `outputDirectory: "."`). Keep the ZIP's contents at the Git repository root, not inside another folder.
4. Configure Vercel environment variables and Supabase according to `.env.example` and `docs/SUPABASE_SETUP.txt`. **Never put secret or service-role keys into browser JavaScript.**
5. Review the database migrations under `database/migrations/` individually before applying them to the intended Supabase project.
6. Test signed-in flows, Python execution, mobile menus and live APIs on a preview deployment with a test account before promoting to production.

A ZIP generated here does **not** automatically update the live Vercel website. Push the modified project to its connected GitHub repository, confirm a new production commit/deployment and then reload the site.

## Project organisation

| Path | Purpose |
| --- | --- |
| `index.html` | Discover and learning guidance |
| `overview.html` | Learner activity overview, course popularity and study planning |
| `catalog.html`, `courses/` | Catalogue, six course players, roadmaps and extensions |
| `practice.html` | Practice Arena, challenge grading and one visible editor |
| `learning-lab.html`, `tutor.html`, `studio.html` | Guided learning, tutor and exercises |
| `account.html`, `admin.html`, `progress.html` | Role-protected learning and admin dashboards |
| `assets/scripts/` | Browser logic, curriculum and practice integrations |
| `assets/styles/` | Shared design system, final premium theme, functional page styling |
| `assets/python-worker.js` | Browser-only Pyodide execution; shared through `python-runtime-manager.js` |
| `database/migrations/` | Database setup and opt-in migrations |
| `downloads/` | Learner datasets and resources |
| `docs/` | Setup notes and architecture/route documentation |
| `tests/` | Automated source, security, learning and browser runtime-contract tests |

## Python mobile performance

The Python Lab and challenge checker share a single lazily created Web Worker per open Arena tab. Pyodide is downloaded/initialized once and reused for later runs, while a Stop action resets it when needed. Importing packages like pandas may take longer than plain Python. The first run still needs internet and device memory; large workloads and infinite loops are cancellable. This browser-based runtime is not a remote execution service.

## Design maintenance

`assets/styles/design-system.css` provides foundational tokens, while `assets/styles/premium-unified.css` is the shared final visual layer on all pages. Older page-specific styles that contain functional course, practice, and private navigation rules are retained to avoid breaking components. Avoid adding redundant versions of the same navigation, form or course dataset. Use `assets/scripts/catalog-data.js` as the course catalogue source and `assets/scripts/practice-data.js` / `python-challenges.js` as the challenge sources.

The [route manifest](docs/SITE_ROUTE_MANIFEST.json) lists the current routes. New page changes must remain responsive at 320, 390, 768 and 1440px, and pass `npm run verify:deployment`. Browser-level preview is still required for dynamic mobile overlays and external services.
