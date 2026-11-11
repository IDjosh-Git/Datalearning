> **Latest release (11 November 2026):** App-wide sign-in remains mandatory. Learners do not see administrator navigation and cannot access admin-only pages; the server verifies the `site_admins` role. Styles have been audited and route-scoped, unnecessary Practice Studio CSS loads removed, and repeated declarations consolidated. See `CURRENT_RELEASE.md` and `docs/STYLE_CLEANUP_AUDIT_20261111.json`. This ZIP has not been deployed.

# DataLearning — current application (11 November 2026)

DataLearning is a responsive analytics learning app with **nine 10-week learning courses**: Data Analysis Foundations, Excel, SQL, Power BI, Tableau, Power Query, Applied Statistics, Python for Data Analysis, and AI for Data Analysis. It also includes a separate four-level [Career Path](career-path.html) with 31 specialist modules.

**Learner workflow:** [Course Library](catalog.html) → choose a tool → follow Weeks 1–10, worked examples, downloadable synthetic datasets, practice worksheets and in-app YouTube links → dashboard/report or equivalent analytical project → Week 10 [Capstone](capstone.html) submission and instructor review. Real YouTube playback requires the publisher to permit embedding and network access.

## Main routes

- `index.html` / `catalog.html` / `career-path.html`: discover courses, pick a pathway and plan a career.
- `courses/<slug>.html`: nine guided course readers; `courses/python-*.html` and `courses/ai-*.html` are still-linked supplementary course guides.
- `practice.html` / `studio.html` / `learning-lab.html`: Excel/SQL/Python editor challenges, skill drills and learning review.
- `prompt-library.html` / `reference.html`: prompts and analytics reference content.
- `tutor.html`: offline knowledge tutor or optional authenticated live AI. Both include curated, public app help for courses, week selection, resources, practice, capstone requirements and more.
- `auth.html` / `account.html` / `capstone.html` / `certificate.html`: protected learner workflows.
- `admin.html`, `progress.html`, `reviewer.html`: protected administrative workflows; `connection-test.html` and `sync-test.html` are diagnostics.

## Deployment and tests

Use Node.js 24 (`.nvmrc`). Run `npm install` followed by `npm run verify:deployment`. Extract this ZIP and deploy the **contents** of the `datalearning/` folder to your repository root. `vercel.json`, `middleware.js`, `api/`, `lib/` and the existing Supabase setup must remain in place. Configure live Tutor provider credentials **only** in Vercel server environment variables (`OPENAI_API_KEY` or `GROQ_API_KEY`; optional `TUTOR_PROVIDER`). Without them, offline app help and reference tutoring remain available.

**Safety and release bounds:** This package does not change or migrate Supabase records, grade projects automatically, or retrain a model. Live AI receives relevant *verified public application guidance* through the server prompt; offline help uses the same curated source. Neither has access to private submissions or personal account data. Verify live authenticated flows and actual video playback on a deployed preview.

See [release notes](CURRENT_RELEASE.md), [the active file map](docs/PROJECT_FILE_MAP.md), and [the cleanup and Tutor audit](docs/LEAN_APP_CLEANUP_TUTOR_20261111.md).

### AI and Python courses: same native reader as all other courses

Python (`courses/python.html`) and AI (`courses/ai.html`) are now first-class Academy routes using `assets/scripts/academy-app.js` and the same lesson structure/styles as the other seven courses. The previous standalone AI/Python lesson page markup, legacy sidebar controllers and course-only CSS have been removed. `assets/scripts/specialist-course-data.js` provides current week metadata and preserves the original 80 quiz questions; the masterclass renderer supplies deeper explanations and the Week 10 capstone. The original progress keys, Supabase course slugs, media, Prompt Library and capstone routes remain intact. The roadmap and extension pages are optional supplemental resources, not alternate course screens.

### App-wide sign-in requirement (November 11, 2026)

All DataLearning routes, including `/`, the course catalog, Practice Arena, Tutor Studio, previews, course assets, lessons and downloads, are protected by Vercel middleware before any HTML is served. `/auth.html` and its minimal styles/scripts/icons plus the session exchange endpoint are the only public resources. Guests are redirected to sign-in, with the original in-app destination preserved in `?return=...`.

**Important:** Deploy this project to Vercel (or a host that enforces equivalent request-time middleware). Opening static files directly or hosting the ZIP on a static-only provider does **not** provide true access control. The same Supabase project manages learner and administrator identities. The server checks valid identity and enforces the existing administrator role restrictions. First-party HttpOnly cookies are required before entering; signing out clears them. Existing Row Level Security must remain enabled for learner data. Verify the redirect and protected asset tests on a deployed preview before releasing to learners.
