# Excel · Week 02 · Structured tables

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Create a resilient analysis-ready table

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=16081s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
An Excel Table is a structured range with column names, automatic filter controls and formulas that extend when new rows are added. Use Insert > Table or Ctrl+T, confirm the header row and give the table a meaningful name such as Sales. Structured references like Sales[Revenue] remain intelligible even when new rows are appended. Tables help separate source data from reports and reduce fragile hard-coded ranges.

A good analysis table has one header row, one record per row, no merged cells inside the data, and consistently typed columns. Avoid manual subtotals within a source table because PivotTables and SUMIFS may double-count them. Check uniqueness of identifiers and standardise categories before building analyses. Keep transformations outside the raw data when auditability matters.

## Guided walkthrough in the tool
1. Remove merged headers, empty separator rows and manually inserted grand totals from the source range.
2. Select the dataset, create a Table with headers, and rename it Sales.
3. Add a new sale row and verify that table formulas and filters extend automatically.
4. Create a total with a structured reference and compare it to an ordinary range formula.

### Additional hands-on instruction
Select the sales range, press Ctrl+T, verify headers, name the table Sales, and try =SUM(Sales[quantity]).

## Business case
A sales table with 500 rows grows to 540 tomorrow. A fixed reference to B2:B501 ignores the 40 new rows, while a correctly designed structured table reference expands automatically. Confirm that the table has no embedded total rows and that all incoming values use the expected data types before trusting the new total.

## Independent practical challenge
Write a SUM formula for the Amount column in a table named Orders.

**Deliverable:** Add one test row and explain why a structured SUM includes it automatically.

## Verify your work
Refresh the table after adding a row: SUM(Sales[Revenue]) should change. Confirm that category filters affect only display unless a subtotal-aware function is used.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=SUM(Orders[Amount])

**Common pitfall:** Including total rows or merged cells inside the raw data.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
