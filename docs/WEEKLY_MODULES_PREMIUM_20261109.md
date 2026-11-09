# DataLearning — Premium Weekly Module Curriculum (9 November 2026)

## Overview

The **Courses** catalogue (`catalog.html`) now has a responsive curriculum browser that displays the real, existing content from `assets/scripts/catalog-data.js`. Select one of six courses and browse its modules through three progressive phases. The visitor can open any lesson or its dedicated question page directly.

- Data analysis introductory path: **8 foundation lessons** followed by the **existing final knowledge check** (no fabricated weekly quizzes).
- Excel, SQL, Power BI, Python and AI Integration: **10 weeks each**, with their existing titles, learning outcomes, lesson destinations and separate weekly questions.
- Module pages remain editable through the original source; the browser does not duplicate quiz banks or change lesson-completion rules.
- All six course pages include an expandable week/lesson navigator, closed by default to avoid distracting learners from the active lesson. Desktop and mobile sidebars remain intact.
- A responsive three-phase visual structure and accessible buttons support small phones, tablets, laptops and widescreen displays. Modules switch on the page without navigation; internal links navigate to the existing course and quiz pages.
- The browser reads locally stored progress **only when a signed-in account is known**. It does not write to progress records or award credit automatically.

### Files updated

- `catalog.html`: weekly module browser, course selector, and clearer course headings.
- `courses/{introduction,excel,sql,powerbi,python,ai}.html`: compact expandable course module navigation.
- `assets/scripts/course-module-explorer.js`: one shared data-driven browser and course navigator.
- `assets/styles/premium-unified.css`: premium responsive curriculum layout and mobile styles.
- `tests/weekly-module-catalog-contract.mjs` and `package.json`: canonical data, links, and responsive regression checks.

### Verification and limitation

The reference URL supplied for the design returned HTTP **401 Unauthorized**, so the interface could not be inspected or reproduced precisely. The update follows the requested weekly-module organization in DataLearning's existing design language and preserves real course content.

Static project verification, automated tests, and isolated browser tests at 320, 390, 768 and 1440 pixels were run. The isolated browser tests checked all six course selectors, module counts, lesson and quiz links, and page-width overflow. Visual screenshots are representative isolated module-layout previews rather than final production-site screenshots. Test the deployed site before publishing to learners.
