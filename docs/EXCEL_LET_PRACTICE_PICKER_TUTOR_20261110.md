# DataLearning — Excel LET, Practice Arena and AI Tutor update

## Changes

1. `assets/scripts/formula-engine.js`: `LET(name, value, ..., calculation)` binds variables in a local scope. Sequential bindings, nested LET expressions, scoped shadowing, and value/error checks are supported. Variable names cannot be cell references; duplicate names within one LET are rejected. Formula results remain calculated against the practice worksheet and independent custom-cell editor.
2. `assets/scripts/arena-ide.js`: the Excel formula bar gives an explicit LET example and offers **Insert LET example**. It updates the same formula field used by Run/Calculate and challenge grading.
3. `practice.html` and `assets/styles/practice-challenge-selector-premium.css`: premium challenge selector with current counts, improved search, filters, cards, selected states and accessible Close control, including mobile styles. All task and selection wiring is retained.
4. `tutor.html`, `assets/scripts/floating-learning-ai.js` and `assets/styles/tutor.css`: remove the duplicate floating assistant from the dedicated AI Tutor on all viewports (omitted script plus route guard and CSS fallback).
5. Practice editor asset cache versions refreshed. Supabase schemas, authentication and progress records untouched.

## Calculation and query scope

**Excel:** The offline evaluator supports many commonly used formulas, including LET, lookup, text, statistical, conditional, financial-style numeric and date functions. It is **not** Microsoft Excel. Macros/VBA, external workbook links, Power Query, all dynamic array shape semantics, and every Excel function are not implemented. The worksheet editor operates over a compact teaching sheet with safety limits.

**SQL:** When online, `sql.js` loads SQLite and supports SQLite SELECT/WITH/VALUES, joins, subqueries, CTEs and window functions on the bundled sample tables. It uses an ephemeral read-only SQLite database and returns up to 500 rows per run. It does **not** implement every vendor SQL dialect or permit CREATE/INSERT/UPDATE/DELETE/DROP. In offline fallback mode, a limited subset of simple SELECT queries works.

**Challenge passing:** Queries and formulas may execute correctly without being marked passed: the grader checks expected results for the selected challenge and alternate data scenarios.

## Verification

- New regression cases: 10 LET formulas and 5 error conditions, Tutor floating-script exclusion, and picker wiring.
- `npm run verify:deployment`: passing.
- Full visual browser interactions were **not** verified in this release because the local browser runtime blocked navigation. Check at 320px, 390px, tablet and desktop after deployment.
