# Practice Arena and Compact Excel Lab — 10 November 2026

## Learner-facing changes
- Practice Arena and the complementary Practice Studio use the shared premium Blueprint, ivory and melon visual system, including navigation, subject selection, editor, results, and full-screen mobile challenge browser.
- Excel Formula Lab initially displays **seven numbered worksheet rows**, covering the field-label row and six sample-data records. Thirteen empty rows remain available behind an **Show extra rows / Hide unused rows** control.
- **Filled extra rows remain visible when the worksheet is collapsed.** Formulas, values, and their calculated output are retained in the active editor when rows are expanded/collapsed; Reset clears the custom workbook. Challenge grading continues to use the original fixed sample and hidden validation scenarios.
- Selecting a cell fills the formula bar with its existing value or saved formula. The main worksheet and schema inspector are compact; the duplicate sample table is hidden when the editable Excel Lab is active.
- The practice shell, toolbar, result tabs, support cards, and response surfaces use consistent text/background contrast and adapt to mobile, tablet, and desktop widths.
- A finishing stylesheet is applied to **12 public and protected learning/workspace pages** (Practice Arena, Practice Studio, AI Tutor, Learning Lab, Sign In, learner dashboard, Profile, progress reporting, capstone, certificates, admin and reviewer) without replacing their business logic or access gates.

## What did not change
- The Excel formula evaluator remains a **subset** of Microsoft Excel, not complete Excel compatibility.
- Practice challenge attempts remain in browser-local storage; this change does not claim to synchronise those attempts to Supabase.
- Supabase Auth, learner progress, weekly quizzes, certificate verification, capstone assessment, AI Tutor, floating AI, Learning Coach, and Practice Arena execution and grading are preserved. No schema migration is necessary.

## Verification
- `npm run verify:deployment`: build, lint, academy curriculum, Supabase access-code, security, Arena and Tutor tests.
- `tests/practice-compact-workspace.mjs`: checks compact row template and premium route coverage.
- Browser-isolated Chromium interaction checks at 320, 390, 768 and 1440 CSS pixels: seven initially visible rows; expand to 20; collapse to seven. A saved `F10 = B2*2` computed `240` and remained visible after the collapse, with no page-wide overflow in that 390px test.
- Isolated browser navigation is not the same as fully authenticated Vercel testing; conduct a final deployed preview check.
