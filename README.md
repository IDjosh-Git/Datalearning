# DataLearning — Seven-Path Academy

**Maintained release: 10 November 2026 — four-level comprehensive career curriculum and premium learning experience.**

DataLearning is a responsive learning app for practical data analysis. It contains seven current learning paths: **Data Analysis, Excel, SQL, Power BI, Tableau, Power Query, and Introductory Statistics**. The 70 weekly modules include concept explanations, worked examples, hands-on exercises and separate **Questions to Try** pages. Learners can track course progress and attempt mastery assessments.

The app also retains **AI Tutor, floating AI, Learning Coach, Learning Lab, Study Tools, Practice Arena, Practice Studio, capstone submission/review, verified certificates, account management and protected administration**. Older Python and AI learning paths remain available for returning learners.


## New: complete Beginner → Expert learning pathway (10 November 2026)

The **Courses** page now includes a searchable, four-stage master curriculum with **31 newly authored specialist modules** across Analytics, Data Engineering, Business Intelligence, Data Science and AI. Each includes prerequisites, four key topics, a substantial explanation, a worked business case, four-step practical workflow, a phone-friendly micro-project, its answer and a quality warning. The levels are Beginner (7 modules), Intermediate (8), Advanced (8) and Expert (8). The original seven active courses (70 weekly lessons) now link learners to relevant next-stage topics. See [full curriculum blueprint](docs/MASTER_FOUR_LEVEL_CURRICULUM_20261110.md).

**Scope:** New cloud, streaming and MLOps topics are illustrated through synthetic mini-cases and design exercises; the app does not execute Spark, Kafka, Snowflake or cloud accounts through these lessons. Existing 70 weekly course IDs, quiz results, sign-in, certificate rules and Supabase progress logic are unchanged. Run `node tests/master-pathway-curriculum.mjs` to verify the added material.

## Where to start

| Section | Path |
| --- | --- |
| Discover | `index.html` |
| Courses and weekly modules | `catalog.html` |
| Individual course lessons | `courses/<slug>.html` |
| Separate weekly questions | `quiz.html` (linked from each week) |
| Study Tools | `study-tools.html` |
| Practice Arena and compact Excel Lab | `practice.html` |
| Learning Coach (seven-session planner) | `learning-coach.html` |
| Learning Lab (independent lesson review) | `learning-lab.html` |
| Practice Studio | `studio.html` |
| Reference Library | `reference.html` |
| AI Tutor | `tutor.html` |
| Capstones and certificates | `capstone.html`, `certificate.html` |
| Learner account | `auth.html`, `account.html`, `profile.html` |

Current course slugs: `introduction`, `excel`, `sql`, `powerbi`, `tableau`, `powerquery`, `statistics`. The `python` and `ai` routes and their still-linked guides are kept for compatibility.

## Local development and verification

1. Use **Node.js 24** (see `.nvmrc`).
2. Run `npm install` in the project root.
3. Run `npm run verify:deployment` before publishing. This executes curriculum, source/syntax, static asset reachability, authentication/security, Practice Arena and Tutor regression checks.
4. Serve the project from a local HTTP server or Vercel preview to check interactions. Do not open pages directly as `file://` when testing authentication.

The current test commands are `npm run test:academy`, `npm run test:security`, `npm run test:arena` (including a static WCAG colour-pair check), and `npm run test:tutor`. The obsolete pre-rebuild `test:legacy` contract was removed; it assumed old pages and styles that no longer match the app.

## Supabase integration

`assets/scripts/supabase-config.js` contains the public Supabase project URL and **publishable** key; these can be exposed to browsers. The app uses Supabase Auth, user-scoped course progress, quiz and mastery results, and existing RLS rules. Protected operations and instructor permissions must continue to be enforced by Supabase RLS and the server middleware. **Do not place service-role or other secret keys in client scripts.**

The connected DataLearning database was updated previously for the seven paths. **This cleanup does not change the database or require another migration.** See `docs/SUPABASE_SETUP.txt` and `database/` before running any historical migrations in another environment.

The live AI Tutor uses a server-side provider key. Configure `TUTOR_PROVIDER` and either `GROQ_API_KEY` or `OPENAI_API_KEY` in Vercel environment settings (see `.env.example`). Without provider credentials, the bundled offline learning guidance remains available.

## Tutor and consistent public navigation

The AI Tutor now fills the available viewport, keeps the chat composer visible, and scrolls messages independently. On phones, Tools opens a full-screen settings drawer with a close button. Quick Search is a compact header icon on every public page. The floating **Study Pulse** habit tracker sits at the bottom-left, separate from the full **Learning Coach** study-planning page. No AI API, Supabase, or account migration is needed.

