# Course Outline Button Contrast Audit — 2 November 2026

Source: `Data_Analysis_Learning_Path_AI_Workspace_Spacing_Outline_Fixed.zip`.

## Change

- Fixed text/background color coupling on the course sidebar **Hide course outline / Show course outline** toggle for Excel, SQL, Power BI, and Python.
- Expanded state: white text over deep indigo gradient. Collapsed state: white text over deep teal gradient. Hover states use darker matching gradients, preventing identical or near-identical label/background colors.
- Added explicit `color` and `-webkit-text-fill-color` declarations with scoped specificity to override older course button rules, as well as a visible gold keyboard-focus outline.
- The lesson list disclosure's light surfaces retain dark, readable labels in closed/open and hover states.
- Maintained the existing expand/collapse JavaScript and responsive layout, without modifying lesson content, links, learning progress, authentication, or database code.

## Checks

- Minimum white-on-gradient endpoint contrast: **8.28:1** (WCAG AAA for standard-size text).
- Headless Chromium computed-style and click/hover checks: **8 combinations** (four courses × light/dark). All passed.
- Full `npm test` suite: passed, including new `course-outline-contrast.mjs` regression coverage and original site tests.

No production browser deployment or live data connection was used for this source-level correction.
