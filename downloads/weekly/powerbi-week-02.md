# Power Bi · Week 02 · Power Query transformations

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Build refreshable and typed input steps

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=32751s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power Query performs extraction and transformation before data enters the semantic model. Applied Steps makes each operation visible: rename columns, convert types, remove irrelevant rows or merge sources. The order of steps matters, especially if a later operation assumes that a column already exists or contains valid dates. Every transformation should have a clear purpose connected to the metric definitions.

Refreshing the dataset repeats these steps on new source data. A one-off manual fix in a report visual will not solve recurring import issues. Profile columns for missing values, distinct counts and errors, then keep a clear record of exclusions. Query folding can push supported transformations back to a relational source, improving performance; inspect foldability rather than assuming every step folds.

## Guided walkthrough in the tool
1. Connect to a CSV or database and review field types and example rows.
2. Rename business columns, convert dates and amounts, and standardise categories.
3. Profile columns for nulls, errors and unexpected distinct values before loading.
4. Close & Apply; refresh with new data and compare source and model totals.

### Additional hands-on instruction
Choose Transform Data, inspect Applied Steps and correct deliberate data-quality issues without erasing uncertain rows.

## Business case
A Power Query step removes every row with a null delivery date. That could be appropriate for delivered-orders duration, but wrong for a dashboard tracking open orders. Keep the raw query and build a specialised clean output for the intended metric. Record how many rows were excluded and verify refresh after the underlying file changes.

## Independent practical challenge
Where should source-column types be corrected?

**Deliverable:** Refresh once and compare the exception count before and after your documented rules.

## Verify your work
When a new column appears or a type changes, refresh may fail or silently alter a result. Check transformation error counts and numeric totals after every significant source change.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
In Power Query and ideally upstream data contracts

**Common pitfall:** Using visual formatting to correct source types.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
