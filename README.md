# DataLearning · Seven-Path Premium Academy

**Current release: 10 November 2026.** The site now presents seven data learning paths with 70 weekly modules, practical examples, separate Questions to Try pages, a mobile-first interface and authenticated Supabase progress/quiz tracking. The current release notes and deployment guidance are in [CURRENT_RELEASE.md](CURRENT_RELEASE.md). Existing Tutor, floating AI, Practice Arena, Learning Coach, capstone, review and certification workflows remain included.

---

**New: Premium weekly curriculum browser.** The Courses page now lets learners preview the actual modules of all six courses, divided into three learning phases, with direct links to the existing lessons and dedicated question pages. Each course page also includes a compact expandable module navigator. See `docs/WEEKLY_MODULES_PREMIUM_20261109.md` for details.

# Latest release — Mastery Assessment, Discover 3D, Navigation & Contrast | 9 November 2026

Premium standalone mastery assessments now have refined question cards, A–D answer options, responsive forms, synced progress indicators, grading feedback and accessible focus treatment. The redundant “Data Analysis Learning Path” heading was removed from the Excel, SQL, Power BI and Python course sidebars; course-specific branding remains. Discover’s hero includes an illustrative, responsive, animated 3D interface panel with reduced-motion support. Desktop navigation uses more of the available width. Reviewed contrast on assessment, Discover, catalogue, and learning-support surfaces. No questions, answer keys, backend accounts or Supabase tables were changed.

See `docs/PREMIUM_MASTERY_DISCOVER_CONTRAST_20261109.md`. Actual deployed browser/device and authenticated workflows should be checked before production rollout.

> **Latest UI update (8 Nov 2026):** Premium responsive consistency for phone, tablet, laptop and desktop, including shared adaptive spacing, narrow-screen Tutor improvements, legible Catalogue and Overview headers, course controls and internal table scrolling. See [`docs/PREMIUM_RESPONSIVENESS_AUDIT_20261108.md`](docs/PREMIUM_RESPONSIVENESS_AUDIT_20261108.md). No database migration required.

## Premium brand wordmark and hover design (8 November 2026)

DataLearning now includes a refined accessible Blueprint/Melon live header wordmark and a reusable vector asset (`assets/icons/datalearning-wordmark.svg`). Existing premium logo, course icons, dedicated quiz screens and learning content remain unchanged. Course, catalogue, learning-tool and editorial cards have subtle pointer-hover motion; the brand badge adds a gentle highlight sweep. Touch users do not receive simulated hover effects, and `prefers-reduced-motion` is respected. Changes are maintained in `assets/styles/premium-unified.css`. No database migration is needed.

# Latest release — Guided Weekly Lessons + Dedicated Quiz Pages | 8 November 2026

All 50 technical course weeks and the eight Introduction lessons now receive clear, premium learning guides with practical business context, actionable steps, and separate weekly assessment links. The original question banks and mastery checks now open on responsive, purpose-built quiz pages instead of expanding inside the lesson. Existing lessons, practice activities, progress, and account sync are retained. See `docs/PREMIUM_WEEKLY_LESSON_STANDALONE_QUIZ_20261108.md`. No database migration required.

# Latest release — Unified Premium Assessments | 8 November 2026

All six course question experiences now share Blueprint-and-melon premium gradients, consistent question cards, accessible answer states, refined quiz actions and responsive layouts. Includes weekly knowledge checks, Introduction and course mastery checkpoints. See `docs/PREMIUM_ASSESSMENT_UI_20261108.md`. CSS-only visual update; learner data, quiz logic, accounts and backend remain unchanged.

# Latest release — Premium Surface Finish | 8 November 2026

See `docs/PREMIUM_SURFACE_FINISH_20261108.md`. Consistent premium cards, tonal buttons, quieter edges, intentional shadows, retained focus states and responsive course/Tutor surfaces. No backend or database changes.

## Latest UI update — 8 November 2026

See `docs/PREMIUM_RESPONSIVE_THEME_RELEASE_20261108.md` for the premium responsive theme, centered course video dialog, functioning Learning Coach footer and updated mobile Tutor.

> **Current build: Melon + Blueprint Light Edition (8 November 2026).** The app now uses the six colors in the supplied palette and replaces the old dark navy look with warm light gradients. See [`docs/MELON_BLUE_PALETTE_RELEASE_20261108.md`](docs/MELON_BLUE_PALETTE_RELEASE_20261108.md).

> **Current build:** Premium Navigation & Workspace Audit (8 November 2026). Read `docs/PREMIUM_NAVIGATION_AUDIT_20261108.md`.

**Latest update (8 November 2026):** In-app YouTube video viewer across all six courses, with responsive video dialog, close/fullscreen, and fallback. See [`docs/IN_APP_COURSE_VIDEO_20261108.md`](docs/IN_APP_COURSE_VIDEO_20261108.md).

> **8 November 2026 — Capstone, Profile & Mobile Navigation:** cleaned-up Capstone header, accurate signed-out/submission-loading states with retry, premium editable user profile, private photo uploads, visible account status in top navigation, and animated Discover header. See [`docs/CAPSTONE_PROFILE_MOBILE_20261108.md`](docs/CAPSTONE_PROFILE_MOBILE_20261108.md).

> **7 November 2026 — Premium Finish & Focused Tutor**: unified premium buttons and action links on public/private pages, improved wrapping and accessible color pairs, and a full-height mobile Tutor with scrollable conversation and compact Tools drawer. See [`docs/PREMIUM_FINISH_TUTOR_20261107.md`](docs/PREMIUM_FINISH_TUTOR_20261107.md).

# DataLearning — Clarity Edition (7 November 2026)

