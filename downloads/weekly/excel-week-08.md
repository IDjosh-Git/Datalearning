# Excel · Week 08 · PivotTables

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Summarize without altering the source

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=lH7HfwUFnYA.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A PivotTable groups records and performs aggregations without modifying the original table. Put Region in Rows, Month in Columns and Revenue in Values to produce a compact view of performance. The default aggregation may be Count when a numeric-looking field is actually text; change the field settings deliberately. A PivotTable refreshes from its source, so confirm that your table includes new rows.

A PivotTable can mislead when it mixes row counts, distinct counts and sums. “Count of OrderID” is a count of nonblank rows, which differs from distinct orders when there are multiple lines per order. Use the Data Model for distinct counts where supported, or validate with a suitable unique-key calculation. Keep the analysis grain and filtering logic explicit, and compare the PivotTable grand total with an independent source total.

## Guided walkthrough in the tool
1. Convert your source to an Excel Table and select Insert > PivotTable.
2. Place Region into Rows, OrderDate grouped by month into Columns, and Revenue into Values.
3. Check that the Values field is Sum rather than Count and apply a number format.
4. Refresh after adding data; reconcile the PivotTable total with SUM of the source revenue column.

### Additional hands-on instruction
With the clean sales file, create a completed-sales PivotTable by region and month; add a slicer for category.

## Business case
A PivotTable of order lines shows Count of OrderID = 600 while the source contains 420 unique orders. Both figures can be correct at different grains: the first counts nonblank order-line rows. Rename the measures clearly and use a distinct count approach when reporting orders rather than lines. Verify the result against the source.

## Independent practical challenge
How do you display monthly sales by region in a PivotTable?

**Deliverable:** Reconcile the PivotTable total to an independently calculated source sum and test a slicer selection.

## Verify your work
The grand total should match the unfiltered source total at the same grain. If you apply a slicer or filter, label the subset clearly so a reader does not mistake it for the full company.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Rows Region; Columns Month; Values Sum of Revenue

**Common pitfall:** Leaving value aggregation as Count when Sum is needed.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
