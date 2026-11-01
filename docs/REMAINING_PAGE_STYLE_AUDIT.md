# Remaining page and route-style audit

**Date:** 1 November 2026  
**Baseline:** `Data_Analysis_Learning_Path_Feature_Cleanup.zip`  
**Scope:** 15 previously unaudited routes and their 20 route-specific CSS files. This completes a targeted CSS review across the current 38-page project when combined with the earlier course, library, practice, tutor, and Q&A audits. It does **not** constitute complete visual or behavioural certification of every state.

## Pages reviewed

| Area | Pages | Maintained styling |
|---|---|---|
| Entry and discovery | Home, course catalogue | Hero, course grid, filter controls and quick links |
| Learning tools | Practice Studio, Capstone Studio, capstone guide, sample preview | Studio tools, submission workflow, preview lesson hierarchy |
| Identity and learner account | Sign-in/registration, account | Accessible form fields, progress, protected controls |
| Staff operations | Admin dashboard, instructor progress, Review Desk | Tables, filters, analytics, result states and protected views |
| Certificates | Certificate viewer, public verification | Validation and certificate layout |
| Diagnostics | Connection Test, Sync Test | Status panels, diagnostics and error reporting |

## Changes

- Removed selectors that cannot match any HTML or runtime JS-generated class/ID in the shipped project, retaining complex selectors (`:not`, `:has`, `:is`, `:where`, attribute selectors and escaped class names) conservatively.
- Removed **exact duplicate declarations within the same CSS rule context**, retaining the later occurrence to preserve ordinary CSS precedence. Did not indiscriminately delete shared rules from other route stylesheets; some still have dependencies or different cascade positions.
- Cleaned unused selectors inside responsive media queries without deleting working breakpoints or interactive state selectors.
- Updated older action accents to the **current deep navy (`#15243A`), indigo (`#3F46D9`), slate (`#29476B`) and coral (`#B54F38`) palette**. Old magenta, teal and lower-contrast bright orange presentation values in these 20 CSS files were replaced; existing subject-specific Excel/SQL/Power BI colours and status semantics were deliberately preserved.
- Kept the **existing** `assets/styles/design-system.css` as the final shared theme on all 38 pages. No extra global override file was created.
- Preserved authentication/authorization logic, progress and analytics scripts, certificate verification, navigation, quizzes, and other runtime functionality. No database operation or migration was performed.
- Added `tests/remaining-page-style-audit.mjs` to the existing responsive verification script to guard route stylesheet references, core layout hooks, theme tokens, access integration, and legacy palette regressions.

## Quantitative results

| Measure | Before | After |
|---|---:|---:|
| 20 audited CSS files | 5,083,893 bytes | 4,266,787 bytes |
| Bytes removed | | **817,106 bytes (16.1%)** |
| Orphan rules removed | | **4,337** |
| Additional unused selectors removed from grouped rules | | **1,108** |
| Exact duplicate rules removed | | **196** |
| Older palette occurrences aligned | | **348** |

For file-by-file statistics, see `docs/remaining-css-cleanup-data.json`.

## Verification and outstanding items

- `npm run verify:deployment`: build, lint, responsive, learning, navigation, authentication, authorization, admin, practice and AI Tutor suites **passed**.
- Stylesheets: all 20 modified CSS files were independently parsed with `tinycss2`, without top-level CSS parse errors.
- The shared theme continues to be linked last and once per HTML page.
- **Not verified visually:** desktop (1440px), tablet (768px), phone (390px) and authenticated admin-browser rendering. Chromium refuses navigation to local URLs in the available test environment (`net::ERR_BLOCKED_BY_ADMINISTRATOR`), so no screenshots or actual browser-computed contrast results were obtained.
- The remaining CSS includes intentionally retained legacy selectors that still occur in HTML or JavaScript, even if similar rules exist in another file. Removing those wholesale without visual comparison would risk changing specificity, responsive layout and interactive component states.

## Next production check

After deployment, review the home/course catalogue, account/sign-in, Practice Studio, Capstone Studio, certificate verification, and the authorized admin/progress/review views at 390px, 768px and 1440px. Check form focus, table scrolling, hero copy contrast, status states and navigation visibility before promotion.
