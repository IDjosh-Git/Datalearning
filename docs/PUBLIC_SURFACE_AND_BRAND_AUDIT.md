# Public page backgrounds, cards and brand audit — 1 November 2026

## Scope

All 38 HTML routes inspected at source level; 28 public pages using the shared header, including six core courses and twelve roadmap/extension routes. Current source baseline: `Data_Analysis_Learning_Path_Organization_Audited.zip`.

## Changes

- Replaced the legacy green/gradient placeholder icon with an original SVG mark: ascending analytics columns and an insight arrow, using ink navy, blue and warm amber. Shared header and inline brand usages point to the same asset.
- Reduced the shared navigation row to a 58px minimum. The menu remains responsive, with a touch-friendly drawer toggle.
- Moved **Learning Coach** into the right end of the shared navigation (desktop) and below menu links in the expanded mobile menu. Its dialog remains in the document body and retains the existing focus/escape-key logic.
- Harmonized public backgrounds with the light canvas, flat white content cards, 14px radii, neutral borders, soft shadows, and consistent text alignment/line-heights. Existing cards with meaningful course/progress information are retained.
- Improved course heading contrast and wrapping, including weekly headers and the player topbar.
- Removed filled-blue backgrounds from informational hyperlinks, while preserving semantic button controls, tabs, navigation links, meaningful whole-card links, quizzes and progress widgets.
- Changed the learner dashboard bottom trust band to dark navy-slate and its footer to deep navy. Footer text and links are light, with the previously requested black Contact Support action retained.
- Kept the current styling in the existing `assets/styles/design-system.css`; no new runtime stylesheet or route was added.

## Verification

- `npm run build`, `npm run lint`, `npm test`.
- The `public-surface-brand-audit.mjs` regression test checks shared header counts, nested logo references, Learning Coach script inclusion, palette and dark-footer rules.
- Structural CSS parsing and referenced-asset checks.

## Limits

Headless Chromium did not complete a local-page screenshot (timed out). Visual correctness at every screen size, dynamically computed contrast for every user state, remote font availability, and live authenticated workflows **have not** been verified. Verify in a deployed browser before treating the release as visually certified.
