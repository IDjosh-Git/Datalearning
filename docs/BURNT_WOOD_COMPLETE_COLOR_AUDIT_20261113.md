# DataLearning Burnt Wood complete color audit — 13 November 2026

## Scope

Audited the current project source: all 38 HTML pages, 55 CSS modules, JavaScript-rendered UI strings, SVG icons and lesson diagrams. The new automated test (`tests/burnt-wood-complete-source-audit.mjs`) scans 303 text-based interface source files and checks approximately 18,705 explicit hex/RGB color literals against the Burnt Wood palette and its approved accessible warm-neutral surface colors. It is included in `npm test` through `test:academy`.

## Results

No unapproved legacy hex, RGB, RGBA, or HSL color literals remain in the audited interface text. Legacy variable *names* such as `--mint`, `--orange`, `--ambient-indigo`, and classes such as `.button.blue` still exist for backward compatibility; their values are now mapped to the current palette. Renaming them without a full selector migration would risk breaking app behavior and is not necessary to remove their previous colors.

The palette is Charcoal `#0B0909`, Midnight Blue `#023048`, Burnt Red `#770101`, Warm Ivory `#F0EDDE`, Copper `#C58A69`, and Soft Sand `#D9BFA4`. Warm neutrals, white, and black are retained for accessibility, readable data tables, borders, and shadows.

## Boundaries

This audit does not claim that every raster pixel is recolored. The Excel Week 1 educational interface PNG deliberately depicts a familiar spreadsheet UI and may contain application-specific interface colors. Third-party embedded widgets, browser chrome, dynamically fetched assets, and live authenticated page states are not exhaustively visual-tested. A live deployment and authenticated mobile/desktop review remain necessary to verify production appearance and caching.