## Deployment on Vercel

1. Extract the ZIP and copy the **contents** of the `datalearning/` folder to your GitHub repository root.
2. Keep `api/`, `lib/`, `middleware.js`, `vercel.json`, `assets/`, `courses/`, and other runtime files in their current relative locations.
3. Connect or redeploy the repository in Vercel. The `vercel.json` file includes resource headers, rewrites, and backward-compatible redirects from eight retired Intro/Excel/SQL/Power BI roadmap and extension URLs to their current course pages.
4. Verify the seven course routes, a weekly quiz, sign-in, cloud progress, AI Tutor, Practice Arena and protected pages with appropriately authorized test accounts.

**A local automated pass is not proof of the deployed app or of real Supabase sign-in.** Confirm those interactions in a Vercel preview before publishing.

## Cleaned project structure

| Directory | Purpose |
| --- | --- |
| `assets/styles/` | Stylesheets referenced by current pages; obsolete standalone CSS removed |
| `assets/scripts/` | Current browser controllers; unused historical scripts removed |
| `assets/data/`, `curriculum/` | Seven-path teaching content and source material |
| `assets/icons/`, `downloads/` | Referenced images and learner resources |
| `courses/` | Seven current course players plus two retained legacy players and their linked guides |
| `api/`, `lib/`, `middleware.js` | Secure server-side endpoints and access handling |
| `database/` | Database setup and historical migration scripts; do not rerun blindly |
| `tests/` | Maintained automated tests, including a broken-link and orphan-asset check |
| `docs/` | Current documentation, route manifest, cleanup report |

See [current release](CURRENT_RELEASE.md), [file cleanup report](docs/CLEANUP_AUDIT_20261110.md), and [route manifest](docs/SITE_ROUTE_MANIFEST.json). The reusable brand wordmark SVG remains in `assets/icons/datalearning-wordmark.svg` as a source design asset.

## Public navigation and Study Pulse

All 31 public pages—including seven current course paths, returning-learner legacy paths, and Study Tools—use a single static public header, compact Search action, full-screen mobile navigation with a close button, and consistent branded links. Protected pages retain their role-aware navigation. The small bottom-left **Study Pulse** shortcut opens the original habit tracking and spaced-repetition widget (daily goals, activity logging, local notes, bookmarks, reviews and export/import); it is intentionally distinct from the seven-session **Learning Coach** page. This redesign does not modify existing progress storage or Supabase schemas.

### Practice Arena UI — November 2026

Practice Arena now uses a compact horizontal SQL / Excel / Python chooser and a modern responsive workspace presentation. All existing challenge engines, datasets, grading, local storage, and expandable Excel rows are retained. See `docs/PRACTICE_ARENA_PREMIUM_20261110.md`.

## Practice Studio & Learning Lab refinement (10 November 2026)

Practice Studio course controls are compact and accessible. The skills sidebar has no independent scroll container; the page itself scrolls. On mobile, subject buttons form a slim horizontal row and the skills list is opened with Browse Skills. Learning Lab now paginates its full searchable library in groups of **10** with Previous/Next controls while preserving the same device-saved review states. The release details are in `docs/STUDIO_LAB_PAGINATION_20261110.md`. No database migration is required.

## Premium private workspace update (10 November 2026)

The eight protected pages now reuse the public academy's branded page loader and search panel, with a single header profile control. The sidebar is streamlined into a four-link **Academy** group available to every signed-in user and a verified-admin-only **Administration** group with collapsible reporting and diagnostic links. See [current release](CURRENT_RELEASE.md) and [implementation/permission checklist](docs/PRIVATE_WORKSPACE_REFINEMENT_20261110.md). Existing database schemas and records were not changed; live authenticated Supabase checks must be completed in a deployment preview.


## Source cleanup and Practice Arena contrast (10 November 2026)

A further conservative reachability cleanup removed 3,556 unused CSS rules (409,434 uncompressed bytes) and eight superseded release notes. Shared and dynamically generated interfaces, the secure database integration and all current learning controllers remain intact.

Practice Arena's Data Results, Schema Inspector, Console and Hint Assistant tabs now use clear selected/inactive/hover/focus states and a legible dark/light card palette. The active challenge has a **Selected** pill, while the existing progress status remains visible. See [cleanup and contrast audit](docs/CLEANUP_AUDIT_20261110.md). A live browser and authenticated database preview are still required before deployment.


## End-to-end learning journeys (November 2026)
Core course weekly lessons include an additional tool-to-report stage, from interface orientation through report presentation. The four-level career curriculum is on `career-path.html` and no longer stacked beneath the course catalogue. Existing weekly IDs and quizzes are preserved.
