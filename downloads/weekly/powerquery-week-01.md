# Power Query · Week 01 · Get data and Applied Steps

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Import a source and understand refreshable transformations

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power Query is a repeatable transformation tool used in Excel and Power BI. It creates a query that connects to a source and applies operations in sequence. In the Applied Steps pane, each step describes how the previous table was changed. You can correct a column type, remove empty rows or rename a field without editing each record manually. Because the steps are saved, refreshing can apply the same rules to new data.

Begin by deciding which source should be trusted and what one row represents. A CSV exported from a sales system may include extra title lines or inconsistent headers. Inspect the first rows carefully before promoting headers. Naming steps and queries clearly is valuable when the workflow grows. Query preview is not proof that a future refresh will work, so document expected columns and check row counts after loading.

## Guided walkthrough in the tool
1. Use Get Data to connect to a CSV file and inspect the preview.
2. Promote the true header row if needed and rename the query Sales_Clean.
3. Review Applied Steps and correct the data types.
4. Load the output and test Refresh after adding new source records.

### Additional hands-on instruction
Load the sales file; inspect column quality, column distribution, header promotion and source-step configuration.

## Business case
A weekly export arrives with two title rows before the actual header. Power Query can remove the first two rows, promote the next row as headers and change types consistently on each refresh. If the export later adds another title row, the saved steps might treat the wrong line as a header. Document the source contract and add a refresh validation check.

## Independent practical challenge
What happens when ten new valid rows are added to the CSV and Refresh is run?

**Deliverable:** Write a repeatable source-to-output recipe and identify what may fail on refresh.

## Verify your work
Compare source and loaded row counts. If rows were removed deliberately, keep a documented reason and count; otherwise the transformation may have hidden valid records.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
The query repeats its steps and includes the newly added rows, subject to the source and filters.

**Common pitfall:** Manually editing output cells instead of repeatable source steps.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
