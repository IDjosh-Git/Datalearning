# Public theme audit — 1 November 2026

> **Current header colours (1 November 2026):** This earlier theme audit has been supplemented by [`PUBLIC_HEADER_COLOUR_AUDIT.md`](PUBLIC_HEADER_COLOUR_AUDIT.md). Public and course page banners now use coordinated dark surfaces and white/light text; older descriptions of pale headers are historical.


## Objective and scope

Refine the public learning site into a coherent, high-contrast visual system. Replace the previous teal secondary accent with a darker **slate blue** while preserving the indigo primary actions, navy navigation, plain public resource links and public browsing.

Audit scope: **38 HTML pages**, including **28 learner-facing pages** using the common public header, course tracks, roadmaps and curriculum extensions. Sign-in, administrator and utility views retain their specialised navigation and authorisation, but use the same shared design-system stylesheet.

## Final colour palette

| Role | Hex | Usage |
|---|---|---|
| Ink navy | `#15243A` | Header, strong text, dark callouts |
| Indigo | `#3F46D9` | Primary buttons and user actions |
| Indigo hover | `#3035B0` | Hover/active primary actions |
| **Deep slate blue** | **`#29476B`** | Progress, completion labels, icon accents, secondary emphasis |
| Deep slate hover | `#1D3657` | Stronger accent for contrast |
| Slate soft | `#EAF0F8` | Accent icon tiles, selected/completed surfaces |
| Slate border | `#C8D5E6` | Gentle secondary outlines (decorative) |
| Canvas | `#F5F7FB` | Flat page background |
| White | `#FFFFFF` | Readable card and input surfaces |
| Text muted | `#516178` | Secondary body text |
| Standard border | `#D6E0EC` | Card separations |
| Strong control border | `#798BA2` | Form/input visual outlines |
| Keyboard focus (on dark) | `#F7B95B` | High-visibility navigation focus indicator |
| Contact Support | `#101010` | Black support CTA with white text |

Slate blue replaces teal as a **secondary** accent. Status meaning continues to be conveyed with words and accessible indicators, not colour alone. Course category illustrations can retain distinct subject colours.

## Design and shape decisions

- **One shared theme:** `assets/styles/design-system.css` remains the final stylesheet loaded on each HTML page. There is no additional CSS override file.
- **Cards:** Unified 14px corners, quiet shadow, visible but restrained neutral border. Content cards stay; decorative cards around standalone links remain removed.
- **Heroes:** Flat, pale neutral surfaces and 18px hero corners; no decorative glass, gradients or overlays from the shared theme.
- **Buttons and controls:** Consistent 10px control corners, minimum 44px form target height, indigo primary actions, darker form borders.
- **Links:** Standalone public action links and **Open Practice Studio** stay plain, underlined links. They do not regain a coloured pill, nested card or background.
- **Navigation:** One dark public header with consistent labels, keyboard-accessible mobile toggle, highlighted current destination and warm keyboard focus.
- **Help:** Contact Support remains black with white text.
- **Courses:** Progress and completion styling now use deep slate, with explicit completion labels. Course player/lesson functionality and responsive navigation are preserved.
- **Guides and roadmaps:** Older mint/green page styles have been aligned with the current ink/slate/canvas tokens.

## Contrast evidence

Calculated using WCAG relative-luminance ratios. These are **colour-pair/static checks**, not a comprehensive rendered-element WCAG certification.

| Element | Pair | Contrast | Target |
|---|---|---:|---:|
| Body text on canvas | `#15243A` / `#F5F7FB` | 14.55:1 | 4.5:1 |
| Muted text on white | `#516178` / `#FFFFFF` | 6.30:1 | 4.5:1 |
| Primary action text | `#FFFFFF` / `#3F46D9` | 6.80:1 | 4.5:1 |
| Dark slate secondary text | `#29476B` / `#FFFFFF` | 9.51:1 | 4.5:1 |
| Dark slate on soft slate | `#29476B` / `#EAF0F8` | 8.30:1 | 4.5:1 |
| Light brand on navy header | `#E1EAFE` / `#15243A` | 12.93:1 | 4.5:1 |
| Warm focus on navy header | `#F7B95B` / `#15243A` | 8.95:1 | 3:1 |
| Control border on white | `#798BA2` / `#FFFFFF` | 3.48:1 | 3:1 |
| White support text on black | `#FFFFFF` / `#101010` | 19.03:1 | 4.5:1 |

The automated `tests/public-theme-contrast.mjs` check covers shared theme presence, duplicate headers and a wider group of foreground/background combinations.

## Files and architecture

- `assets/styles/design-system.css`: authoritative colour tokens and common component treatments.
- `assets/styles/course-page-improvements.css`: course lesson/portal styling moved to the current neutral/slate palette.
- `assets/styles/course-guide-pages.css`: roadmap and extension layout palette moved to the current neutral/slate palette.
- Other page-specific CSS: historic named accent variables were migrated to the current token without replacing functional course/grid layouts.
- `tests/public-theme-contrast.mjs`: updated to verify new palette values, shape convention and contrast ratios.
- `docs/CURRENT_STYLE_SYSTEM.md`: palette and maintenance guidance updated to match this implementation.

## Verification and limits

Verified on 1 November 2026: **`npm run verify:deployment` passed** (build, lint and full automated test suite). The static tests confirmed 38 HTML pages, 28 shared public headers, 21 accessible colour-pair checks, correct style load order, navigation links and protected administration checks. No database schema, learner progress or authentication rules were modified.

**A rendered desktop/tablet/mobile inspection is still required.** Chromium screenshot capture timed out in this environment. Static tests cannot verify every dynamic colour combination, hover state, viewport or assistive-technology experience. Confirm at 1440px, 768px and 390px, including the library, course player, lesson guide, learner account and authorized admin view.

## Subsequent remaining-route styling audit (1 November 2026)

The site-wide palette was carried through the 15 additional routes that had not received dedicated source-style cleanup (home, catalogue, studio, capstone guide/preview, account/sign-in, admin/review/progress, certificates and diagnostics). Twenty route CSS files were cleaned of 4,337 unused rules and 196 intra-file duplicate rules, removing 817,106 bytes (16.1%). 348 older plum/teal/orange palette occurrences were aligned with the current navy/indigo/slate/coral tokens without adding another global theme. The complete scope, methods, checks and rendering limitations are documented in [`REMAINING_PAGE_STYLE_AUDIT.md`](REMAINING_PAGE_STYLE_AUDIT.md).
