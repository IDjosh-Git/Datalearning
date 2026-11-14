# DataLearning — current-file cleanup and app-aware Tutor audit

**Release:** 11 November 2026 · **Scope:** complete latest DataLearning package, based on the AI Course + Prompt Library release.

## What was removed

Eighteen provably unused files were deleted (365,767 raw bytes):

- Eleven dated, superseded UI/release-note documents under `docs/`.
- Six unused source-generation files under `curriculum/` (old Python builders, exported Markdown and intermediate JSON). Their current output already lives in the active course scripts/data; the originals were not loaded by the website or referenced by the maintained test suite.
- `assets/icons/data-network.svg`, an icon with no app or test references.

The stale `test:core`, `test:responsive`, `test:learning` and `test:legacy` npm scripts were also removed because they referenced deleted test files and could not run. The two previously omitted but current tests for the Career Path and AI Prompt Library have been added to `test:academy`. All retained `tests/*.mjs` files are now included in a maintained npm command.

`README.md`, `CURRENT_RELEASE.md`, `docs/README.md`, `docs/PROJECT_FILE_MAP.md` and the route manifest have been refreshed to reflect the actual nine-course release. The service-worker cache identifier was increased to remove stale public asset caches on activation.

## What stays — and why

- **All nine ten-week course players:** the original 90 weekly course IDs and existing quizzes/progress semantics remain stable.
- **Python/AI roadmap and extension pages:** they are still directly linked in the learning experience. Removing them without migrating the content and links would break navigation. They are current supplemental resources, not unused copies.
- **Every CSS and browser JS file:** the static dependency audit confirms that each is referenced by at least one current HTML page; they are not safe to delete based on filenames or age.
- **Course data, downloads and dashboard images:** consumed by page controllers, downloadable learner material or active curriculum regression tests.
- **Database migration history:** not loaded by browser pages, but retained for reproducible installation/recovery. The current release neither executes a migration nor changes learner data.
- **Maintained test suite:** essential to validate all Academy, authentication, Arena and Tutor behaviour before deployment.

This is **reachability-led pruning**. A referenced file may contain older internal CSS rules, but deleting that file wholesale would break an active page. No unproven cascade/dependency deletions were made.

## The app-aware AI Tutor

The new curated source `assets/data/tutor-app-guide.json` contains **26 verified guidance entries**, including all **nine ten-week course plans (90 weeks)** and 17 user-workflow articles. It covers:

- getting started and course navigation;
- precise week goals, core topics, worked examples, practise tasks, validation checks and common mistakes;
- downloads, in-app YouTube restrictions and dashboard/presentation examples;
- the Excel/SQL/Python Practice Arena and its limitations;
- the Prompt Library and separate four-level Career Path;
- sign-in, progress sync, quizzes, certificate eligibility and Week 10 capstone review;
- the difference between offline tutor knowledge and authenticated live AI;
- privacy and synthetic-data guidance.

**Offline Tutor:** `assets/scripts/tutor-app-guide.js` reads the public guide and finds matching app questions before using the older topic-explanation library. It neither sends these questions to an AI provider nor reads private account records. If the public guide cannot be loaded, ordinary offline subject tutoring still works.

**Live AI:** `lib/tutor-app-knowledge.js` selects relevant, whitelisted guidance. `api/tutor.js` adds this to the authenticated provider's server-side instructions. Existing provider keys stay in server environment variables. No model weights are trained or fine-tuned, and no learner records, submissions or secrets are added to the guide.

**Safety:** the Tutor cannot approve capstones, inspect a learner's grades or bypass login/RLS. It should not invent features or claim access to real-time user state.

## Verification

- `npm run verify:deployment`: **passed** after cleanup and Tutor grounding.
- `tests/runtime-asset-audit.mjs`: all current HTML-referenced CSS, JS and local file links exist; confirms that no standalone CSS/JS is orphaned.
- `tests/tutor-app-guide-cleanup.mjs`: checks 26 guide entries, 90 weeks, canonical local routes, server context, offline matching and removed artifacts.
- Isolated Chromium (390px) interaction test: app help answered a capstone question and an Excel Week 8 question with no page script errors.
- **Not verified:** full browser navigation was blocked by local administrator policy; actual live OpenAI/Groq responses, external video embedding, real Supabase login and project uploads require a deployed preview with appropriate test accounts.

## Deployment and maintenance

Extract the ZIP and deploy the contents of `datalearning/` at the repository root. Keep `api/`, `lib/`, `middleware.js`, `vercel.json`, `assets/`, `courses/` and `database/` in their relative locations. If course titles or app routes are changed later, update the guide and rerun Tutor and asset tests. Keep server API keys out of the public guide and browser bundles.
