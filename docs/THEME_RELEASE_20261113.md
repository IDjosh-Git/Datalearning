# DataLearning unified theme release — 13 November 2026

Version: **2.3.1**. Source update only; not deployed.

## What changed

- Harmonised active UI color literals across 54 stylesheets, 38 HTML routes, inline SVG icons, four JS-driven UI color sources and 108 course/illustration SVGs. Retired mixed purple, orange and legacy blue/teal branding in favor of the navy–cornflower–pistachio palette. Instructional diagrams retain their topics and content; raster screenshots are not recolored.
- Maintained the final shared theme file at `assets/styles/palette-premium-20261113.css` with versioned links on all pages. Preserved the Tutor rich-text stylesheet as the final, specialized response-layout layer.
- Restyled authenticated sidebar, top navigation, Admin Overview, Courses Analysis, Learners & Progress, Review Desk, personal Learning Dashboard, Profile, Certificate Viewer, Connection Health and Sync Diagnostics with consistent dark navy gradients and accessible light text.
- Removed old page-wide ambient gradient overlays from authenticated page canvases. Public navigation uses a subtle light gradient and the same color tokens.
- Preserved the translucent page loader's ~75% transparent backdrop and reduced-motion behavior.
- Kept role-based navigation, server authentication, Supabase persistence, nine courses, all 90 weekly visual guides, Tutor response formatting, Practice Arena, assessments and reports unchanged in behavior.

## Validation

- `npm test` and `npm run lint` (full automated suites) pass.
- All 54 CSS stylesheets parse without top-level errors.
- Chromium isolated render checks cover 11 representative public/private pages at 320, 390, 768 and 1440 pixels, with no horizontal page overflow and gradient header styles present. These tests use static page markup with scripts removed; they are not authenticated end-to-end tests.
- Contrast checks confirm WCAG AA for key reference foreground/background pairs. They are not a substitute for a full WCAG audit of every possible state.

## Deployment checklist

1. Deploy the complete source ZIP to the existing Vercel project, preserving current environment variables and Supabase configuration.
2. Hard-refresh the site once after deployment to load `palette-premium-20261113.css?v=20261113-theme-v2` and updated bundled CSS.
3. Verify sign-in, one-session navigation, the admin-only sidebar, live progress updates, Tutor messages, and mobile page loader with real accounts.
4. Visually inspect dark mode if your deployment exposes it. The canonical palette provides dark-mode tokens, but live dark-mode behavior is not covered by authenticated browser testing.
