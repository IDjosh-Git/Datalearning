# Atelier UI v82 — Design system enhancement

This release is a progressive visual refresh of the existing Data Analysis Learning Path application, preserving all application logic, pages, Supabase integration, course content and navigation routes.

## New file
- `assets/atelier-ui-v82.css`: shared surface tokens, bento-inspired layouts, frosted navigation, ambient glows, card elevation, modern focus and active states, fluid headings, and reduced-motion safeguards.

## Coverage
- All 24 HTML documents now reference the stylesheet as the final stylesheet in their `<head>` so it overrides legacy visual rules without changing JavaScript.
- Both light and dark theme states use the existing `data-theme` attribute, so existing toggles remain compatible.
- Native CSS with no new dependencies. The pre-existing site does **not** use Tailwind; avoiding a framework migration retains the current runtime and deployment simplicity.

## Checks
- Semantic contrast suite passes (14 token pairs >= 7:1).
- The repository's aggregate test command includes a sync-regression fixture with hard-coded allowed cache-version numbers. It reports an unversioned asset on capstone.html. That page already contains references to legacy `?v=73` and `?v=71` assets, which are not on that allowlist. This check is unrelated to the new stylesheet.

## Release consideration
- Review individual pages on desktop and mobile in a browser after deploy, including signed-in and instructor views. The stylesheet is a progressive visual overlay, not a full front-end rewrite.
