# Power Query · Week 08 · Group By and aggregate

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Reconcile totals and build summary tables

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Group By summarises rows at a selected grain, such as one row per Region with Sum of Revenue and Count Rows. You can add multiple aggregations to the same grouping. Before doing so, define what each result represents. Count Rows differs from a distinct count of OrderID if the source contains several lines per order. Where necessary, deduplicate a key in a separate query or use an explicit aggregation strategy.

Aggregation is also a validation tool. Comparing summed revenue by category to the overall source total helps detect missing groups and transformation mistakes. Null categories should be handled deliberately so valid records are not lost. Group By can make a report much smaller, but once detail rows are aggregated you cannot inspect individual transactions in that output; preserve the original query for drill-through and audit.

## Guided walkthrough in the tool
1. Choose one grouping dimension (Region) and two measures (Revenue Sum, Row Count).
2. Apply Group By and verify one row per unique Region.
3. Compute the source revenue total independently and compare with the sum of grouped totals.
4. Repeat with an additional dimension (Month) and describe how the output grain changed.

### Additional hands-on instruction
Group completed orders by region and compute total quantity, row count and average unit price.

## Business case
A source contains one row per order, and grouping by Region creates four summary rows. The total Sum of Amount across groups should still match the original total unless rows were filtered. Count Rows shows orders only if one source row actually represents one order. State the grain before choosing a Group By aggregation.

## Independent practical challenge
If East has ₦2,000 and ₦3,500 in paid sales, what is its grouped revenue?

**Deliverable:** Check that aggregate totals match the ungrouped dataset after the same filter.

## Verify your work
An aggregation should not change the grand total when groups partition the same records and the same measure is used. Investigate missing, excluded or duplicated categories.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
₦5,500.

**Common pitfall:** Summing an aggregated table after a fanout join.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
