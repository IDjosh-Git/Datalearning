# DataLearning: Course catalogue and premium dropdown refresh

Date: 5 November 2026

## User-facing updates
- **Explore All Courses** no longer mounts the second/legacy learning sidebar. The site-wide header is the only top-level navigation on this page. The six course-player lesson sidebars are unchanged.
- Removed the legacy 248px left offset from the catalogue at desktop widths. The content occupies the full browser width (bounded at 1776px for legibility on ultrawide screens).
- The six course cards display in three columns on wide desktops, two on smaller desktops/tablets, and one on mobile; the course search, filters, progress labels and clickable cards retain their existing behavior.
- Redesigned the **Courses** and **Study Tools** dropdown panels across all public pages, with course-coloured icons, two-column Bento cards on desktop, comfortable mobile touch targets, strong focus/hover styles, and a high-contrast All Courses link.
- Updated public service-worker cache revision to `dalp-public-catalog-menu-v39` for newly published assets.

## Verification
- `npm run verify:deployment`: passed (build, lint, core, responsive, learning, security, Practice Arena, Tutor suites).
- New `tests/catalog-premium-navigation.mjs` checks the sidebar removal, fluid catalogue grid, dropdown styling, and cache revision.
- Embedded browser preview (the automated environment blocks direct localhost/file URL navigation): checked 320, 390, 768, 1024, 1201, 1280, 1440 and 1920px; no page-level horizontal overflow, one global header, no catalogue sidebar, six course cards; search, clear filters, and desktop/mobile dropdown behavior checked.
- Browser preview is HTML/CSS/JS inlined from the actual source; it is not an authenticated live-production test.

## Publish
Deploy the updated source to the repository/Vercel. This ZIP does not update the live site. Verify the published preview on actual phones/tablets and check authenticated progress before production promotion.