**Current build:** Premium, simplified public website and mobile navigation; one library-style lesson sidebar per course; compact, modern quiz cards; collapsible secondary information; no decorative capstone overlay. The previous Supabase reliability work is preserved.

[Release details and deployment instructions](docs/CLARITY_EDITION_20261107.md) · [Current release history](CURRENT_RELEASE.md)

**CSS cleanup:** Seven safe consolidation operations reduced active stylesheets from **48 to 41**. Active route styles and existing quiz, authentication, progress and capstone functionality remain intact.

# Previous release — Premium Unified Edition (7 November 2026)

**Current build:** Unified premium UI for all 39 routes, improved cloud-progress write ordering and verified admin diagnostics. The existing published database and access rules are unchanged.

For the new release and verified limitations, read [`docs/PREMIUM_UI_AND_SUPABASE_AUDIT_20261107.md`](docs/PREMIUM_UI_AND_SUPABASE_AUDIT_20261107.md). The folder map is in [`docs/PROJECT_FILE_MAP_20261107.md`](docs/PROJECT_FILE_MAP_20261107.md).

**Previous source release: 6 November 2026 — premium full-width responsive course cards, without decorative overlays.**

Six current course players (Introduction, Excel, SQL, Power BI, Python and AI) each use one premium **lesson sidebar** with responsive mobile drawer, now with a navy active-lesson rail and no duplicate in-content week selector. Courses are selected from the header; the obsolete all-courses rail and its old navigation controllers are absent. All twelve course roadmaps/extensions remain because they are linked learning resources rather than duplicate course players.

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

### Previous white lesson navigation (5 November 2026)

All six course pages now use the same **white-to-ivory gradient lesson sidebar**, matching gradient lesson buttons, resource cards, search field, progress meter, and accessible active states. Accent colour remains unique to each course. On desktop, the sidebar is inset beneath the sticky global header; on mobile, the lesson drawer opens below the header without covering navigation. The compact shared styles remain at the **end of `assets/styles/premium-unified.css`**, avoiding an extra blocking stylesheet. `assets/scripts/course-sidebar-header-offset.js` measures the actual header height at runtime. All lesson actions, quizzes, progress and course content are unchanged.


### Latest mobile course layout update — 2026-11-06
Teaching tables on the six primary course pages become labelled vertical cards on phones; seven-column data examples remain horizontally scrollable. Course sections also have reduced nested whitespace, and the previous mobile lazy-layout blank placeholders are disabled. The full explanation and verification results are in `CURRENT_RELEASE.md`.


### Tutor fullscreen mobile (8 November 2026)
The Tutor uses the entire viewport up to 900px wide. The site-wide navigation and decorative Tutor hero are hidden *only inside the mobile Tutor*, with an accessible Back to Discover link in the conversation toolbar. Chat history scrolls independently and the composer stays anchored inside the panel, above safe-area insets. The existing Tools drawer also contains Privacy & accuracy; no Tutor provider or course data flow changed.


## 8 November 2026 — Navigation contrast, mobile Tutor and course drawer

- Fixed pale text on light navigation cards and dropdown options; buttons now have explicit, readable foreground/background colors.
- Improved fullscreen mobile AI Tutor: compact controls, improved chat readability and composer; practice controls live in the Tools drawer.
- Added a 44px Close button to the mobile lesson sidebar for all six courses, keeping backdrop, Escape and focus restoration.
- No database changes required. See `docs/NAV_TUTOR_SIDEBAR_20261108.md`.

## 9 November 2026 — Premium Sign-in & Full-screen Course Sidebar

- Sign-in uses a clean light premium layout without an overlay background; on smaller screens the sign-in form comes first. Registration, password reset, and account handling are unchanged.
- All six course sidebars fill the complete screen on mobile and tablet, flush to the top and sides, with a visible close button and internally scrollable lesson list.
- No Supabase migration is needed.

### Latest UI refinements (9 November 2026)
The public site now includes an always-available floating Learning AI launcher. Guest visitors can ask conceptual questions and receive matched explanations from the bundled offline knowledge base. Live model responses use `/api/tutor` and continue to require both provider configuration and a verified signed-in learner session. There is no free anonymous provider proxy.
Mobile public navigation opens a full-height panel with a close button; the sign-in page no longer loads the search control. Colour-contrast updates include the Practice Arena feedback surfaces and every course resource page. See `docs/FLOATING_AI_MOBILE_NAV_CONTRAST_20261109.md`.

## 9 November 2026: Excel Formula Lab and floating AI readability

- The Excel Practice Arena now has an independent editable sample worksheet (visible grid A1:H20). Select a cell, enter a value or formula, choose **Save to cell**, and use **Calculate** for a formula preview. References in the offline engine can extend to A1:AZ1000, with a safety limit of 10,000 cells per range; off-grid blanks are empty until referenced/entered.
- Formula coverage has been expanded with additional statistical, mathematical, text, date, and dynamic-array functions, plus array arithmetic and chained cell formulas. Circular references produce `#CIRC!`; unsupported functions produce `#NAME?`.
- **Check challenge answer** remains a separate graded action using the unchanged challenge dataset (including hidden test cases). Sandbox cell edits do not change grading reference data.
- This is **not a complete Microsoft Excel engine**. Macros/VBA, linked workbooks, Power Query, full formatting syntax, spill geometry, financial cube functions and many specialist formulas are not supported; use desktop Excel for full compatibility.
- The floating coach displays AI Markdown as accessible headings, paragraphs, lists, inline code, and fenced examples rather than raw `**`, `###`, or backtick markers. Rendering uses DOM text nodes (not untrusted HTML), including offline explanations and authenticated live answers.
- Build and test with `npm run verify:deployment`.
