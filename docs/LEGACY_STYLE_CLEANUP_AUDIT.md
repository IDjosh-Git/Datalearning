# Website-wide legacy styling cleanup audit

**Audit baseline:** `Data_Analysis_Learning_Path_Responsive_Light_Theme.zip`  
**Scope:** 38 HTML routes, 43 referenced stylesheets, shared/public/course/account/admin styling, responsive rules and stylesheet cache.

## Cleanup implemented

1. Parsed all 43 CSS assets and removed selectors whose class/ID tokens could not be found in the site's HTML and application JavaScript. The pruning was conservative for dynamic class-name prefixes and selector-list pseudo classes (`:is`, `:where`, `:has`, `:not`).
2. Performed a second pass within each stylesheet's actual HTML consumers to remove old page-specific rules written for unrelated routes. Rules for script-generated elements and shared components were preserved.
3. Removed retired font references to DM Sans, Manrope, Poppins and Montserrat. The maintained shared design system loads Inter, with accessible system-font fallbacks; editor monospace fonts remain unchanged.
4. Replaced 353 occurrences of outdated brand colours (plum, pink, orange and former navy surfaces) with the current indigo, dark-slate, coral and neutral palette. Updated 3 semitransparent variants of the old orange.
5. Removed 253 obsolete `backdrop-filter` or `-webkit-backdrop-filter` declarations that created decorative glass effects. Functional drawer/dialog backdrops were preserved.
6. Moved six HTML `<style>` blocks into five existing maintained CSS assets; deduplicated the same capstone panel styling previously embedded in both the homepage and Capstone Studio.
7. Removed 26 redundant inline `<html style="color-scheme: light">` declarations; the shared design system still specifies light-mode rendering.
8. Updated the service-worker public cache key to `dalp-public-style-hygiene-v5` to prevent earlier cached stylesheets from persisting.
9. Added a `legacy-style-cleanup.mjs` regression check to the existing responsive test suite, verifying consistent stylesheet registration and disallowing the retired font names, palette, glass effects, and new embedded `<style>` blocks.

## Measured source reduction

| Measure | Value |
|---|---:|
| Original CSS bytes | 6,860,721 |
| CSS bytes after cleanup | 5,548,352 |
| Net CSS reduction | 1,312,369 bytes (19.1%) |
| Rules removed by global token checks | 2,998 |
| Rules removed by page-scoped checks | 9,926 |
| Total clearly unused rules removed | 12,924 |
| Additional unreferenced selector branches removed globally | 826 |
| Registered stylesheets still in active use | 43 |
| Parsed CSS syntax errors | 0 |

## Responsive inspection

We rendered static page markup with all linked local stylesheets embedded into an isolated headless Chromium preview. We did **not** execute page application scripts in these previews, because direct navigation to the local site is blocked in the test environment. This inspects layout and CSS rules, but does not prove dynamic interactions or authenticated states.

| Width | Unique routes checked | Page-level horizontal overflow |
|---|---:|---:|
| 360px (narrow phone) | 38 | 0 |
| 768px (tablet) | 23 | 0 |
| 1280px (desktop) | 22 | 0 |

Some course outlines intentionally sit off-canvas when collapsed; long code examples and tables use internally scrollable containers. These do not create document-level horizontal scrolling.

## Regression verification

- `npm run build` — passed
- `npm run lint` — passed
- `npm test` — passed, including security, learning, navigation, responsive, Practice Arena and AI Tutor checks
- CSS parsing — 0 top-level errors
- All 38 HTML pages still reference exactly one current design-system CSS entry; all 43 CSS files are actively referenced

## Remaining constraints and safe boundaries

The audit removes **detectably obsolete** styling, not every historical line that may still be used by interactive components. The 43 retained stylesheets contain active page, course player, authentication and admin component rules. Deleting all of them or replacing every declaration wholesale would be unsafe without complete interactive, authenticated browser testing. `style` attributes that set dynamic progress widths and chart heights were also retained.

For a production release, verify the signed-out public pages, signed-in learner page, authenticated admin workflows, course drawer and dialogs on physical phones/tablets and desktop browsers. Production data, access control policies and course scripts have not been modified by this cleanup.
