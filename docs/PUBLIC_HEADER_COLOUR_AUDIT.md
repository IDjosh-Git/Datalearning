# Public and Course Header Colour Audit

**Date:** 1 November 2026  
**Baseline:** `Data_Analysis_Learning_Path_Unified_Public_Footer.zip`  
**Scope:** 31 public/course routes: 13 public entry points, six course players and 12 support pages. Protected staff and learner records retain their original authorization.

## Findings and changes

- Retired the earlier shared CSS rules forcing pale lavender hero backgrounds and dark hero headings.
- Applied a single `dalp-themed-hero` class to each public/course main banner, with one of six coordinated deep colours selected through `data-dalp-header-tone` on each page.
- Kept the eight-link public masthead consistent in deep navy (`#13243B`), with white/light links, distinct hover/active states, keyboard focus and the existing mobile menu.
- Changed the course player's compact topbar and course week headings from white/pale backgrounds to dark slate with white headings and distinct section borders.
- Made contextual sign-in, verification and preview headers dark with light text.
- Retained light content cards, questions, forms and progress panels so ordinary course reading remains comfortable.
- Kept backgrounds flat (no gradients or decorative overlays) and made header links accessible light, underlined text rather than background-filled resource buttons.
- Updated the service-worker cache name to refresh older public assets after deployment. No routes, lesson content, access control or progress logic changed.

## Palette and text contrast

**WCAG normal-text target:** at least 4.5:1. Values are calculated against flat backgrounds; actual rendered states still require browser inspection.

| Surface | Background | White text contrast | Soft-white text contrast |
|---|---|---:|---:|
| Ink blue | `#203A57` | 11.64:1 | 9.57:1 |
| Deep navy | `#263D5D` | 11.01:1 | 9.05:1 |
| Indigo | `#303561` | 11.62:1 | 9.55:1 |
| Dark slate | `#29476B` | 9.51:1 | 7.82:1 |
| Muted plum | `#3B365C` | 11.24:1 | 9.24:1 |
| Ink slate | `#29374E` | 11.99:1 | 9.86:1 |
| Navigation | `#13243B` | 15.63:1 | 12.86:1 |
| Week section | `#355474` | 7.86:1 | 6.46:1 |

Header headings: `#FFFFFF`; supporting text: `#E0EAF6`; resource links: `#DCEAFF`; eyebrow labels and focus accents: `#FFE0A1`. All these pairs meet the 4.5:1 minimum against the six banner colours.

## Route-to-colour mapping

- Ink blue: homepage, preview and selected Python guide pages.
- Deep navy: catalogue, Reference Library, Learning Lab and Introduction guides.
- Indigo: AI Tutor, AI Prompt Library, AI course and selected SQL guides.
- Dark slate: Practice Arena, Practice Studio, Excel, SQL, Power BI and Python course players.
- Muted plum: Capstone Studio, capstone guide and selected AI/Power BI guides.
- Ink slate: sign-in and verification.

## Verification

- `npm run verify:deployment` — passed: build, lint, full feature and authorization tests.
- `node tests/public-header-surfaces.mjs` — passed: 31 page headers, unique hero surfaces, six colour pairs, 4.5:1 contrast, removal of obsolete pale banner rule and service-worker version.
- Existing navigation, responsive-source, footer and course lesson tests — passed.
- **Remaining:** Headless Chromium timed out when loading local pages. A live screenshot review at desktop (1440px), tablet (768px) and mobile (390px) is still needed. Static CSS checks alone cannot certify every nested widget's computed colour.

## Maintenance

Continue to use the existing `assets/styles/design-system.css` as the final shared styling layer; don't add a new override stylesheet. Adjust the `data-dalp-header-tone` value and shared palette token to change a route's header. Course and feature stylesheets continue to own their layouts, but no longer own the final public header background.
