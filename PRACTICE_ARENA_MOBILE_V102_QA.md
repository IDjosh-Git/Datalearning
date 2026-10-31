# Practice Arena mobile layout and dashboard follow-up v102

## Practice Arena badges and header height

The badges now occupy no more than two rows from 320px through 430px, and collapse to one row when there is enough room. At 320px, a two-column grid keeps Excel and SQL on the first row and Python on the second; the labels wrap within their own pills without clipping. At 360–430px, the natural flex layout wraps into two rows. Local Chromium measured the hero at **156px at 320px**, **141px at 360–430px**, **104px at 600px**, and **131px at 1365px**. All three labels remain visible.

`tests/practice-overflow-v100.py` now checks mobile strip containment, readable pill contents, a maximum of two rows, a bounded hero height, both themes at 320/360/375/390px, and 200% text at 320px. It passes.

## Dashboard light mode and Vercel

The light-theme text audit on the likely dashboard routes (`index.html`, `account.html`, `progress.html`, and `admin.html`) reports zero contrast failures at 390px and 1365px; the home dashboard screenshot was visually checked locally. The CSS contrast audit does not evaluate gradient-backed text, and I did not reproduce invisible text in this local package.

The Vercel project catalog lists the matching project as `datalearning`, but read-only project and production-deployment details return 403 until the owning team grants access to this connection. I have not deployed anything, so production serving the new package is not confirmed. As a cache precaution for the next build, the premium and contrast stylesheet query versions were bumped to `v=101` on all 26 pages, and the Practice Arena stylesheet query was bumped to `v=101`.

## Verification

The targeted Chromium regression, `npm run test:responsive`, `npm run test:design:v99`, `npm run test:visual:v96`, `npm run test:contrast:v98`, `npm test`, `npm run test:navigation:interaction:v90`, and `npm run verify:deployment` all pass after the two-row change. `npm test` prints “Administrator permissions unavailable” for its runtime auth check but exits successfully; no production account was used. The Vercel production state, physical-device testing, and live authenticated routes remain unverified.
