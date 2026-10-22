# Version 18.0 — Fast theme switching and unique course branding

## Fixes

1. **Power BI duplicated subject icon:** Removed the second identical `icon-powerbi.svg` from the course top toolbar. Verified each Excel, SQL and Power BI toolbar now contains exactly one subject icon.
2. **Repeated platform brand in subject sidebars:** Removed the redundant Data Analysis Learning Path image from Excel, SQL and Power BI sidebars. The global learning header remains the single platform logo while the sidebar retains the subject title and progress.
3. **Slow light/dark switching:** Apply theme state synchronously in the click handler and defer preference storage to the next task. Remove unnecessary surface/text-color transitions across large lesson/quiz/assessment component trees while preserving standard hover, drawer and progress behavior.
4. **Caching:** Versioned the revised theme controller at `20261022.18` and loaded the new `theme-speed-brand-v18.css` as the last stylesheet across all 22 pages.
5. **Testing:** Added `tests/theme-brand-v18.mjs` to assert unique subject icons, absence of duplicate platform branding in three sidebar-based subjects, and the latest controller/CSS assets on every page. Preserved existing learner authentication, courses, mastery assessments and administrator access.

## Browser checks

- 5 courses: Introduction, Excel, SQL, Power BI, AI Integration.
- 6 viewport widths: 320, 390, 768, 1024, 1440, 2560 pixels.
- 30 isolated Chromium scenarios: 30/30 theme switches to dark and 30/30 switches back to light. No page-wide horizontal overflow detected.
- Source-level check found and fixed one actual pair of adjacent identical Power BI icons.
- All existing `npm` regression scripts passed, including server authorization and v17 course assessments.

## Limitations / deployment

Automated page runs use isolated browser fixtures to avoid making a real learner login or sending data to external services. They do not represent an end-to-end verified deployment on actual phones or tablets. Deploy the complete v18 folder as one release; do not mix it with earlier versions. Clear cached site assets or force refresh after deployment if old UI remains.
