# DataLearning — Premium Homepage & Brand Contrast Release

Release date: 4 November 2026

## What changed

- **Top wordmark:** `data` now has dark navy typography (`#14243F`) and `learning` has vivid, readable purple (`#5638C7`) on a white nav surface. Both text colours meet WCAG AAA normal-text contrast.
- **Homepage hero:** removed the older radial-gradient / decorative overlay rule that was overriding the intended solid navy canvas (`#142443`). The hero text stays high contrast.
- **Hero actions:** corrected a global `dalp-plain-link` reset that caused hero CTAs to render as underlined text without proper rounded buttons. Both actions now have purposeful solid backgrounds, accessible borders, hover and focus styles; they stack on narrow phones.
- **Dashboard preview and feature cards:** eliminated unexpected glass/gradient backgrounds in favour of opaque white surfaces, predictable borders, and softer shadows.
- **Responsive layout:** confirmed the page does not overflow horizontally at desktop (1440px) and mobile (390px). Existing tablet and small-device rules remain.
- **Fresh release for returning visitors:** advanced service-worker cache namespace from `dalp-public-home-brand-v29` to `dalp-public-home-premium-v30`; updated three matching cache assertions.
- **Regression protection:** added `tests/homepage-premium-finish.mjs` to `npm run build`. It guards header contrast, working actions, overlay removal, learning-path links, and cache revision.

## Preserved

All six course pages and their guide pages, Learning Coach, Tutor, Practice Arena challenge browser and editor/execution/grading functionality, site navigation/dropdowns, authentication, admin workspace and original shared footer. The homepage HTML, course content, JS engines and route structure have not been rewritten in this release.

## Verification

- `npm run build` — PASS.
- `npm run lint` — PASS.
- Core tests and responsive checks, including final `premium-design-quality` / `premium-ux-restoration` contracts — PASS when run in stages.
- `npm run test:learning`, `test:security`, `test:arena`, `test:tutor` — PASS.
- Browser-rendered static CSS measurements: DataLearning wordmark, navy hero, opaque dashboard, primary/secondary CTA rendering and feature cards; no horizontal overflow at 1440px and 390px.
- The all-in-one `npm run verify:deployment` command hit the execution time limit during sequential test execution; its build/lint stages passed, and the remaining groups were run separately.

## Deployment

This is a complete Vercel project **source package**, not an already-published deployment. Replace the repository source with the extracted project files, commit and push to the configured production branch (`main`), and verify that Vercel creates a *new* deployment from that commit. Avoid redeploying an older commit — it cannot include the updated CSS. If the old UI persists, test in an Incognito tab and check for old service-worker caches. Do not clear locally stored learning progress without exporting or syncing first.
