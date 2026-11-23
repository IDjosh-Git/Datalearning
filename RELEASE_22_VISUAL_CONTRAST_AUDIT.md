# Release 22 — Screenshot-driven visual contrast correction

## Confirmed issues
- Public footer rendered light while older stylesheet and later overrides forced light text.
- AI Tutor navigation rendered light while selected controls used light foreground.
- Navigation and footer rules duplicated across legacy and release-specific stylesheets.

## Corrections
- Introduced canonical last-loaded contrast contract for header, dropdowns, footer, selected tabs and controls.
- Replaced legacy light footer background declaration in unified-site-v5.css.
- Removed duplicated Release 21 CSS block from premium-color-system.css.
- Updated HTML pages to load canonical stylesheet after all page-specific CSS.
- Preserved Supabase Admin Appearance brand tokens and semantic error colours.

## Limits
- Visual screenshots are evidence of the old bug; full browser pixel review and production verification remain necessary.
