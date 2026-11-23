# Release 20 — layout and stylesheet standardisation

- Added `assets/styles/release-20-layout-system.css` as a shared layout and semantic styling layer, loaded by 31 application HTML pages and the generated public course guide shell.
- Standardised box sizing, page gutters, responsive container widths, text wrapping, responsive grids, card borders, focus indicators, form dimensions, footer colours, and tab overflow.
- Preserved the existing `premium-color-system.css` as the final stylesheet on the 27 active pages that enforce that contract; retained the public course-guide stylesheet order.
- Retained dynamic Admin Appearance branding and existing route-specific styles rather than deleting legacy modules or flattening specialist workspaces.
- Full `npm run verify:deployment` completed successfully.
- Not deployed. Browser-based visual QA, authenticated UI walkthroughs, and a comprehensive WCAG audit remain outstanding.
