# Learning libraries — premium responsive update (5 November 2026)

- Learning Lab: 1620px shell and four-column full practice library on large desktops, three at medium sizes, two on tablets and one on phones.
- AI Prompt Library: matching four-column card grid, improved prompt copy/favourite cards and larger filter controls.
- Reference Library: three-column desktop example grid, two on tablets, one on phones.
- Layout and style overrides are scoped to these pages in the existing last-loaded `assets/styles/premium-unified.css`. No new CSS dependency.
- Original card generation, prompt copying, lesson review grading, search/filter actions, saved state and accessibility semantics are unchanged.
- Not yet published to production; deploy full package to update the live Vercel site.

- Accordion interaction correction: each expanded practice or prompt card grows **independently**; adjacent cards retain natural height (no `align-items:stretch` or full-height grid items).
- CSS grid still reserves the height of the tallest card in a row before the following row; this preserves keyboard reading order and stable course sorting.
