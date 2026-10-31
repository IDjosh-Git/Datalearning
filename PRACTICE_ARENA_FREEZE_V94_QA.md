# Practice Arena freeze repair — v94

## Reproduced defect

The current production release is v93 (Vercel production commit `55ef5e9abff08f14e842cf1aa668aae1cd181181`). In an isolated Chromium run using actual v93 source assets, loading scripts in their page order stalled at `assets/arena-product-v85.js`. The reason was an unbounded `MutationObserver` microtask loop:

- The observer listened to root-level children of `#practiceDetail`.
- `update()` tried to position `#practiceFeedback` and `#practiceSupport` after `.ide-shell` by testing `assessment.previousElementSibling !== shell`.
- `.ide-shell` is nested inside a wrapper in some layouts, so that sibling comparison can never become true. `root.append(assessment, help)` caused a child-list mutation every time.
- The callback immediately queued another microtask. This starved user input and scrolling and could look like an overlay or browser freeze.

The v93 complete-script source probe timed out after loading the script immediately preceding `arena-product-v85.js`; v94's complete-script source probe reached the end normally. The defect was observed in isolated local Chromium, not by directly controlling the production browser.

## Minimal repair

Only the following application files changed:

- `assets/arena-product-v85.js`: Move feedback/help only when they are not already direct adjacent children of the practice root. Disconnect `MutationObserver` during updates to avoid observing its own DOM writes; coalesce updates with `requestAnimationFrame` rather than immediately chaining microtasks. Preserve learning metadata and course bridge functionality.
- `practice.html`: Cache-bust that script (`?v=20261031.94`) so deployed browsers request the repaired file.
- `tests/arena-product-v85.mjs`: Update an obsolete test asserting the very sibling-comparison expression responsible for the freeze. Test the new observer lifecycle contract instead.

No challenge data, grading logic, course material, routes, authentication, or layout/theme styles were replaced.

## Checks performed

- Chromium source script probe: **v93 stalled**, **v94 completed all 29 locally available scripts**, with no unbounded update loop.
- Isolated Chromium, 390px mobile and 1440px desktop: **page scrolls**, SQL/Excel/Python launchers respond, each reveals a real six-item challenge shortlist and matching workspace, the full selector dialog opens and closes, and scrolling continues after closing.
- Hidden global overlay and quick-find overlay remained hidden on startup.
- Existing local tests passed: `arena-product-v85.mjs`, `practice-arena-v31.mjs`, `arena-scroll-and-theme-v54.mjs`, `arena-editor-isolation-v53.mjs`, `practice-deploy-audit.mjs`, `smoke.mjs`, `auth-first.mjs`, `learning-v84.mjs`, `color-consistency-v89.mjs`, `workspace-coverage.mjs`, and `page-load-recovery-v91.mjs`.
- No new severe page errors in the isolated interaction test. A local `about:blank` test-origin `localStorage` permission error was excluded from production claims; real HTTP-origin storage behavior still requires staging verification.

## Limitations / next step

v94 is a source-only fix. It has **not been deployed to production**. The live Vercel site cannot be navigated from this execution environment, so user-device validation, production browser console errors, and real HTTP Back/Forward/refresh remain unverified. Deploy v94, open a private browser window to `/practice.html`, and test clicks, scrolling, each tool, challenge selection, dialogs, and refresh. If an older service worker has cached the script, a hard refresh may be required after deployment. Do not clear application storage if it contains unsynced local practice attempts.
