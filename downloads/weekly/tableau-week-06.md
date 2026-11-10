# Tableau · Week 06 · Level of detail calculations

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Compare detailed marks against a fixed benchmark

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=K-3lEMHe2jU.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Level of Detail (LOD) expressions control the grain at which a calculation is evaluated. FIXED [CustomerID] : SUM([Revenue]) computes a per-customer total at a declared dimension, even when the visual displays Region. This is useful when comparing transactions against customer-level metrics or calculating a benchmark at a different grain from the view. INCLUDE and EXCLUDE offer other ways to shape detail.

LOD expressions interact with filters according to Tableau’s order of operations. A FIXED calculation may not respond to ordinary dimension filters in the way a learner expects, while context filters may affect it. Read the expression aloud: “For each CustomerID, calculate the sum of Revenue.” Then explain how those customer totals should be aggregated in the final chart. Validate with a tiny dataset in which one customer has several orders.

## Guided walkthrough in the tool
1. Create a Customer Revenue LOD using FIXED CustomerID.
2. Build a view showing individual transactions and the repeated customer total.
3. Compare the sum of customer totals with a correct distinct-customer aggregation strategy.
4. Apply a filter and inspect how it affects the FIXED result; test a context filter.

### Additional hands-on instruction
Build a fixed regional benchmark and compare it to category-level marks. Inspect the filters applied.

## Business case
You want customer-level total revenue displayed beside each individual transaction. A FIXED CustomerID LOD can calculate that total. But after repeating it on multiple transaction rows, summing the repeated total would overstate the customers’ combined sales. Define the intended aggregation and check a customer with several orders before using the calculation in a dashboard.

## Independent practical challenge
Why could a region total repeat beside each product on a detailed view?

**Deliverable:** Describe how context filters can affect a FIXED calculation.

## Verify your work
Do not SUM a repeated customer-level LOD for every transaction without considering duplication. State the grain of both the LOD result and the final visual.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
The FIXED calculation evaluates at the region level, then appears alongside finer-grain product marks.

**Common pitfall:** Summing repeated FIXED totals across products.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
