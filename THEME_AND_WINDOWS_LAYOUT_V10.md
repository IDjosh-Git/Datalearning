# Theme Consistency and Windows Desktop Layout — v10

## Overview

A shared stylesheet, `assets/theme-unified-v10.css`, now loads after every previous page stylesheet. It centralises foreground, background, border and muted-text treatments, eliminating conflicting fixed light-background styles in the course learning workspaces.

### Courses covered

- Introduction to Data Analysis
- Excel
- SQL
- Power BI
- AI Integration in Data Analysis

### Main changes

1. Harmonised course week-selector chips, lesson content, dataset downloads, recommended video links, and learning-goal cards in both themes.
2. Improved contrast for quiz panels, supplementary tips, practice exercises, code blocks, form inputs and studio controls. Gave low-contrast status badges a legible dark-mode treatment.
3. Kept course accent colours while using the same semantic surface and text tokens across all courses.
4. Removed the narrow ~1,150–1,260px content caps on large desktop monitors. Specialist courses now expand with the available browser width while retaining a sidebar and responsive inner padding; AI and introduction courses have fluid containers with a very-wide-screen maximum.
5. Moved previously late-loading course companion CSS into the document head, preventing a late theme override and improving style load order.
6. Did not change course content, completion rules, learner data, authentication, certificates, or administrator permissions.

### Validation

- Existing regression tests: `npm test`, `npm run test:responsive`, `npm run test:workspace`, `npm run test:admin`, `npm run test:server-auth`.
- New: `node tests/theme-v10.mjs` verifies the shared stylesheet on all 21 HTML pages and all five course structures.
- Isolated Chromium rendering audit for the five courses and two representative platform pages: light/dark at 390px, 1440px and 2560px (42 page/theme/viewport combinations), with no document-width overflow at the checked viewport sizes. This audit inlines styles and disables authentication/network activity for visual layout checks only, and does not constitute a live sign-in or deployment test.

### Deployment

Deploy the complete folder as a single application release. Test with a real learner account and a real admin account in both themes, and reload courses while the theme is saved. No database migration is required.
