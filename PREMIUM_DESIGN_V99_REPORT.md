# Premium design v99 — implementation and verification

## Design decision

A single **midnight navy / jade / porcelain** visual system is applied consistently to all discovered HTML pages. Light canvas: `#F4F7F8`, dark canvas: `#091824`, navigation/hero navy around `#102B3D`, actionable jade `#08766D`. Supporting colours remain semantic (positive, warning, danger) rather than being flattened into the brand colour.

### What changed

- Added `assets/premium-design-v99.css`: shared colour tokens and aliases, headings, navigation, contextual links, cards, landing-page pathfinder, course catalog, course navigation/lesson outlines, editorial headers, authentication, practice, tutor and responsive treatments.
- Linked it exactly once in **all 26 HTML documents**, immediately **before** `assets/text-contrast-v98.css`, which remains the final stylesheet on every page.
- Retained the catalog's standalone v97 navigation, responsive breakpoints and theme; retained each course's existing lessons/quiz/progress logic and the practice editor's syntax styling.
- Refreshed one **dark-auth text contrast rule** inside `text-contrast-v98.css` because the old light-header assumption had made header/footer copy nearly unreadable against the new dark header. The updated rule uses light text on dark.
- Updated `tests/visual-v96.mjs` and `tests/color-consistency-v89.mjs` to check real stylesheet order rather than the previous penultimate v96/v97 layer. Added `tests/premium-design-v99.mjs` and `npm run test:design:v99` to enforce the new coverage, tokens, layout groups and sampled AA colour pairs.
- Extended the DOM audit's Python script with optional `--routes` to run focused page batches; the default remains the full discovered route set.
- Regenerated `HTML_STYLESHEET_INVENTORY.md` and `HTML_STYLESHEET_REFERENCES.csv` via `tests/write-stylesheet-inventory.mjs` to reflect the 1,079 actual stylesheet references.

### Verification

| Command/check | Actual result |
| --- | --- |
| `npm test` | PASS |
| `npm run test:responsive` | PASS |
| `npm run test:design:v99` | PASS |
| `npm run test:contrast:v98` | PASS |
| `npm run test:visual:v96` | PASS |
| `npm run test:catalog:v97` | PASS |
| `npm run test:navigation:v90` | PASS; 718 authored links, 0 unresolved local targets |
| `npm run verify:deployment` | PASS static checks; **not deployed** |
| `python3 tests/text-contrast-dom-v98.py --width 390` (26 pages split via `--routes`) | PASS: 52 page/theme snapshots, 17,740 evaluated text samples, 0 findings |
| `python3 tests/text-contrast-dom-v98.py --width 1365` (26 pages split via `--routes`) | PASS: 52 page/theme snapshots, 17,808 evaluated text samples, 0 findings |
| Chromium static layout sweep: 390px, light and dark | PASS: 26 pages per theme, 0 horizontal overflow findings |
| Chromium static layout sweep: 768px, light | PASS: 26 pages, 0 horizontal overflow findings |
| Full sweep at 768px dark and 1365px all pages | **INCOMPLETE:** long browser sweep timed out. Representative 1365px light/dark screenshots were generated for eight page types. |
| `npm run test:page-load:v91` | FAIL: **pre-existing** stale assertion in `tests/page-load-recovery-v91.mjs:20`, expecting `auth-gate.js?v=20261031.92` on selected pages. Not changed because unrelated to visual layout and potentially consequential for auth. |

The contrast auditor excludes gradient-backed text and uses statically inlined CSS with scripts removed. Its pass results do not constitute full WCAG certification or prove authenticated runtime flows. Validate real hosted pages in modern Chrome, Safari and Firefox; test touch navigation, keyboard/screen reader, 390/768/1365 widths, light/dark/system modes, editors, quizzes, lesson progress, admin role gates and printable certificates prior to deployment.

**Scope:** No deployment, JavaScript product behaviour, course content, external service, navigation route, authorization or storage change.
