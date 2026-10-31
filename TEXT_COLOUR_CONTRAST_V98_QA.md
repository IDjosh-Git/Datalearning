# v98 — Dual-theme text and visibility audit

## Scope

This update is **presentation-only**, applied to the v97 course catalog and shared learning/navigation build. It adds `assets/text-contrast-v98.css` as the last stylesheet across **26 HTML routes** (20 root routes and six real course pages). Existing course content, lesson data, authentication rules, permissions, navigation behavior, progress storage, database configuration, and functionality were not rewritten.

## Changes made

- Added dedicated, light/dark legibility tokens to avoid historical component overrides (including older purple/pink brand aliases).
- Corrected faint dashboard labels, sidebar and header links, course progress percentages, catalog hero headings, and sign-in wordmark and supporting text.
- Corrected sign-in story links against the navy gradient, form field placeholders, status/feedback text, disabled tutor options, and accessible focus indicators.
- Corrected **deep lesson content**, including weeks 1–10 of Excel, SQL, Power BI, and Python: low-contrast week-number badges, mastery verification cards, lesson kickers, and labels.
- Corrected Introduction lesson callouts and case-study labels; updated Practice Arena, Learning Lab, reference, capstone, reviewer, certificate, and credential-verification page text.
- Retained reduced-motion behavior and light/dark theme switching. All changes are CSS-only, except for a stylesheet reference in each page and non-product test/QA files.

## Checks completed

The v98 HTML/CSS computed-style scanner (`tests/text-contrast-dom-v98.py`) inlines existing local styles, then uses Chromium to inspect rendered *static* page text. It calculates foreground/background contrast by compositing solid ancestor backgrounds and checks normal text at **4.5:1** or large/bold text at **3:1**. It excludes script-generated and authenticated views and layered gradients, which cannot be accurately composited by this scanner.

| Viewport | Theme/route combinations | Evaluated text samples | Failures |
|---|---:|---:|---:|
| Desktop (1365 px) | 52 | 17,932 | 0 |
| Mobile (390 px) | 52 | 17,798 | 0 |
| **Total** | **104** | **35,730** | **0** |

CSS token/unit verification also checks **11 representative foreground/background pairs**, all meeting at least 4.5:1, and confirms the final stylesheet is loaded on all 26 routes. The full-depth audit explicitly evaluates lesson text below the first viewport, not just the first screen.

Commands:

```
npm run test:contrast:v98
python3 tests/text-contrast-dom-v98.py --width 1365
python3 tests/text-contrast-dom-v98.py --width 390
```

Selected baseline checks: `tests/visual-v96.mjs`, `tests/visual-v95.mjs`, `tests/catalog-navigation-v97.mjs`, `tests/color-system-v86.mjs`, and `tests/color-consistency-v89.mjs` pass. The v86/v89 assertions retain their original 25-route scope and now account for the newer v97/v98 stylesheets.

## Known limits and staging checklist

- Chromium navigation to `http://localhost` and `file://` is blocked by the current execution environment. The computed-style audit uses a controlled document built from the original HTML and stylesheets; it is **not** a full hosted browser/end-to-end authentication or loading test.
- CSS gradient backgrounds and transparent background images require human visual review and pixel-based sampling on the actual hosted route; the automated 35,730-sample result excludes those text nodes. Known dark-gradient links and hero labels were improved through explicit contrast rules.
- Script-generated panels, live data, validation messages, native select popups, high-contrast browser settings, and authenticated learner/admin content states should be reviewed in staging in both themes. A static audit alone cannot certify universal WCAG AA conformance.
- Retest the previous legacy `tests/admin-roles.mjs` failure separately. Its authorization logic was not changed as part of the contrast audit.
- No deployment was performed.
