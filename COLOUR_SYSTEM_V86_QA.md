# Colour System v86 — Design specification and QA

## Scope and audit

Built on the v85 Data Analysis Learning Path project. No rebuild, new dependencies, API changes, renamed routes, content deletion, grading changes, or new account storage. All 25 existing HTML routes now include `assets/color-system-v86.css?v=86` as their final external stylesheet. The file maps legacy page tokens onto one set of semantic decisions.

**Problems found:** multiple historical purple/indigo/berry colour overrides, inconsistent first-load themes on four legacy pages, muted text/track status colours that lacked a shared contract, vivid animated ambient colour competing with long lessons, and progress/buttons/editor surfaces using different aliases across course pages and Practice Arena.

The site's existing course iconography and berry/plum brand heritage are retained. Plum is reserved for subtle brand identity rather than primary actions. Teal is the primary action and progress colour; track accents are only descriptive cues, alongside actual course names and statuses. Certificates keep their white, print-safe document design and their existing track-specific accreditation-free presentation.

## Authoritative named tokens

| Semantic token | Light | Dark | Intended use |
| --- | --- | --- | --- |
| `--background` | `#F8F9F6` | `#0E1724` | Warm porcelain/ink canvas |
| `--surface` | `#FFFFFF` | `#192636` | Lesson, course, dashboard and modal cards |
| `--surface-raised` | `#FFFFFF` | `#202F42` | Elevated surfaces |
| `--surface-alt` | `#E9F0EE` | `#233447` | Nested content panels and table headers |
| `--text-main` | `#16283B` | `#EAF1F4` | Readable headings and long-form content |
| `--text-muted` | `#506477` | `#B2C2CE` | Descriptions, labels and secondary data |
| `--primary` | `#0C7168` | `#58C4B4` | Links, actions, selection and progress |
| `--primary-hover` | `#07564F` | `#83DACA` | Hover/interactive emphasis |
| `--on-primary` | `#FFFFFF` | `#09251F` | Text on teal-filled controls |
| `--focus-ring` | `#095E91` | `#9BDCF4` | Visible keyboard focus |
| `--positive` | `#176C4B` | `#81D8A9` | Success and passed state |
| `--warning-text` | `#855B10` | `#F4CE7E` | Warning and needs-revision state |
| `--danger` | `#A62C39` | `#FFAAA8` | Error and failed state |
| `--info` | `#215F93` | `#A6D0FF` | Informational state |
| `--brand-heritage` | `#713A55` | `#D7A3C0` | Small legacy brand details |
| `--editor-background` | `#F4F7F6` | `#111F2C` | Code input |
| `--code-background` | `#162638` | `#0C1825` | Code blocks and worked-answer previews |

All these tokens have semantic hover, border, disabled, state, and editor/code aliases as needed. The course accents are Foundations `#994B37` / `#F3B49F`, Excel `#186844` / `#8BDCB3`, SQL `#235F9A` / `#9DCCFC`, Power BI `#8B6110` / `#F2D48B`, Python `#5748A0` / `#C2B0FF`, and AI `#794595` / `#DDA9F6` (light / dark respectively).

## Implementation

- One final stylesheet: `assets/color-system-v86.css`, mapped to the existing `--le-*`, `--course-*`, `--arena85-*`, `--data-*`, `--app-*`, `--editor-*`, layout and legacy alias sets. It styles the homepage, six learning tracks, Practice Arena, capstone track selection, tutor, reference library, administration and learner dashboard.
- Track identity is visible as labels or borders alongside text, not through colour alone. Buttons, course progress bars, selected navigation and grading statuses reuse the same semantic tokens.
- Reduced intense animated cyan/violet glows to subtle static ambient lighting, with a no-motion fallback. Existing navigation/layout and working JS remain intact.
- Fixed four older inline theme scripts that overrode saved/system preferences after first paint; preserved the early authentication cover. Updated `theme-control-v14.js` to adjust the mobile/browser chrome theme colour to match the new canvas.
- First-paint error fallbacks now respect the operating system theme even if browser storage is unavailable.
- Legacy generated achievement certificates are deliberately excluded from dark colour inversions to keep print/PDF output readable and consistent.

## Verification

| Test | Result |
| --- | --- |
| `npm test` (application, auth, role, content, progress) | PASS |
| `npm run test:responsive` | PASS |
| `npm run test:experience` | PASS |
| `npm run test:arena:v85` | PASS |
| `npm run verify:deployment` | PASS |
| `npm run test:theme:contrast` (existing v65 contract) | PASS |
| `npm run test:colour:v86` | PASS — 25 pages, 36 AA contrast pairs, five theme-bootstrapping scenarios |
| Isolated Chromium CSS cascade at 390 and 1440 px | No horizontal page overflow in 9 inspected combinations; expected primary token and canvas computed in both modes |

**Contrast:** All **36 sampled foreground/background pairs** (18 in light, 18 in dark) tested at >=4.5:1. Core text and primary control contrasts range from 5.29:1 to 15.76:1. The tests cover body/surface/muted, hover-filled buttons, focus, positive/warning/danger/info and each course accent. This is a token-pair audit, not an exhaustive rendered-page WCAG certification.

### Limitations / pre-production checks

1. Local file URLs were blocked by the browser environment. Screens were separately constructed from original HTML + all linked CSS using an isolated Chromium harness with scripts removed; this verifies CSS layout/cascade but not real authenticated navigation, dynamically generated charts, or keyboard screen-reader interaction on the deployed app.
2. The Arena runtime, SQL.js, Pyodide worker, Supabase-backed pages and tutor API were not re-executed inside a real authenticated deployment. Their existing source and tests remain intact. The Practice Arena continues to use local device storage for drafts and passed-challenge state.
3. Several legacy decorative assets (SVGs, original course logos, graphics) retain their authored brand colours. Full colour/contrast auditing of every third-party SVG/icon, temporary toast and dynamically generated result is still recommended on a staged deployment.
4. On staging, visually verify the homepage, courses, learning dashboard, Practice Arena editor and outputs, reference search, tutor, account, capstone status, modal dialogs, tooltips, certificates and form validation across Light, Dark, and System. Use a keyboard and screen reader; include mobile 320/390/768 and desktop 1440 px. Check console warnings and WCAG contrast with dynamic content and icon assets loaded. Reconfirm saved explicit theme preference after reload and across tabs.
5. No production deployment has been performed. `https://datalearning.vercel.app/` was viewed for context, but this ZIP does not change the deployed site.
