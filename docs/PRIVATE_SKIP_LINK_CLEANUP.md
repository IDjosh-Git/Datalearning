# Private-page skip-link removal

Private-page navigation was simplified on 1 November 2026.

- Removed the authored **Skip to main content** anchor from all seven `data-private-workspace="true"` pages: `admin.html`, `progress.html`, `reviewer.html`, `account.html`, `certificate.html`, `connection-test.html` and `sync-test.html`.
- Updated `assets/scripts/accessibility.js` so it does **not** inject a second skip link into protected pages. On public pages it respects an existing authored skip link instead of creating a duplicate.
- Removed unused My Learning skip-link CSS and stale protected-workspace references.
- Kept the semantic `<main id="main-content">` landmark and all actual navigation/authentication logic unchanged. Public keyboard skip links remain available.
- Updated and added regression tests for this explicit private/public distinction.

Validation: `npm run build`, `npm run lint`, `npm test`.
