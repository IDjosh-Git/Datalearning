# Excel · Week 10 · Power Query in Excel

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Create reproducible transformations

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=23762s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power Query in Excel turns repeatable cleaning steps into a refreshable process. Instead of manually removing blank rows and renaming columns each week, connect to a source, make the changes in the query editor, and refresh when new files arrive. Applied Steps records the transformation sequence. Distinguish the source query from its transformed output and keep each step understandable so failures can be diagnosed.

Refreshability is not guaranteed by the presence of a Refresh button. Source paths, column names, data types and privacy settings can change. Test refresh with new rows and with a deliberate input anomaly. Keep a note of assumptions such as “all files use the same columns” and never quietly swallow every transformation error. Validate row counts, totals and missing-value counts after loading the results back to Excel.

## Guided walkthrough in the tool
1. Use Data > Get Data to import a CSV or workbook; check the preview and column headers.
2. Rename and type the columns, trim text, and filter only clearly invalid records.
3. Load the query result as a Table and build a small summary beside it.
4. Replace the source with a revised file, refresh and compare counts and totals.

### Additional hands-on instruction
Use Data > Get Data > From Text/CSV to import the dirty sales file, fix types and record exceptions.

## Business case
The weekly sales CSV has a new column called Channel, and one date uses a different format. A Power Query refresh may fail at Changed Type or produce unexpected nulls. Inspect the failed step, isolate error rows, and update the query deliberately. After refresh, compare order count and net revenue against the source file.

## Independent practical challenge
Where should repeatable import cleanup live instead of manual copy/paste?

**Deliverable:** Refresh from an unchanged source and show which transformation steps are reproducible.

## Verify your work
If refresh breaks because a column name changed, repair the step at the correct stage. Confirm the result still represents the same business grain, not simply that the query shows “success”.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Power Query steps

**Common pitfall:** Manual edits that disappear on refresh.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
