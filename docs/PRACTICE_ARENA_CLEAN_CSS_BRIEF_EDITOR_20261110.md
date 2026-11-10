# Practice Arena — premium editor picker and optional Challenge Brief

**Release date:** 10 November 2026  
**Base:** DataLearning Compact Editors / Auto-Height Results (full project)

## Implemented

- Refactored legacy route-only `assets/styles/practice.css`: removed 1,039 CSS rule groups (and additional stale subject/brief selectors) that did not correspond to any live Arena markup or controller. Old practice CSS reduced from 384,583 to 238,304 bytes, preserving common base/editor functionality.
- Removed obsolete Arena editor-picker rules from `practice-arena-modern.css` and obsolete brief styles from `practice-arena-studio-premium.css` and `practice.css`. The sole owner of the new picker and brief styles is `assets/styles/practice-arena-refined.css`; shared site-wide styles remain untouched.
- The **Challenge Brief** now uses native `<details>`/`<summary>`, closed by default for every selected challenge, with a clear Show brief/Hide brief affordance. Learners see the challenge title and task immediately; optional learning goals and pass criteria expand only when requested.
- Premium **SQL**, **Excel** and **Python** editor selection cards: larger controls, descriptive subtitles, counts, icons and selected/hover/focus contrast. Three-column desktop layout becomes a clear single-column mobile list. Existing selection and challenge modal controllers are unchanged.
- The IDE's Excel/SQL mode switch now has improved selected/hover/focus contrast consistent with the premium Arena design.
- Removed legacy one-pixel clipping of the actual challenge heading and task text, which kept those elements visually hidden under the old IDE rules.
- Updated route asset query versions for changed CSS and the challenge brief controller.

## Verification

- `npm run verify:deployment` passed: Academy, security, Arena (including new optional-brief regression) and AI Tutor suites.
- Isolated headless Chromium checks using the full stylesheet order passed at 320px, 390px, 768px, and 1440px. Checked selected card text and gradient, default closed/open/close brief, visible challenge heading and task, and absence of horizontal overflow. The preview fixture uses production markup and assets, not a live authenticated browser session.
- No existing formula evaluator, Python runtime, SQL engine, grading checks, Supabase schema or learner data were altered.

## Deployment check

Deploy the entire project ZIP to a preview environment. Open SQL, Excel, and Python challenge cards and confirm the editor/challenge modal works. Check Show brief/Hide brief on a new challenge and try a formula or SQL query. Verify the mobile page in the deployed browser before promoting it to production.
