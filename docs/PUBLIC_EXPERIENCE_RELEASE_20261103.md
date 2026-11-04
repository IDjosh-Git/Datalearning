# Data Learning — Public Experience V4

**Date:** 3 November 2026  
**Scope:** All 29 public content and course routes, retaining the previous premium authentication and protected workspace styling.  
**Deployment target:** The existing Vercel static site and API routes; no live deployment performed.

## Completed work

1. **Unified public navigation.** Replaced eight long, repeated masthead links with Home, Courses, Study tools, Capstone and My learning. Courses opens a six-track, colour-coded menu. Study tools groups reference examples, the prompt library, practice, Learning Lab, tutor and Learning Coach. Removed the extra Learning Coach top-level button by placing it in the Study tools menu.
2. **Touch-friendly mobile navigation.** Semantic `details` flyouts, a fixed-height scrollable panel, 48px tap targets, safe-area spacing, Escape/outside-click/overlay close, and responsive layouts including short landscape screens.
3. **Vibrant but restrained public theme.** Reworked page headers, buttons, input controls, course cards, learning sections and responsive spacing with a consistent typographic system and cool-neutral surfaces. Every course has a distinct accent, with contrast-safe dark primary buttons.
4. **Data Analysis introduction.** Refreshed the introductory hero, guided visual, resource actions, lesson surfaces, practice callouts, and study/reading layout; retained all eight lessons and the knowledge check.
5. **All six course experiences.** Updated the course player/overview, roadmap and extension pages for Data Analysis, Excel, SQL, Power BI, Python and AI (18 course routes), without rewriting instructional content or progress logic.
6. **Removed duplicate page-level navigation.** Retained functional week-selection/print tools while hiding redundant course sign-in CTAs, the AI local duplicate masthead and the old preview topbar. The shared navbar now covers these destinations.
7. **Vercel deployment hygiene.** Existing `vercel.json`, security middleware, API functions, Node version pin and route rewrites retained. Updated the service-worker cache key to `dalp-public-navigation-v23` and added source contract tests for the new public design.

## Design architecture

`assets/styles/design-system.css` remains the site-wide foundation, including protected pages. A dedicated **`assets/styles/public-vibrant.css`** loads last on the 29 refreshed public content routes and modernizes the public visual presentation. Legacy course-player styles remain available for complex lesson, code editor and navigation functionality. This is a scoped visual replacement, **not** a physical deletion of every historic CSS declaration.

`assets/scripts/public-navigation.js` handles responsive menu state; `assets/scripts/learner-companion.js` places the Learning Coach inside Study tools. Accessibility is preserved with native `<details>`, descriptive links, visible focus states and reduced-motion preferences.

## Release validation

- `npm run verify:deployment`: **PASS** (build, lint, core, responsive, learning, security, arena, tutor).
- All **38 application routes** passed the source integrity and local-link checks.
- All **29 refreshed public routes** have one matching header, script and final stylesheet.
- All six course colour themes have white-text primary actions meeting **WCAG AA 4.5:1** contrast on their selected solid backgrounds.
- `tinycss2` parser: **0 errors** in `public-vibrant.css`.
- Navigation interaction simulation: **PASS** (toggle, Escape, outside click, closing one flyout when another opens, link selection, breakpoint changes).
- Execution environment: **Node.js 22**. The repository is configured for **Node.js 24** in `package.json` and `.nvmrc`; deployment with Node 24 should be confirmed in a Vercel preview.

### Limitations before production

The managed Chromium installation in this environment rejects all page navigations (`ERR_BLOCKED_BY_ADMINISTRATOR`, with a managed URL blocklist), including localhost and file URLs. **This pass did not obtain fresh browser-rendered screenshots or device-specific visual proof.** Static responsive analysis is not equivalent to a real browser/device audit. A preview deployment should be reviewed at 320px, 390px, 768px, 1024px, 1440px and short landscape dimensions, with an authenticated session for protected workflow testing.

No production or preview deployment was initiated, and no live site files were modified. The supplied ZIP is a release candidate, not a guaranteed production deployment.

## Recommended release sequence

1. Unzip into the root of a new Git branch (`index.html`, `package.json`, `vercel.json` at the root).
2. Install dependencies and run `npm run verify:deployment` using Node.js 24.
3. Open the Vercel Git preview. Visually inspect navigation on touch devices and each of the six courses; test learning progress and sign-in.
4. Merge to the production branch only after preview smoke testing.

*Design influence: contemporary editorial navigation, colour-coded learning collections and layered gradient treatments seen in GetLayers-style galleries. The implementation is custom to this app; no paid third-party template code or proprietary visual asset has been included.*
