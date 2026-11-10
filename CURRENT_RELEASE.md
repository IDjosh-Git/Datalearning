# DataLearning — Unified Loader & Sidebar Contrast Update

**Release date:** 10 November 2026  
**Based on:** `DataLearning_Clean_Premium_Arena_Contrast_20261110.zip`

## Changes

- Rebuilt the single page loader with a new deep-navy, teal and orange data-insight animation, responsive design and a reduced-motion fallback. The new loader is identical on all **39 HTML routes**, including eight protected pages. The retired `dlpPageLoader` markup and associated CSS/JavaScript were replaced.
- Removed the older circular authentication loading spinner (markup, animation and associated CSS selectors). During a private-page load, the **same branded loader stays visible until authentication succeeds**; the protected content stays concealed. Existing authorization and role gates, access-denied feedback, retry action and sign-in redirection are preserved. The error/recovery card is intentionally separate from the loader.
- Fixed the authenticated sidebar's light-hover background / light-text mismatch: hovered Academy and Administration links, icons, expandable group headings and account controls now use deep-teal text on a pale mint/ivory background. Active/current-page styles remain legible and keyboard focus is retained.
- Bumped the service worker cache name and added query-based asset revisions to page-loader and private sidebar stylesheet references to prevent older assets being reused after deployment.

## Verification

Run `npm run verify:deployment` from the project root. The suite passed locally on this release, including the shared-loader regression across all pages, protected-route security tests, Practice Arena, AI Tutor and sidebar hover contrast. Static Chromium render checks verified the loader layout and computed hovered-sidebar text colour. **Live Supabase sign-in and production browser deployment were not tested.**

## Deploying this update

Publish the **entire** project, not only `page-loader.css`. The changes require the updated 39 HTML routes, `assets/scripts/page-loader.js`, `assets/scripts/auth-gate.js`, `assets/styles/access-guard.css`, updated other route styles, `assets/styles/private-premium-rebuild.css` and `service-worker.js`. Force a fresh redeploy; then refresh the page and verify signed-in and signed-out flows, administrator role access, and the sidebar on both desktop and mobile. Browser service workers should activate the revised cache name; if a previously installed copy is still visible, perform a hard refresh and check the deployed revision.

**Unchanged:** User data, Supabase credentials/URLs and database migrations, admin permission logic, learning progress and the Practice Arena execution engines.
