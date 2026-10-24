# Practice Arena v31 — Excel fixes, 95 exercises and SQLite

## What's changed
- **Excel formula bar fix:** the Inspector no longer renders a second `#ideFormulaBar` input. The visible formula editor remains synchronized with `#practiceAnswer`, and pressing Enter in the formula bar runs the formula.
- **Actual calculated results:** the results pane reports the evaluated number, text, Boolean or array. Challenge grading is separate: a valid formula can calculate successfully even if it does not match the current exercise's expected output.
- **Offline spreadsheet expression interpreter:** replaces the narrow original interpreter with a parser supporting nested functions, arithmetic, comparison operators, parentheses, percentage, exponentiation, quoted strings, `$` cell references and ranges within A1:E7. Added SUMIFS, COUNTIFS, AVERAGEIF(S), SUMPRODUCT, IFERROR, AND, OR, NOT, IFS, XLOOKUP, VLOOKUP (exact match), INDEX/MATCH, string, date and statistical functions, and basic FILTER/UNIQUE/SORT arrays.
- **SQL expansion:** a SQLite WebAssembly engine is loaded using sql.js **1.14.2** from jsDelivr on the Practice Arena page. This executes real SQLite SELECT / WITH / VALUES queries against four teaching tables: `orders`, `customers`, `products`, `order_items`. Supports SELECT, JOINS, CTEs, subqueries, CASE, unions, SQLite functions and window functions. Each run gets a new in-memory database, uses SQLite's `query_only` setting and caps output at 500 rows. Write operations are not accepted.
- **Challenge set:** 45 SQL + 50 Excel = 95 challenges. All 40 original challenge IDs remain unchanged, preserving learner progress; 55 were added (25 SQL, 30 Excel).
- **Brand assets:** genuine Excel and SQLite brand icons from the Simple Icons CDN in the hero and workbench, falling back to the bundled vector course icons when image CDN access is unavailable. SQL has no single vendor-independent logo; SQLite is the SQL engine used here.
- Added SQL presets for a join and a window-ranking query, and exposed all four SQL tables in schema information.

## Limitations
- **Not all Microsoft Excel formulas** are supported, and the spreadsheet is a teaching sandbox with immutable A1:E7 input data, not a general workbook editor. Lookup functions use exact-match behavior, and dates/numbers implement a subset of Excel semantics. Unsupported functions produce an explanatory `#NAME?` error; genuine formula errors such as division by zero remain errors.
- **Not all SQL dialects** are supported: the online SQL engine executes *SQLite* queries, not T-SQL, PL/SQL, PostgreSQL-specific SQL or a database server. The runtime JavaScript and `.wasm` module require access to jsDelivr on first load. If unavailable, the original basic offline SQL engine handles the first 20 SQL challenges; the 25 new advanced SQL challenges require SQLite. All Excel formula challenges work offline once the site's assets are loaded.
- Grading compares outputs on three sample datasets, not all mathematical possibilities. Runs return an output even when the solution does not earn a challenge pass. Browser authentication and other site features are retained.
- The icons require an internet connection for authentic Simple Icons versions; local vector fallbacks are included.

## Tests performed
- `node tests/offline-engines.mjs`: existing 40 models execute successfully.
- `node tests/practice-arena-v31.mjs`: all 50 spreadsheet answers evaluated on three data scenarios; 20 basic SQL model answers executed; parser and error cases checked.
- 45 SQL reference solutions executed successfully in local Python's native SQLite (matching the browser SQLite dialect).
- `npm run verify:deployment`: passes Vercel/static asset and Practice Arena audits.
- A Chromium end-to-end test could not be completed because this execution environment rejects both localhost HTTP and local file navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. Test the page in a regular browser after deploying.

## Quick verification on deployment
1. Open `/practice` and choose **Excel → Total sales**. Enter `=SUM(B2:B7)` and click **Run Formula**. The calculated result must show **1850**.
2. Try `=XLOOKUP("Toner",A2:A7,D2:D7)` → **620**. Even if the current challenge asks a different question, the result should still display (the answer just will not pass that challenge).
3. Try `=SUMIFS(B2:B7,C2:C7,"East")` → **1040**. The formula input should appear only once in the active editor.
4. Open **SQL → Orders with customers**, enter its worked answer, run; verify that rows return from the JOIN query. Make sure the browser can load `sql-wasm.js` and `sql-wasm.wasm`.
5. Use the current grade, hint, worked-answer, challenge filters and previous progress to confirm no regressions.

**Deployment:** upload the entire `Datalearningpath` folder, not just the modified JS files. Preserve the existing routes and assets.
