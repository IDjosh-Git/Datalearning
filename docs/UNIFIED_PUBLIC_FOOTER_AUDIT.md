# Unified Public Footer Audit — 1 November 2026

## Scope

The learner dashboard footer is now the reference for a single dark bottom section across **33 learner-facing HTML routes**: the dashboard, catalogue, public libraries, AI Tutor, Practice Arena, Capstone and Studio, sign-in, certificate/preview utilities, all six course pages, and all 12 roadmap/extension pages. This leaves **five protected or diagnostic routes** unchanged (`admin.html`, `progress.html`, `reviewer.html`, `connection-test.html`, and `sync-test.html`). The admin/report routes retain their own authorization and shells.

## Source consolidation

- Removed 22 nonuniform footer blocks (`footer`, `guide-footer`, `dlp97-catalog-footer`, `auth-site-foot`, `sample-footer`) and added footer coverage to the remaining 11 public pages that had none.
- All public routes load the single `assets/scripts/public-footer.js` component **once**. Its route URLs derive from the script's own URL, so root and `courses/` pages work at the site root **or under a deployment subdirectory**.
- Shared colour, spacing, desktop/mobile layout, keyboard focus, and footer link styles are maintained only in `assets/styles/design-system.css` under `.dalp-public-footer` selectors. Removed **442 legacy public-footer CSS rules** from 30 other stylesheets.
- Dark navy background `#101D33`; primary footer text `#EEF3FF`, subdued text `#CBD7EE`; support control has a solid black background and white text.
- Ensured the footer uses the whole available width, has sensible desktop columns and single-column mobile stacking, and doesn't leave a light strip below it on pages with legacy bottom padding. Course pages with fixed bottom bars get mobile footer clearance.
- Moved unique public-page notices (preview privacy warning, catalogue progress sign-in note, introduction fictional-data warning, auth motivational text) immediately above the shared footer so they weren't discarded.
- Advanced the public service-worker cache identifier so previously cached page styling is replaced after deployment.

## Verification

- `npm run build`, `npm run lint`, `npm test`: passed.
- `tests/public-footer-unification.mjs`: verifies 33 public routes load the component once, no duplicate footer markup remains, protected routes are excluded, links resolve correctly for a site served in a subdirectory, and tested footer text/background colour pairs exceed WCAG AA 4.5:1.
- Chromium's attempt to open local desktop and phone pages returned `ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore, **real screenshots, dimensions and interaction checks are not verified**; check a deployed preview for final visual acceptance.

## Ongoing maintenance

Update public-footer links or wording in `assets/scripts/public-footer.js`. Update its visual treatment in `assets/styles/design-system.css`. Don't add page-level `<footer>` tags, CSS overrides or alternate public footer scripts. Shared legacy `.footer` rules retained in the design system are for compatibility with separately styled protected pages; they no longer style the learner/public footer.
