# Data Learning — Navigation, Tutor & Arena refinement

Release prepared: 4 November 2026. Deployment target: Vercel static site with serverless API routes. Production has **not** been modified.

## Completed work

### Global navigation
- Retained the original grouped navigation structure: Dashboard, Courses, AI Course, Practice Arena, **Study tools** dropdown, My Learning.
- Study tools includes Learning Lab, Prompt Library, Reference Library, Capstone Studio and AI Tutor, in that order, with distinct multicolour SVG icons.
- Applied explicit dark-on-white dropdown text and accessible focus/hover styling. Responsive dropdown closes on Escape/outside click and is organised for narrow screens.
- Kept navigation consistent in 27 shared public-page templates.

### Practice Arena
- Removed competing parent `overflow`, fixed-height and absolute-position rules that clipped the editor and results panel.
- Corrected the legacy three-column CSS grid assignments: editor occupies first content track; results occupies second, without a blank leading column.
- Challenge Brief uses a separate row where present. On mobile and tablets, editor and results stack and remain available instead of hiding one pane.
- Added a functional **Expand editor** control (with `aria-pressed`) and mobile editor/results jump links. Existing challenge logic is unchanged.
- CSS-only browser measurements using an injected representative Arena challenge:

| Viewport width | Editor rendered height | Editor width | Results | Page-level horizontal overflow |
|---|---:|---:|---|---|
| 320px | 430px | 232px | Below editor | None detected |
| 390px | 430px | 302px | Below editor | None detected |
| 768px | 480px | 630px | Below editor | None detected |
| 1280px | 600px | 589px | Beside editor | None detected |
| 1440px | 600px | 678px | Beside editor | None detected |

### Tutor Studio
- Refreshed workspace heading, assistant conversation, input controls, learning settings, prompts and resource panels.
- Added a properly labelled vertical section navigator with coloured SVG icons and readable menu labels.
- Added five compact quick-navigation links for phones and tablets so the learning settings remain reachable even when the conversation appears before the full resources sidebar.
- Corrected the legacy public-link selector that underlined the navigation links by applying the navigation exemption class.
- The dropdown and Tutor rendered without horizontal overflow at 390px and 1440px; mobile shortcuts also checked at 768px.

## Build and regression checks

- Ran `npm run verify:deployment` on the packaged source: **PASS** (Node.js 22.16 in this environment; package and `.nvmrc` pin Node.js 24 for Vercel).
- Existing suites cover all 38 routes; auth guards, security, course learning, navigation, 95 registered Arena challenges, 40 executed model queries and Tutor service behavior.
- Added a regression test `tests/navigation-tutor-arena-refinement.mjs` for grouped navigation, Tutor sidebar, responsive editor grid, and Expand editor controls.
- Incremented public service-worker cache identifier to `dalp-public-nav-ide-v25` so returning visitors do not retain older styles.

## Verification limitations

- Browser screenshots are local CSS-only structural renders, not a live authenticated end-to-end workflow or production Vercel deployment.
- The Arena browser editor screenshots use a representative challenge inserted into the page container. Automated challenge tests exercise source challenge logic independently.
- A Vercel **preview deployment** is recommended before production. Verify authentication, Tutor remote provider configuration, service-worker refresh, live practice execution, and physical devices.
- Legacy feature-specific stylesheets are retained where application logic depends on them. The final shared modern styling resolves visual conflicts; this release does **not** represent deleting every historical selector.
