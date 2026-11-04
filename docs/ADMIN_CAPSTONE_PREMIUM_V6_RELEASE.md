# Data Learning — Premium Administrator & Capstone Experience V6

Release date: November 3, 2026  
Baseline: V5 Public Motion & Footer package  
Status: **Source verified; not deployed**

## What changed

### Administrator dashboard (`admin.html`)
- Redesigned the admin overview with a dark indigo/violet command hero, clear operational actions, polished typography and responsive KPI cards.
- Improved learner-directory controls and tables without changing their filters, pagination, CSV export, or record drawer.
- Added three functional management shortcuts to existing routes: Learners, Progress Reports, and Capstone Assessment Desk.
- Added a dedicated Capstone Operations panel. Its *pending submission* count is populated from existing Supabase data, using the same calculation as the KPI; no fabricated metrics or new backend operations.
- Applied improved surfaces, course analytics progress bars, button states, spacing and keyboard focus styling.

### Shared private navigation (`assets/scripts/private-navigation.js`)
- New role-aware admin navigation: Overview, Learner Directory, Course Analytics, Capstone Hub, Progress Reports, Assessment Desk, plus learner links and admin-only expandable diagnostics.
- Replaced inconsistent text symbols with inline vector icons and a clearer Data Learning identity.
- Added a context-specific assessment/dashboard shortcut in the top bar, displayed only to authenticated administrators.
- Preserved the existing role-gated menus, single Sign out control, Escape/backdrop-close behaviour, focus containment, and fixed mobile logout placement.

### Assessment Desk (`reviewer.html`) and progress reports (`progress.html`)
- Refreshed the hero sections, cards, filters, grading panels, evidence preview container and status presentation.
- Retained submission filters, evidence previews, five-part grading rubric, feedback fields, publish outcome logic and certificate issuance behaviour.
- Retained individual progress records, course/status filtering, lesson drilldowns and refresh functions.

### Learner capstone (`capstone.html`) and guide (`capstone-guide.html`)
- Added a responsive project hero with a clear four-stage process and a decorative award motif on desktop.
- Refined submission inputs, course selectors, upload evidence area, progress indicator, checklist, rubric and certificate areas.
- Restyled the capstone guide as a readable collection of structured lesson cards with a stronger introduction.
- Retained all existing input IDs, submit workflow, scoring thresholds, certificate controls, and public navigation/footer.

### Visual architecture
- Administrator styles live inside the existing protected `admin-workspace.css`, which imports the reusable protected navigation styles.
- The new `capstone-premium.css` is the final public visual layer on just the two capstone routes.
- All effects are CSS-based and honour `prefers-reduced-motion`. No new runtime UI library was added.
- Bumped public service-worker cache key from v24 to v25 so returning clients can refresh changed styling.

## Quality checks

- `npm run verify:deployment`: PASS (full build, lint, core, responsive, course-content, security, arena and tutor checks).
- Static site integrity: all 38 routes preserved; 46 referenced CSS files; no broken local links reported by the verification suite.
- Browser-rendered layout QA: **55 route/viewport combinations**, covering 5 redesigned routes × 11 viewport sizes (320, 360, 390, 430, 568 landscape, 768, 844 landscape, 1024, 1280, 1440, 1920 px). **0 document-level horizontal overflows or harness errors.**
- Mobile drawer QA: **24 open/close checks**, with visible Sign out, focus within drawer and Escape closing successfully in each state.
- Tests used locally injected HTML and CSS with a *simulated administrator role and illustrative sample KPI values*, because private pages cannot be loaded without a real authenticated session. They check CSS layout and client navigation, **not live Supabase data or permission checks on deployed Vercel**.
- Local environment ran the verification suite on Node 22; the repository's Vercel runtime is configured to Node 24. Vercel cloud build on this ZIP has **not** yet been run.

## Deployment

1. Extract the ZIP so `package.json`, `vercel.json`, `admin.html`, `assets/`, `api/`, `middleware.js` are at the repository root.
2. Create a preview branch / preview deployment in the existing Vercel project.
3. Confirm authenticated administrator and non-admin access, real learner data, submissions, grading publication, certificate generation, and tablet/phone navigation on the preview URL.
4. Deploy to production only after those checks pass.

## Scope boundary

This is an interface redesign around **the admin capabilities already supported by the project**. It does not add backend features like learner deletion, role promotion, course editing, bulk email, or new certificates management. Those would require explicit authorization requirements and database/API design. Existing authorization and assessment logic have not been loosened.
