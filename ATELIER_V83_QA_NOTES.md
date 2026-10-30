# Data Learning Path — Atelier UI v83 QA

## Changes from v82
- Added responsive CSS, mobile experience CSS, responsive JS, and page marker to standalone capstone-guide.html.
- Updated automated tests to accept 24 HTML routes rather than the previous fixed 23 count.
- Updated asset-version regression check to validate versioned references without relying on a stale numeric allowlist.
- Excluded the standalone public capstone guide from authenticated-page requirements, consistently with its existing public access design.

## Validated
- `npm test`: PASS (core smoke, regression, courses, authentication, and role checks).
- `npm run test:responsive`: PASS (24-page responsive coverage and mobile v13 checks).
- `node tests/theme-semantic-contrast-v67.mjs`: PASS (14 semantic color pairs, >= 7:1 contrast).

## Limitations
- Browser automation could not open the local app due to `ERR_BLOCKED_BY_ADMINISTRATOR`; screenshots and actual visual behavior remain unverified.
- Live Supabase integration and deployed-site behavior were not tested.
