# Website organization audit — 1 November 2026

## Executive summary

**Scope:** the current `Data Analysis Learning Path` source package, not a live production deployment. Inventory: **38 HTML pages**, **6 interactive course tracks**, **12 course roadmap/extension pages**, **43 CSS files**, **80 browser scripts**, and serverless API/middleware components. All 38 routes are covered by the machine-readable `SITE_ROUTE_MANIFEST.json`.

The core route hierarchy is workable, but it was previously difficult to identify which page belongs to which functional area. The main improvements in this release are clearer documentation, consistent main-content landmarks/skip links, and an automated route-organization check. Existing URLs, files, scripts, database schemas and authorization were **not moved or relaxed**.

## Information architecture

| Area | Public entry points and responsibilities | Access |
| --- | --- | --- |
| Discover | `index.html` (public learner dashboard), `catalog.html` (six courses), `preview.html` (sample) | Public |
| Learn | `courses/{introduction,excel,sql,powerbi,python,ai}.html` | Public browsing; account required to save personal progress |
| Course support | `courses/<track>-roadmap.html` and `courses/<track>-extension.html` (12 total) | Public |
| Find answers | `reference.html` (Formulas/Reference Library), `prompt-library.html`, `tutor.html`, `learning-lab.html` | Public browsing; individual connected-account services may require sign-in |
| Apply | `practice.html` (Practice Arena), `studio.html` (Practice Studio), `capstone.html`, `capstone-guide.html` | Public general content; personal record submission is gated |
| Identity and credentials | `auth.html`, `verify.html`, `account.html`, `certificate.html` | Sign-in/verification public; account and personal certificate private |
| Staff tools | `admin.html`, `progress.html`, `reviewer.html` | Authorized administrators only |
| Diagnostics | `connection-test.html`, `sync-test.html` | Protected diagnostics; intentionally omitted from public navigation |

**Important distinction:** the top-level **Dashboard** link leads to the public learner home (`index.html`); the staff dashboard is `admin.html` and must remain protected. The shared eight-link public header is a discovery menu, not a replacement for course-level lesson navigation. Course outlines, resource links and teaching flows are intentionally contextual to each track.

## Source organization and ownership

| Path | Owner / what to edit |
| --- | --- |
| Root `*.html` | Public, identity, credential, diagnostics and staff entry routes; keep paths stable |
| `courses/*.html` | Track players, roadmap and extension content; preserve lesson fragment IDs and completion identifiers |
| `assets/styles/design-system.css` | **Authoritative shared visual system** (navy, indigo, dark slate, Inter, colour/spacing/focus tokens) |
| `assets/styles/*.css` (other) | Page- and feature-specific layout. Do not introduce additional global overrides |
| `assets/scripts/public-navigation.js` | Responsive global navigation controller |
| `assets/scripts/*` (other) | Course, tutor, Practice Arena, progress and UI modules; verify dependencies before deleting |
| `assets/icons/` | Shared SVG assets |
| `downloads/` | Public example data, notebooks/SQL and learner-facing instructions; do not put real personal data here |
| `curriculum/` | Curriculum sources and generators; do not regenerate production lessons casually |
| `api/`, `lib/`, `middleware.js` | Authenticated API/session logic and server access controls |
| `database/migrations/` | Historical schema migration files; not public routes, never auto-run for a style change |
| `docs/` | Current setup/architecture guidance plus labelled historical audit records |
| `tests/` | Navigation, auth, course, responsiveness and other source-level regressions |

## Verified findings and changes

1. **Route coverage:** all 38 HTML pages are mapped to one of six access/functional categories. No pages were renamed, so existing direct links and bookmarks retain their destination.
2. **Internal links:** the existing navigation audit resolves local HTML link targets and checks dynamic course checkpoint anchors. A new site-organization check covers the complete route inventory and common page landmarks.
3. **Navigation:** 28 pages use the same eight-item public header; remaining compact, authentication, certificate or protected diagnostic pages use contextual layouts. Contextual course navigation is retained and should not be mistaken for an extra global menu.
4. **Landmarks:** the learner account and two diagnostic pages had no `<main>` landmark. They now have a consistent landmark. Every route now offers a keyboard-accessible **Skip to main content** link, with one main-content target.
5. **Public-access copy:** the catalogue previously implied that lessons were only previews before sign-in. It now clearly distinguishes public lesson browsing from account-only progress saving.
6. **Design consistency:** shared colours, buttons, headers and focus treatments remain centralized in `design-system.css`; the added skip-link style lives there instead of in a new override file.
7. **Documentation drift:** older handoff notes describe a deleted `experience.css` file. They are explicitly marked historical; `CURRENT_STYLE_SYSTEM.md`, this audit, and `SITE_ROUTE_MANIFEST.json` are the current references.

## Outstanding risks and prioritized next steps

**P1 — Staging browser QA:** Verify the actual rendered header, mobile navigation drawer, focus/skip-link behaviour, lesson player and library at 390px, 768px and 1440px, plus 200% zoom. Static checks cannot prove that every navigation overlay or CSS cascade behaves correctly.

**P1 — Authentication and privacy:** Test signed-out direct/refresh access for public pages, learner-only progress and certificate routes, staff-only admin/review/report routes, and actual Supabase row-level security with authorized test accounts. Source tests do not substitute for production authentication verification.

**P2 — JavaScript loading:** Six course players load roughly 25–30 scripts each and the Practice Arena loads many feature modules. Profile actual network waterfall and runtime execution before consolidating or deferring scripts; these modules include interdependent progress, quizzes and offline tooling.

**P2 — CSS ownership:** 43 stylesheets remain because course-specific and feature-specific rules are still active. Consolidate only after real browser screenshots and dependency tracing, not merely by matching selector names.

**P2 — Docs maintenance:** Keep `README.md`, `CURRENT_STYLE_SYSTEM.md`, route manifest and this document authoritative; treat earlier named audits and handoff snapshots as history rather than implementation instructions.

**P3 — Discoverability:** Validate learner journeys from home → catalogue → course → roadmap/extension → practice → progress; verify support and certificate links with real users. The administrative diagnostics remain intentionally unlinked from public pages.

## Validation and limitations

Run `npm run verify:deployment` and `node tests/site-organization.mjs`. These are **source-level checks**: they verify syntax, local destinations, known structural hooks and mocks, but not deployed Supabase permissions, third-party tutor availability, live video playback or pixel-accurate device rendering. No destructive database operation or user-progress reset was performed.
