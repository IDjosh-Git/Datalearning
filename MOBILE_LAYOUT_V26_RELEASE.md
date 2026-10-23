# Datalearningpath v26 — Mobile Card and Layout Update

## Files changed
- `assets/layout-mobile-v26.css` (new): flexible card sizing; small-screen grids; button sizing; hover and modal transitions; reduced-motion fallback.
- `assets/modern.css`: remove fixed implicit grid row sizing for primary dashboard cards.
- `assets/responsive-polish.css`: narrow-screen column overflow safeguards.
- 22 HTML views: reference new stylesheet after v25 tokens (relative paths fixed for `/courses/`).
- `tests/sync-regression.mjs`: allow new stylesheet cache revision `20261023.26`.

## Layout approach
Cards have intrinsic height and minimum width zero so content determines size and cannot impose extra column width. Grids collapse to two columns under 900px and one column under 640px; compact metric strip becomes one column under 380px. Buttons/links with defined action classes use 48px minimum footprints. Hover translation applies only to fine-pointer devices; reduced-motion turns off all new motion. Dialog containers have bounded viewport sizes and internal scroll.

## Verification
- `npm test`: PASS
- `npm run test:responsive:v15`: PASS
- `npm run test:course-mobile:v21`: PASS

## Outstanding QA
The automation above checks static rules and regressions, not pixel geometry. Verify screenshots, overlapping fixed nav elements, content overflow, screen-reader behavior and dialog transitions in real browsers at widths 320, 375, 390, 768, 1024, 1440 and 1920 pixels, in both themes. Keep production approval contingent on live authentication, API and offline sync tests previously documented in v24.

## Deployment
Preserve folder paths, upload built static files with `layout-mobile-v26.css`, and invalidate cached HTML. Stylesheet is last in `<head>` to override v25 values. No database migrations are required.
