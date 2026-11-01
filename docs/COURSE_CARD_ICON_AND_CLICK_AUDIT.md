# Course card icon and click audit — 1 November 2026

## Scope
Learn catalogue (`catalog.html`), homepage (`index.html`), returning-learner workspace (`assets/scripts/learner-home.js`), shared icon assets, and the Continue Learning banner.

## Fixes
- Replaced embedded SVG clones on the six Learn catalogue and six homepage course cards with the existing single-source vector files under `assets/icons/icon-{intro,excel,sql,powerbi,python,ai}.svg`. Explicit dimensions, alt text and responsive rules prevent distorted or missing icons.
- Removed the duplicated icon SVG object literal from the dynamically rendered returning-learner dashboard; its six learning path cards now use the same local icon assets.
- Added card-surface click handling on both the catalogue and homepage. Clicks on other links, inputs, controls, user-selected text, or modified clicks are excluded. Visible ordinary anchors remain keyboard-operable.
- Set the dynamic Continue Learning title and metadata to high-contrast light text on a dark navy panel (`#203A57`); the fallback resume banner uses matching colours.
- Retained the separate Practice Studio destinations and existing progress logic.
- Advanced the public service-worker cache name to refresh the changed CSS and scripts.

## Verification
- `npm run build`, `npm run lint`, `npm test`: all passed.
- Six SVG icons visible on each page at 360px, 768px and 1280px in rendered inline-asset previews; no page-level horizontal overflow.
- Returning-learner resume-title computed colour: white on `rgb(32, 58, 87)` background at all three widths.
- Added `tests/course-icons-and-clickable-cards.mjs` to the learning regression suite.

## Runtime limitation
Direct local URL navigation in Chromium was blocked by the environment, so end-to-end click navigation on a deployed server and signed-in returning-learner data remain to be verified there. Rendered CSS and assets were verified by embedding local assets in a browser preview.
