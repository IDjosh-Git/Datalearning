# Release 23 — Navigation and footer corrections

## Scope
- Audited the latest recorded production deployment metadata (commit `7a6a3d8`, READY) and corrected the local source; no production deployment was made.
- Removed the obsolete light-background rule for authenticated `.ac-topbar` in `assets/styles/unified-site-v5.css`.
- Added the authoritative navigation/footer visual contract to the existing final stylesheet files: `premium-color-system.css`, `public-footer-unified.css`, and `public-catalog-canonical.css`. This avoids introducing an orphan CSS module and maintains the repository's final-stylesheet expectations.
- Standardized dark header backgrounds, white header text, visible selected navigation states, and white dropdown surfaces with dark text.
- Standardized dark public footer surfaces with readable headings, links, descriptions, and explicit button contrast.
- Preserved the published `--dl-brand-primary` and `--dl-brand-secondary` CSS variables and existing navigation behavior.

## Validation
- `npm run verify:deployment` passed in the local source.
- This is not a complete browser-based visual audit; authenticated screenshots, mobile breakpoints, and user-configurable brand-colour contrast require further live verification.
- Not deployed to Vercel. Latest production deployment remains independent of this ZIP.
