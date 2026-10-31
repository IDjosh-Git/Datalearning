# Data Analysis Learning Path — Site-Wide Colour Audit & Fix v89

**Baseline:** Curriculum v88. **Scope:** existing static HTML/CSS/JavaScript, all 25 HTML routes, six course pages, Practice Arena, Tutor Studio, learner and administrator interfaces, reference and prompt libraries, capstone, auth and certificate routes. **Deployment:** source update only; nothing was deployed to datalearning.vercel.app.

## 1. Before the change — inventory and root causes

| Inventory | v88 baseline |
|---|---:|
| CSS stylesheets in `assets/` | 124 |
| Literal CSS colour expressions (hex/rgb/hsl regex, including repeats and decorative overlays) | 3,463 |
| Unique literal CSS expressions (not canonicalised) | ~2,384 |
| HTML routes | 25 |

Common pre-existing literal colours include `#fff`, `#ffffff`, `#F27329` (original brand orange), `#254559` (original brand navy), `#f8fafc`, `#0f172a`, `#2563eb`, `#713a55`, and `#087d73`. They were assigned different roles by independently authored theme layers.

**Confirmed conflicts:**
1. `assets/brand-overrides.css` used `!important` on `--surface:#ffffff` and related roots, which kept Excel/SQL/Power BI/Python teaching cards white under dark mode.
2. Seven old CSS files were linked **after the end of `<head>`** on each of six course routes and after the v86 palette, inadvertently overriding the shared tokens.
3. `assets/course-layout-theme-v57.css` duplicated two hard-coded light/dark palette blocks; `capstone-theme-visibility-v62.css` held a separate contradictory set of role colours.
4. Some navigation links inherited pale text intended for a dark header although the header was porcelain white; another conflict appeared in the mobile drawer.
5. The prompt library had its own mostly blue/violet palette for its nav, cards, filters and copy buttons, with weak alignment to the global action semantics.
6. Admin feedback notices applied hard-coded success/error colours in JS instead of receiving semantic status classes.
7. Some utility links, focus rings and floating calls to action used fixed colours, bypassing the saved/system theme.

## 2. Central palette and design roles

**One source of literal token values:** `assets/color-system-v86.css`. The new `assets/color-consistency-v89.css` contains **no literal colour definitions** and only maps old component classes to those semantic tokens. On each route the palette and v89 bridge are the last two stylesheets, so older layers cannot override them.

| Role | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `#F8F9F6` | `#0E1724` | Page canvas |
| `--surface` | `#FFFFFF` | `#192636` | Standard panels and lessons |
| `--surface-alt` | `#E9F0EE` | `#233447` | Nested panels, table headers |
| `--surface-raised` | `#FFFFFF` | `#202F42` | Floating/raised components |
| `--text-main` | `#16283B` | `#EAF1F4` | Primary text |
| `--text-muted` | `#506477` | `#B2C2CE` | Secondary text |
| `--border-subtle` | `#CFDAD7` | `#45596B` | Dividers and card borders |
| `--primary` | `#0C7168` | `#58C4B4` | Main actions, selection, progress |
| `--primary-hover` | `#07564F` | `#83DACA` | Hovered action |
| `--on-primary` | `#FFFFFF` | `#09251F` | Action label |
| `--focus-ring` | `#095E91` | `#9BDCF4` | Keyboard focus |
| `--positive` | `#176C4B` | `#81D8A9` | Passed / success |
| `--warning-text` | `#855B10` | `#F4CE7E` | Attention required |
| `--danger` | `#A62C39` | `#FFAAA8` | Error / rejected |
| `--info` | `#215F93` | `#A6D0FF` | Informational messages |

**Learning identities:** Foundations terracotta, Excel green, SQL blue, Power BI gold, Python indigo, and AI violet retain separate `--track-*` tokens and visible text labels. Action buttons stay teal across subjects.

**Charts:** six separate light/dark series roles (`--chart-1` through `--chart-6`) plus axis and grid tokens were added to the main palette. All six series meet at least 3:1 against the corresponding chart surface in both themes. Existing chart widgets can consume these; third-party or dynamically generated charts must still be inspected in staging.

## 3. Implemented corrections

