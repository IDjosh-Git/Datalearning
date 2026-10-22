# Data Analysis Learning Path — Mobile, Tablet, Desktop & Theme Audit (v14)

## Scope
This release updates all 22 HTML screens, including all five courses, login, learner account, admin dashboard, progress reports, assessment desk, practice studio, tutoring tools, certificates, and utilities. It builds on v13 and retains role-aware authorization, course learning records, and the server-side admin gate from v9.

## Root cause fixed — missing theme control
The former `modern.js` inserted its theme button into an old navigation bar. On modern course and dashboard layouts, that bar is hidden in favour of the new workspace header, making the button invisible on some devices. Several standalone routes did not load the old button script at all.

`theme-control-v14.js` now inserts **one** accessible light/dark button in the actual visible workspace, admin, sign-in or standalone header. Old hidden controls are removed, so keyboard and screen reader users do not navigate to invisible buttons. It retains the existing `dalp-theme` preference key, responds to cross-tab changes, has a text label/tooltip and accurate `aria-label`/`aria-pressed` state, and displays self-contained SVG sun/moon icons without relying on an external icon library.

## Visual and interaction changes
- Standardized header actions so search, profile and theme controls fit even a 320px phone.
- Kept mobile bottom navigation reachable and accounted for safe-area insets.
- Harmonized admin toolbar layout without horizontal clipping, and kept admin-only controls inside existing role gates.
- Made weekly course controls easier to tap and lesson panels fit compact screens.
- Kept code and larger tables scrollable in their local containers instead of forcing the entire site wider.
- Simplified the learner account header, replaced oversized action buttons with compact actions, and fixed account-card contrast during theme changes.
- Maintained proportional widths on desktop and wide Windows monitors; long-form lesson text remains readable.
- Added visible keyboard focus treatments and reduced-motion-aware behavior already present in the prior layout layers.

## Validation performed
- Existing application tests: `npm test` — passed.
- Existing mobile/responsive tests: `npm run test:responsive` — passed.
- Existing server authorization tests: `npm run test:server-auth` — passed.
- New 22-route theme and responsive integrity tests: `npm run test:mobile:v14` — passed.
- Isolated Chromium page checks: **44 cases** across 22 HTML pages at 390px in both themes; checked theme-button placement and horizontal document width.
- Additional theme interaction checks: **46 cases**; verified that theme button is present and visible, sun/moon icons toggle correctly, aria-label updates, and the document does not overflow at checked widths (320px, 390px, 768px, 1440px on representative pages).
- This browser environment prevents navigation to local HTTP URLs; tests use isolated rendered HTML/CSS/JS fixtures. Some sideways movement inside legitimate scroll containers and off-screen collapsed drawers is expected.

## Before public deployment
1. Deploy the updated **full** application, replacing old assets (including the new `mobile-finish-v14.css` and `theme-control-v14.js`).
2. Clear website/CDN cache. Check theme switch on iPhone Safari, Android Chrome, tablet browsers and a wide Windows monitor. Test both system-light and system-dark preferences, and a manual theme override.
3. Sign in as a learner and admin, verify the protected routes and stored progress, course week changes, library scrolling, assessments and certificate download.
4. Browser inspection should cover 320, 360, 375, 390, 430, 768, 1024, 1440 and 2560 CSS pixels. Include landscape orientation and 200% browser text zoom.
5. Confirm service worker and/or hosting caching policies do not serve stale prior stylesheets. No live deployment or physical device test was completed by this release.
