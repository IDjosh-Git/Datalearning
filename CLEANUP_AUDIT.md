# Cleanup audit — 14 November 2026

## Removed from the deployable site
- Retired standalone pages: `catalog.html`, `overview.html`, `progress.html` (existing redirects retained).
- Obsolete admin-progress script and stylesheet: `assets/scripts/progress-admin.js`, `assets/styles/progress.css`.
- Tests, database scripts, documentation, server-only libraries, and development tooling are not copied to the static `dist` directory.

## Corrections
- Public footer My progress now points directly to `account.html#course-progress-heading` rather than a retired page.
- Header `/overview` alias now resolves to the current dashboard.
- Dashboard labels Python and AI as standard courses, removing the misleading legacy separator and styling classes.

## Retained intentionally
- The retired HTML source files remain in the developer archive because existing regression tests inspect their compatibility behavior. They are NOT deployed.
- `preview.html`, `questions.html`, course content, downloads and shared assets are retained because their runtime or curriculum roles have not been proven redundant.
- Server-side code, middleware and configuration are retained in the source archive; the static deployment ZIP is not a replacement for the complete Vercel source deployment.

## Verification
- `npm test`: passed
- `npm run lint`: passed
- `node tests/clean-deployment.mjs`: passed; 2,710 published local resource references resolve.
- No authenticated live browser session or end-to-end Vercel deployment was performed.
