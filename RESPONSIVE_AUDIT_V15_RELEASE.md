# Data Analysis Learning Path — Responsive QA v15.0

## Scope
This release builds on v14. It standardizes the layout and light/dark controls without changing lesson content, the learner database, grading or administrator authorization.

### Areas corrected
- Added one last-loaded responsive design layer to all 22 HTML routes, reducing conflicts between earlier page-level layouts.
- Made the theme icon a fixed 44 × 44 px control, kept the correct sun/moon illustration visible, and added a fallback that moves it to an accessible floating position if its original header becomes hidden or off-screen.
- Refined compact learner headers, the 5-item mobile navigation, course week selection, chapter panels, forms and study resources.
- Tightened oversized home-page section gaps and improved the account page's links and action buttons.
- Improved form text, reference-search labels, placeholder contrast, safe-area spacing, focus states and mobile input sizing.
- Kept wide lesson tables and code blocks scrollable within their components rather than widening the whole page.
- Retained fluid desktop layouts, with readable paragraph line lengths.
- Made narrow-screen admin areas and tool panels respect their containers.
- Added reduced-motion handling for users who prefer it.

## Verification
- 22 HTML pages × 6 viewport widths (320, 390, 768, 1024, 1440 and 2560 px) × 2 themes = **264 isolated Chromium rendering cases**. No page-wide horizontal overflow or rendering exception was observed.
- **88 additional isolated theme/navigation interaction checks passed** (22 routes × 4 widths), including theme changes in both directions and mobile More-menu open/close on representative learner screens.
- All existing JavaScript regression test files passed, as did the npm scripts for responsive coverage, v14 mobile controls, and server-side access protection.
- All 22 pages load the v15 CSS once and the shared theme script once.
- Internal file reference scan found **0 broken paths**; duplicate HTML ID scan found **0 duplicates**.

### Limits of verification
The visual checks used isolated rendering with local styles and client-side UI scripts; they are not a substitute for end-to-end testing with actual signed-in learner/admin accounts and real network services. External imagery and fonts were not fetched during those isolated tests, and physical-device testing was not performed. Validate login, dark-mode persistence, course grading, downloads and the administrator controls on the deployed site.

## Deployment checklist
1. Replace the previous website build with this package, preserving the project root and server middleware.
2. Verify `index.html`, `auth.html`, `account.html`, `admin.html`, `studio.html` and all five courses on a small phone, tablet and desktop.
3. Toggle light/dark mode, reload and confirm the theme is preserved. Ensure the theme button is visible after rotating the device.
4. Test the course week selector, next/previous week, course dataset links, practice exercises, and tutor inputs.
5. Check real admin/learner sessions and server authorization (normal learners must not obtain admin pages or other people's records).
6. Clear outdated browser caches / redeploy versioned static assets when verifying the changes.

The package is source code, not a live deployment.
