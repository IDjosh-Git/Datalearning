# v101 — production stylesheet cache revision repair

## Problem

The v100 responsive release modified `assets/premium-design-v99.css` and `assets/learning-catalog-v97.css`, but pages still requested `?v=99` and `?v=97`. The Vercel configuration caches `/assets/*` for up to one hour, with `stale-while-revalidate=86400`; stale asset URLs could therefore show old styling after a successful build. This was a URL revision defect, not a need to redesign layouts or disable caching.

## Change

- Kept the stylesheet **filenames, contents, cascade order and v98 final contrast layer unchanged**.
- Updated **26/26 pages** referencing `premium-design-v99.css` to `?v=3c9b7d8be5df` (first 12 characters of that file's SHA-256).
- Updated **8/8 pages** referencing `learning-catalog-v97.css` to `?v=bfbcf487f3ed` (first 12 characters of that file's SHA-256).
- Changed `package.json` `engines.node` from the unbounded `>=20` to `24.x`, matching the Vercel project's configured Node.js major version and preventing automatic future-major selection. This may produce a local engine warning on Node 22; use Node 24 for parity with production.
- Added `tests/cache-revisions-v101.mjs` and `npm run test:cache:v101`. The guard derives expected cache keys from CSS bytes and checks every discovered HTML page, missing local stylesheets, duplicate refs, premium coverage, and contrast order. `npm test` now runs this guard automatically.

For future updates to either stylesheet, compute the 12-character SHA-256 prefix of the changed file and update the matching link query in every referencing HTML document. `npm run test:cache:v101` will fail when any page is missed or a stylesheet is edited without updating its revision.

## Local verification (Node v22.16.0)

| Command | Result |
|---|---|
| `npm test` | PASS |
| `npm run test:responsive` | PASS |
| `npm run test:contrast:v98` | PASS |
| `npm run test:design:v99` | PASS |
| `npm run test:visual:v96` | PASS |
| `npm run test:catalog:v97` | PASS |
| `npm run test:responsive:v100` | PASS |
| `npm run verify:deployment` | PASS — static deployment configuration and references only |
| `npm run test:server-auth` | PASS |
| `npm run test:cache:v101` | PASS |
| `npm run test:page-load:v91` | FAIL — **pre-existing**, obsolete `auth-gate.js?v=20261031.92` exact query assertion on line 20. Unchanged authentication implementation and test. |

Verified both changed CSS assets are identical in content to the v100 inputs. The only changes to the existing 26 HTML pages are the two affected stylesheet query revisions (34 references total). The final v98 stylesheet is still last on every page.

## Publication / production check

**Not deployed.** This ZIP is a local repair. Publish the *contents* of `Datalearningpath/` to the existing `IDjosh-Git/Datalearning` repository's production branch (`main`) using the normal reviewed Git workflow. Check that the subsequent Vercel production deployment is READY and inspect the served HTML at `https://datalearning.vercel.app` (or with DevTools Network) to verify the new query keys and HTTP 200 responses for both CSS URLs. Test the homepage, catalog, and Practice Arena on mobile with fresh and existing browser profiles. No live production verification or Node 24 execution was performed for this local fix.