- Normalised shared navigation, course/map panels, course quizzes, progress bars, primary/secondary buttons, form fields, table heads/cells, code examples, Tutor messages, Practice Arena editors, prompts, notices, admin cards, capstone upload panels and modals using existing semantic tokens.
- Removed the `!important` legacy root palette responsible for white course cards in dark mode, while retaining original navy/orange logo and hero-brand treatments.
- Replaced duplicate v57 course colours with aliases and consolidated the v62 capstone palette into semantic roles; retained responsive layout rules.
- Moved 42 late stylesheet tags (seven on each of six courses) into `<head>`, ahead of the shared palette, without changing routes or lesson content.
- Corrected desktop navigation text and mobile drawer foreground/background pairings. Normalised prompt-library copy actions and focus styles.
- Replaced JavaScript-set admin notice colours with `is-success` / `is-error` CSS classes. Updated a few presentation-only inline colours to variables.
- Preserved certificate artwork and download/print colours. No course, scoring, login, grading, tutor API or capstone workflow logic was changed.
- Added `npm run test:colour:v89` for reproducible colour-architecture checks.

## 4. Verification completed

| Check | Result | Evidence / caveat |
|---|---|---|
| All 25 HTML routes have palette + v89 bridge after legacy CSS | PASS | `tests/color-consistency-v89.mjs` |
| Legacy root conflicts and out-of-head course stylesheets | PASS | static audit and browser computed styles |
| 36 original palette WCAG AA text pairs | PASS | `tests/color-system-v86.mjs` |
| 32 new token and chart graphical/text contrast pairs | PASS | `tests/color-consistency-v89.mjs` |
| Original high-contrast theme tests | PASS | `tests/theme-semantic-contrast-v67.mjs` |
| Isolated computed-style render of 25 routes, light/desktop + dark/mobile | PASS | 50 scenarios; latest 386 opaque pairs; two flags involved decorative chart bars **without text** |
| Complementary dark/desktop + light/mobile route render | PARTIAL FINAL RECHECK | An earlier full 50-scenario pass completed; the final expanded-selector rerun timed out after initial routes. A later mobile drawer fix was visually and computed-style checked on representative routes. |
| Horizontal page overflow in initial 100 combinations | PASS | No page-level overflow at 390px or 1440px in the isolated render |
| Six isolated layout screenshots | REVIEWED | `qa-evidence/v89/`; static HTML/CSS render without account scripts or real image loads |
| Core application, Tutor, Practice Arena, course, experience, responsive and deployment regressions | PASS | Existing npm scripts; see project tests |
| System preference and saved theme choice | EXISTING MECHANISM VERIFIED BY SOURCE TESTS | Theme prepaint precedes CSS; three-way control and storage key unchanged; production first frame not measured |
| Live authenticated and stateful UI, dynamic charts, screen-reader traversal | NOT VERIFIED | Requires deployed staging with test accounts and real browser/devices |

**Note on contrast methodology:** measured foreground/background pairs are sampled computed values. The check does not replace automated or manual WCAG audits of every dynamically created element, transparent layered surface, chart tooltip, image or focus state. The two short-lived `<4.5:1` flags on `.lp-demo-bar` are not failures of text contrast because the bars contain no text. Chart series have separate graphical contrast checks.

## 5. Remaining literal colours — intentional and unresolved

The total literal CSS expressions fell from **3,463 to 3,426**, not to zero. Many remain in earlier stylesheets because the project has 125 layered CSS files and hundreds of embedded or generated style declarations. The final active UI colours for audited component types are now governed by the shared semantic palette, but wholesale deletion of old rules would be unsafe without component-by-component regression testing.

**Intentional exceptions:** original navy/orange brand artwork and logo treatments, decorative illustrations, occasional course-identity accents, the dark visual in the prompt-library hero, syntax highlighting, modal scrims, certificate SVG/print/export colours, and chart series. These have meaning beyond a generic surface or button colour.

**Still to inspect in a real deployment:** chart tooltips/legends, dynamically created quiz explanations, all Arena editor runtime overlays and hover/selection states, Supabase authentication screens and async errors, all tutor-generated Markdown/code blocks, admin data tables with real records, capstone review states, third-party embedded assets, OS forced-colours and screen-reader navigation. Avoid removing more legacy CSS until those states have been seen.

## 6. Release and deployment

This is a **source-only v89 candidate**. Deploy to a Vercel preview, sign in as learner and instructor, and check the full learning flow in Light, Dark, and System preference on a narrow phone and desktop before promoting. Verify that the external Google Fonts and embedded course imagery load correctly, that no CSS overrides arrive after the palette, and that real interactive states retain readable contrast. No existing functional route or lesson content was intentionally changed.
