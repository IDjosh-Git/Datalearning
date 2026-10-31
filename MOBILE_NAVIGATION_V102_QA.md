# Mobile learning-navigation correction — v102

Baseline: `Data_Analysis_Learning_Path_Cache_Revision_Fixed_v101.zip`. This release is a narrow navigation/layout correction, not a redesign. There are **26 HTML pages**, including six `courses/*.html` files.

## Reproduced cause

The homepage loaded the original page header, the shared `workspace-shell.js` header/bottom tabs, and the v97 `learning-catalog-v97.js` sidebar/mobile menu. The workspace module hides the older page header, but the v97 module still inserted a second visible mobile bar (“Learning menu”) and its own drawer. It also reserved 248px for its desktop sidebar on the homepage. The six course pages loaded the same workspace and v97 navigation stack. The standalone catalog intentionally uses v97 navigation and does not load the workspace shell.

## Scoped changes

- `assets/learning-catalog-v97.css`: hides `.dlp97-navigation` on `body.lp-home.dlp97-learning-page` and removes its reserved desktop left padding. **The homepage continues loading the v97 JavaScript module:** it also verifies account state, performs progress synchronization and dispatches `dalp:auth-ready`.
- The same existing `@media(max-width:1100px)` block hides the redundant v97 navigation **only** on course pages with `body.dl-workspace.dlp97-learning-page`. The shared workspace navigation already has the six courses in its accessible More drawer. At widths above 1100px, the course sidebar is preserved.
- The public standalone `catalog.html` retains its own v97 menu/sidebar. Native in-course lesson navigation, routes, authentication checks and completion/grading remain unchanged.
- Updated the `learning-catalog-v97.css` query-string cache hash to `ea14425fbe45` across all **eight** pages that load it: `index.html`, `catalog.html`, and six course pages. No CSS source files were renamed and `text-contrast-v98.css` remains the final stylesheet.
- Added `tests/learning-navigation-v102.mjs` (static route/asset/nav coverage) and `tests/learning-navigation-v102.py` (Chromium-rendered navigation geometry, menu/Escape, themes). The static regression is included in `npm run test:responsive`. New direct commands: `npm run test:navigation:v102` and `npm run test:navigation:browser:v102`.
- `package.json`: added the commands and connected the static regression to responsive coverage.

## Browser results

Browser fixture uses the actual HTML and CSS with the actual workspace/catalog JS modules. URL paths are substituted *in the QA fixture only* because browser navigation to local/hosted URLs is restricted in this container. This checks rendered geometry, drawer links and keyboard Escape; it does not verify live accounts, network requests or real site navigation.

- Homepage and public catalog: **48 / 48 passed** (12 widths: 320, 360, 375, 390, 430, 600, 768, 900, 1024, 1365, 1440, 2560 CSS pixels × light/dark × two routes). No document overflow, duplicate visible menu, missing catalog menu or broken drawer/Escape checks.
- Six course pages: **48 / 48 passed** at 320, 390, 1024 and 1440 CSS pixels in both themes, completed across the per-course runs. All retain the desktop v97 sidebar above 1100px; mobile uses workspace navigation and the course links remain in its More drawer.
- A separate, existing workspace navigation Chromium test completed **16/16** keyboard/layout checks.
- These screenshots/fixtures are not physical-device or authenticated end-to-end tests. The full 12-width course-page sweep was not completed, and long-running combined browser jobs timed out; smaller independent runs completed.

## Command results (final source)

| Command | Result |
| --- | --- |
| `npm test` | PASS |
| `npm run test:responsive` | PASS (includes v102 static check) |
| `npm run test:contrast:v98` | PASS |
| `npm run test:design:v99` | PASS |
| `npm run test:visual:v96` | PASS |
| `npm run test:catalog:v97` | PASS |
| `npm run test:responsive:v100` | PASS |
| `npm run test:cache:v101` | PASS |
| `npm run verify:deployment` | PASS (local/static only) |
| `npm run test:workspace` | PASS |
| `python3 tests/navigation-render-v100.py` | PASS, 16/16 |
| `npm run test:navigation:v90` | PASS, 0 invalid local targets |
| `node tests/learning-navigation-v102.mjs` | PASS |
| `npm run test:page-load:v91` | **FAIL** (pre-existing obsolete assertion at `tests/page-load-recovery-v91.mjs:20`: expects exact `auth-gate.js?v=20261031.92` on an HTML page; unrelated to these edits) |

## Remaining checks

Verify the deployed site in real iOS Safari and Android Chrome, especially 320–430px portrait/landscape, large text/200% zoom, menu focus behavior and signed-in user state. Confirm cache invalidation for the v102 catalog CSS on Vercel after publishing. This ZIP has **not** been deployed.
