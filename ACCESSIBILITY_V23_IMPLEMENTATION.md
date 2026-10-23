# Datalearningpath v23 — Implementation and verification guide

## Scope and architectural approach

This release is an **additive hardening pass**, not a claim of complete WCAG certification or that all runtime, database, and API problems have been exhaustively resolved. The supplied project is a static multi-page app with Supabase-backed identity/progress and Vercel API handlers. Existing page-level styles and interactions are intentionally preserved.

## Updated files

- `assets/accessibility-v23.css` **NEW**: common 48px control targets, focus-visible outlines, skip link presentation, flexible-layout overflow guards, responsive images, restrained card hover animation and reduced-motion media query.
- `assets/accessibility-v23.js` **NEW**: progressive skip-navigation enhancement, network status live region, safe default labels for otherwise unlabelled icon buttons and scoped service-worker registration.
- `service-worker-v23.js` **NEW**: public static assets only; network-first HTML; stale-while-revalidate static resources; no cross-origin, authenticated, API or private-page caching.
- **22 root and `courses/` HTML documents**: load the new shared CSS and JS without changing their existing course content.
- `api/auth/session.js`: catches verification service exceptions and returns a no-store 503 instead of an unhandled rejection.
- `assets/progress-cloud.js`: guard localStorage read failures; validate course unit indices before local writes; attempt sync when connectivity returns.
- `tests/accessibility-v23.mjs` **NEW**: static verification for coverage, baseline accessibility controls, protected cache routes and the above hardening points.

## Deployment

1. Backup the currently deployed site and database. Keep existing Supabase secrets, tables and RLS policies unchanged.
2. Copy the entire patched project (including root-level `service-worker-v23.js`) into the deployable repository. Do not copy only the CSS file.
3. Install using Node.js 20 or later: `npm install`.
4. Execute `npm test` and `node tests/accessibility-v23.mjs`. Execute supplementary tests: `npm run test:server-auth`, `npm run test:responsive:v15`, `npm run test:course-navigation:v22`.
5. Deploy the static app and the existing Vercel serverless functions together. Service worker registration is only attempted on HTTPS; local HTTP development does not activate it.
6. In browser developer tools, verify the installed worker's scope is the app root, navigate once online to selected lessons, then simulate Offline and check previously visited public lessons. Signed-in private pages and cloud calls are intentionally **not available from this worker offline**.
7. Verify sign-in, sign-out, role-gated admin pages, account switching, practice and progress across two browsers, including failed network requests and recovery after reconnecting.

## Acceptance testing still required

- Audit every page with automated axe-core and a manual keyboard traversal including modals, menus, dialogs, tabs, dialogs' focus return and course-card interactions. No keyboard trap, correct tab order, accessible names and form-error announcements.
- Verify normal and large text WCAG AA contrast thresholds **4.5:1 and 3:1**, respectively, across BOTH themes; the stylesheet alone cannot establish contrast compliance for hundreds of existing page rules.
- Test 320px, 360px, 390px, 768px, 1024px, 1440px, 1920px and 2560px widths, at 200% and 400% zoom, plus dynamic text settings. Check horizontal scroll on every course and dialog.
- Test VoiceOver/Safari and NVDA/Chrome or Firefox, mobile touch exploration, external keyboards and reduced-motion settings.
- Test the live Supabase migration and RLS policies against a **staging database**, with rollback plans, before running SQL against production. No migration scripts were executed by this offline patch.
- Validate request latency, session renewal, connectivity flapping, concurrent progress updates on two devices, failed cloud writes and private-data isolation with real accounts. Basic reconnect-triggered synchronization is best effort; durable distributed conflict resolution is not implemented.
- The service worker caches *only visited public resources*. Complete course predownloads, storage eviction handling, background sync and offline writes need a separate designed and tested implementation. Never cache user credentials or protected API data.

## Deployment caveats

The CSS sets a minimum block size for common interactive controls but **not every inline link receives a 48×48 CSS box**. A full WCAG pointer-target audit requires page-by-page review and contextual spacing. Some existing pages' custom CSS could override shared rules; browser inspection is required. Avoid blanket global ARIA replacements because native semantics are generally preferable.
