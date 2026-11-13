# Burnt Wood CSS source modernization — 13 November 2026

## What changed

The previous release had the correct palette but repeated literal color values thousands of times across component CSS. This release replaces 5,000+ such usages with canonical `var(--bw-*)` tokens, defined in `assets/styles/burnt-wood-theme.css`. The six canonical tokens are charcoal, midnight, burgundy, ivory, copper and sand. The theme stylesheet remains loaded on all pages after component CSS.

Seven existing CSS files retain a small number of explicit values because they have established component-level contract tests that verify those declarations: `private-premium-rebuild.css`, `private-experience-v3.css`, `course-discovery-grid-premium.css`, `admin-unified-premium.css`, `practice-arena-premium-final.css`, `account.css`, `ten-week-masterclass.css`, and `private-workspace.css` (eight files). Their values are already from the current Burnt Wood palette, not retired colors.

Legacy variable *names* (such as `--mint` or `--brand-orange`) remain as compatibility aliases for existing JS and older components; they resolve to current theme colors. Renaming them without a full dependency migration would risk breaking the app.

## Validation

- Full `npm test` regression suite.
- New `tests/burnt-wood-css-tokens.mjs` checks token definitions and all CSS variable references.
- Parsed all 55 stylesheets using `tinycss2` with zero top-level syntax errors.
- No live deployment or authenticated browser session performed.

## Future changes

Change the six canonical `--bw-*` values in the Burnt Wood theme to update the refactored components; keep contrast and semantic status colors accessible. Update remaining compatibility aliases gradually, with component tests.
