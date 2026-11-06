# DataLearning — current premium learning platform

**Source release: 6 November 2026 — premium full-width responsive course cards, without decorative overlays.**

Six current course players (Introduction, Excel, SQL, Power BI, Python and AI) each use one premium **lesson sidebar** with responsive mobile drawer. Courses are selected from the header; the obsolete all-courses rail and its old navigation controllers are absent. All twelve course roadmaps/extensions remain because they are linked learning resources rather than duplicate course players.

## Current sources of truth

- [`CURRENT_RELEASE.md`](CURRENT_RELEASE.md): changes, what was removed, retained routes and test status.
- [`docs/SITE_ROUTE_MANIFEST.json`](docs/SITE_ROUTE_MANIFEST.json): current routes.
- [`assets/scripts/course-premium-sidebar.js`](assets/scripts/course-premium-sidebar.js): the **only** controller for the lesson drawer, disclosure, active links and focus.
- [`assets/scripts/course-reading-tables.js`](assets/scripts/course-reading-tables.js): the **only** course table-region wrapper; `experience.js` handles non-course reading enhancements.
- [`assets/scripts/course-experience.js`](assets/scripts/course-experience.js): course completion and mastery annotations only.
- [`assets/scripts/catalog-data.js`](assets/scripts/catalog-data.js): course catalog data.
- [`assets/styles/premium-unified.css`](assets/styles/premium-unified.css): final design overrides.

## Local build and deployment

1. Install Node.js 24 (`.nvmrc`). Run `npm install`.
2. Run `npm run verify:deployment` (build, lint, learning, responsive, security, tutor and practice checks).
3. Deploy the **contents** of this ZIP at the root of the existing `IDjosh-Git/Datalearning` repository; Vercel uses `vercel.json`.
4. Configure backend environment variables using `.env.example` and `docs/SUPABASE_SETUP.txt`. Do not place service-role credentials in the browser.
5. Check all course routes with a new visitor and a returning user who has old browser assets. Refresh existing tabs after publishing.

A local ZIP is **not** a production deployment. Existing Supabase data, login, practice, quizzes and progress features were not intentionally changed. Review and apply database migrations only if needed.

## Functional routes

- Public pages: homepage, catalog, tutorials, practice, tutor, references, prompt library, learning lab, capstones and certificates.
- Six course pages plus twelve resource guides: under `courses/`.
- Account, review and admin pages: kept with their existing access controls.
- Diagnostics: `connection-test.html` and `sync-test.html` are distinct admin utilities, not duplicate course pages.

### Latest course reading update (5 November 2026)

The six current course pages now use a compact, readable, full-width teaching layout with corrected introductory hero contrast, offscreen lesson rendering optimization, and unobtrusive progress-save indicators located near their course-progress widgets. Details and verification limits are recorded in `CURRENT_RELEASE.md`. Run `npm run verify:deployment` before publishing to Vercel.

### Premium white lesson navigation (5 November 2026)

All six course pages now use the same **white-to-ivory gradient lesson sidebar**, matching gradient lesson buttons, resource cards, search field, progress meter, and accessible active states. Accent colour remains unique to each course. On desktop, the sidebar is inset beneath the sticky global header; on mobile, the lesson drawer opens below the header without covering navigation. The compact shared styles remain at the **end of `assets/styles/premium-unified.css`**, avoiding an extra blocking stylesheet. `assets/scripts/course-sidebar-header-offset.js` measures the actual header height at runtime. All lesson actions, quizzes, progress and course content are unchanged.


### Latest mobile course layout update — 2026-11-06
Teaching tables on the six primary course pages become labelled vertical cards on phones; seven-column data examples remain horizontally scrollable. Course sections also have reduced nested whitespace, and the previous mobile lazy-layout blank placeholders are disabled. The full explanation and verification results are in `CURRENT_RELEASE.md`.
