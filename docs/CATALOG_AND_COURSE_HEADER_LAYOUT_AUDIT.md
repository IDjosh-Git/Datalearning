# Learn catalogue and course header layout audit — 1 November 2026

## Problems reproduced

- Learn (`catalog.html`) cards were drawn roughly **50px taller than their CSS grid tracks** at 1280px because the last-loaded theme forced `height:100%` on content-box cards. This caused visible vertical collisions despite the grid having a `gap`.
- AI (`courses/ai.html`) and Introduction (`courses/introduction.html`) banner styling had higher-specificity pale-canvas overrides, while their titles and descriptive copy were white.
- A global plain-link rule painted dark-banner links indigo even though they sat on a dark background.
- Some headline/padding rules gave banners unnecessarily tall layouts.

## Source-level corrections

- Kept catalogue cards in the normal grid sizing algorithm with border-box sizing and explicit 24–34px row spacing.
- Removed the pale `background:var(--course-page-canvas)` assignments from course hero selectors in both course-specific layout files; banners now use the existing flat page-tone colours with white text.
- Excluded links inside dark themed heroes from the generic plain-link colour rule. They remain underlined and have pale, high-contrast text.
- Compacted the shared navigation to 56px minimum, narrowed its inner max-width to 1320px, and reduced the prominent catalogue, Introduction and AI banner typography/padding. Kept accessible 44px navigation targets.
- Removed decorative catalogue hero gradient/circle treatment and the Introduction hero's filled link buttons. The individual lesson and course links are unchanged.
- Updated the public offline cache key to `dalp-public-performance-v7`.

## Verification

- The browser's computed rectangles confirmed the catalogue now has **zero card intersections** and row spacing of 24–34px.
- Tested the catalogue, AI, Introduction and Excel pages at **360px, 768px and 1280px**. No page-level horizontal overflow occurred in these rendered static layouts.
- AI and Introduction banners rendered with dark slate/indigo backgrounds rather than a white canvas.
- Build, lint, automated test suites and the new source regression check passed.

## Limits

The viewport test was performed with styles and HTML rendered in an isolated browser document. It does not verify live authentication, data-driven states or production web-font/network behaviour. These should be checked on deployment.
