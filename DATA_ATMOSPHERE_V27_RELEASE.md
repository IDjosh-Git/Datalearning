# Datalearningpath v27 — Data Atmosphere & Theme Refinement

## Scope
Built on v26. Includes a single late-loaded shared stylesheet at `assets/data-atmosphere-v27.css`, referenced from 22 HTML views. No application controller, lesson, database, or authentication logic was changed.

## Tokens
Light: `--bg-main: #f3f7fc`, `--bg-card: #fff`, `--accent-glow: rgba(44,111,193,.095)`, `--grid-line-color: rgba(48,91,144,.065)`.
Dark (`html[data-theme="dark"]`): `--bg-main: #0d1523`, `--bg-card: #1a2636`, `--accent-glow: rgba(83,162,239,.115)`, `--grid-line-color: rgba(146,196,255,.055)`.

## Design and accessibility
Background motifs are low-opacity CSS grids, dots and radial gradients applied to the page background. Component surfaces remain opaque and preserve the existing v25 text colors. Flexible-height card rules and <=640px single-column layouts extend v26. Hover effects run only on fine hover pointers. Motion is disabled when `prefers-reduced-motion: reduce` is active. No new external assets or JavaScript dependencies.

## Changed files
- New: `assets/data-atmosphere-v27.css`
- Updated: 22 HTML pages already referencing `layout-mobile-v26.css` to load the new layer afterward, using relative paths.
- Updated: `tests/sync-regression.mjs` to recognize asset cache version `20261023.27`.

## Validation performed
- `npm test` PASS
- `npm run test:responsive:v15` PASS
- `npm run test:course-mobile:v21` PASS

## Release limitations
These are source and regression checks, not pixel-level cross-browser verification or a complete WCAG contrast audit. Validate in staging at 320, 375, 768, 1024 and 1440px for both themes, check card content with long titles, modal focus and screen-reader semantics, and verify no horizontal page overflow. Earlier v24 live authentication, API, and offline synchronization blockers remain unresolved by this frontend release.
