# Tableau · Week 07 · Table calculations

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Create running totals and percent of total

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=3_DeQdE25Bc.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Table calculations operate over the marks in the current view after much of the underlying query work has been completed. RUNNING_SUM builds a cumulative measure across ordered marks; a percent-of-total calculation divides a mark by the relevant visible total. These calculations depend on addressing and partitioning: the direction in which Tableau traverses marks and where it restarts.

A running total across months should accumulate in chronological order. If the compute-using setting runs down Regions instead of across Months, the same formula can return a different answer. Filters can also alter the visible marks over which a table calculation operates. Validate the first, middle and final running totals against a hand-calculated list before using the chart to tell a business story.

## Guided walkthrough in the tool
1. Create monthly Revenue as a line or table view sorted chronologically.
2. Add a Running Total quick table calculation.
3. Inspect Compute Using and confirm that it addresses Month rather than an unintended dimension.
4. Compare the first three running values and the final total with a manual sum.

### Additional hands-on instruction
Create a running total over month and percent-of-total by region. Compare table direction settings.

## Business case
Revenue is 100 in January, 150 in February and 125 in March. A running total should display 100, 250 and 375. If Tableau computes along Regions instead of Months, it will produce a different sequence. Inspect the table calculation direction and compare the three displayed values against the manual totals.

## Independent practical challenge
Calculate the cumulative sales for 12, 8 and 10, ordered January to March.

**Deliverable:** Explain what changes when the table calc is computed across versus down.

## Verify your work
The final running total should match the eligible revenue total for the same filtered period. If it restarts unexpectedly, inspect partitioning and sort order.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
12, 20 and 30.

**Common pitfall:** Using an incorrect table-calculation addressing direction.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
