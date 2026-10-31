# Visual and deployment follow-up v101

## Practice Arena header

The prior fix prevented badge overflow but still left the pills on three stacked rows at 390px, making the hero 234px tall. The mobile rules now tighten the hero spacing and pill typography while preserving all three visible labels. In local Chromium the hero measures **141px at 360–400px**, **178px at 320px**, and **131px at 1365px**. The rendered test now checks these height limits and text wrapping at 320, 360, 375, and 390px in both themes, plus a 200% text-size case at 320px.

## Dashboard light mode

The `index.html` landing/dashboard, `account.html`, `progress.html`, and `admin.html` were checked with the existing rendered contrast scanner at 390px and 1365px. It reported **zero contrast failures** in both runs (440 and 442 text samples across four pages/two themes). The local 390px dashboard screenshot was also visually inspected; the hero heading, description, course cards, and controls render with dark, readable text in light mode. I could not reproduce invisible dashboard text in this local package. The contrast scanner does not evaluate text over gradients, so it is not a full WCAG certification; if a particular deployed label is still invisible, a screenshot or the exact text/URL will help pinpoint that state.

## Vercel and asset freshness

The Vercel project catalog identifies the matching project as **`datalearning`**. Read-only project details and production deployment listing both returned **403 Forbidden** because this session is not authorized for the owning team scope. Therefore I cannot confirm which commit/build is currently serving production yet. No deployment was started or changed.

To reduce stale stylesheet reuse when this package is built and deployed, I changed the cache-busting query version to `v=101` for the premium and contrast styles on all 26 HTML pages, and for the Practice Arena product stylesheet. This does not deploy the files or prove that Vercel is serving them; production verification still needs team access and a live route/assets comparison.

## Files changed in this follow-up

- Updated the Practice Arena mobile hero and badge rules in `assets/arena-product-v85.css`.
- Updated shared stylesheet cache-key references in all 26 HTML pages; updated the Practice Arena stylesheet key on `practice.html`.
- Expanded `tests/practice-overflow-v100.py` with a regression check for mobile hero height.

## Verification

`python3 tests/practice-overflow-v100.py`, `npm run test:responsive`, `npm run test:contrast:v98`, `npm run test:design:v99`, `npm run test:visual:v96`, `npm test`, `npm run test:navigation:v90`, `npm run test:navigation:interaction:v90`, and `npm run verify:deployment` all pass with the new query keys. `npm test` prints “Administrator permissions unavailable” from its runtime auth check but exits successfully; no live admin account was used. Vercel production state, physical-device/browser zoom, and live authenticated routes remain unverified.
