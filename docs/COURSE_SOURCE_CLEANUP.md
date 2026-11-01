# Course Source Cleanup — 1 November 2026

## Scope

Audited the six primary courses (Introduction, Excel, SQL, Power BI, Python, AI), their twelve roadmap/extension pages, the attached course-player stylesheets and existing tests. Used the latest dark-slate release as the starting point.

## Changes

- Removed **five unused capstone-path style blocks** after verifying that neither the course markup nor application scripts use their selectors.
- Removed **four unused learner-account floating-button style blocks**. Account links remain in the actual navigations where supported.
- Removed **four redundant fixed-position “Learning Portal” links**; the shared header already provides the Dashboard destination, so the links duplicated navigation and could obscure small screens.
- Removed **three repeated “Your learning rhythm” notices** from Excel, SQL and Power BI; the fuller learning-route explanation remains. Did not change lesson content.
- Extracted **1,712 identical stylesheet lines (~101.6 KB)** previously copied into each of four track stylesheets, into one shared responsive/course-content stylesheet. The common presentation layer is now loaded in the same cascade position on Excel, SQL, Power BI, Python and AI.
- Converted repeated large inline course styles into external, reusable foundation CSS. SQL and Python now share a foundation. Certificate and verification styling are reused across the four tracks. Old green foundation colours were updated to dark slate/indigo variants.
- Consolidated adjacent functional stylesheet layers without changing their ordering: the certificate styles follow each track's foundation, and capstone/responsive-heading rules follow the framework. The shared responsive sheet also contains the former final page improvements for the five player tracks. Introduction retains the existing final page-improvements file because its layout is structurally different.
- Left the unique subject lessons, quizzes, datasets, resources, progress sync, access controls and twelve guide pages intact.

## Stylesheet order on the four interactive tracks

1. `access-guard.css`
2. `course-foundation-<track>.css` (general foundation shared by SQL and Python; includes certificate styles)
3. `course-brand.css`
4. `course-framework.css` (includes capstone and responsive header styles)
5. `course-navigation.css`, `course-python-overrides.css` or `course-powerbi-overrides.css` (subject-specific delta)
6. `course-shared-responsiveness.css` (deduplicated shared rules, then final course layout improvements)
7. `design-system.css` (current colour/typography tokens, final cascade layer)

AI uses its subject-specific styles, the shared responsive sheet, and the final design system. Introduction keeps its specialized layout and page-improvements sheet. Roadmaps and extensions retain their two-layer design, without injected inline CSS.

## Preservation checks

- All six course lesson-section counts are unchanged compared with the source ZIP.
- Excel, SQL and Power BI retain **40 lesson cards and 50 quiz questions each**. Python retains **30 quiz questions**; AI retains **50 quiz questions**.
- Existing build, JavaScript lint, navigation, authentication, admin permissions, responsive, learning-content, Arena and Tutor tests pass.
- `tests/course-source-cleanup.mjs` now checks shared styles, absence of duplicate or dead inline/floating styles, and retention of progress/quiz/resource functionality.
- Source-level CSS parsing found no top-level stylesheet errors in the modified course CSS files.

## Not completed

This was a source-level refactor and automated-test pass. No authenticated end-to-end course playthrough, live backend progress-synchronization benchmark, or complete desktop/mobile screenshot comparison was completed. Further removal of large, mixed historical rules in `course-framework.css`, `course-ai.css`, and `course-introduction.css` should be based on rendered CSS coverage and visual regression snapshots, not a blanket deletion: those files still include functional responsive layouts and lesson-specific components.
