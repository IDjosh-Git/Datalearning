# Release 13 — Premium navigation design

This release completes the visual redesign of the grouped navigation originally proposed before Release 12.

- Premium two-column desktop dropdowns with prominent icon-led headings, feature icons, descriptions, consistent spacing, rounded cards and subtle shadows.
- All five primary navigation labels remain clickable: My Learning → account.html; Explore Courses → catalog.html; Practice Hub → practice-hub.html; AI Tutor → tutor.html; Study Tools → study-tools.html.
- Chevron buttons independently open and close their dropdowns. Outside click and Escape dismiss menus; Arrow Down opens and focuses the first link, and Arrow Up/Down move through links.
- Mobile drawer groups now have premium icon-led accordion headings and icon-led links, preserving all existing destinations.
- Corrected the mobile Practice Hub overview shortcut to point to practice-hub.html, rather than Practice Arena.
- Existing theme tokens, reduced-motion preferences, existing learning content and application functionality retained.
- Implementation: assets/scripts/release-10-navigation.js and assets/styles/release-10-navigation.css, both retained at their existing paths for compatibility.

Verification: `npm run verify:deployment` passed on the local runtime (Node 22; package targets Node 24). Browser-based visual QA and live Vercel deployment remain to be completed.
