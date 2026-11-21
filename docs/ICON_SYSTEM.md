# DataLearning icon system

Shared outline icon registry: `assets/scripts/icon-system.js`, with sizing in `assets/styles/icon-system.css`.

- Icons use 24×24 viewBox, 1.85 stroke, round linecaps and theme `currentColor`.
- Supported semantic names: code-2, sparkles, target, graduation-cap, book-open, trending-up, check, menu, x, layout-dashboard, award, route.
- Common decorative glyphs in `.za-tool-icon`, `.dl-intro-icon` and `.dl-note-icon` are upgraded automatically.
- Add `<span data-dl-icon="award" aria-hidden="true"></span>` for new decorative icons.
- For functional icon-only buttons, supply a meaningful `aria-label` on the button.
- Existing course logos, brand assets, diagrams and illustrations remain untouched.
- New dynamic content can call `window.DataLearningIcons.refresh()`.
- Avoid replacing instructional mathematical symbols or meaningful text with decorative icons.
