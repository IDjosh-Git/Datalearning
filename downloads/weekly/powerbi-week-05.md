# Power Bi · Week 05 · Measures vs calculated columns

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Choose model-efficient calculations

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=2770s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A measure is calculated at query time under the current filter context. A calculated column is stored row by row at model refresh and can be used for grouping or relationships, but increases model size. Use measures for aggregations such as total revenue, utilisation percentage and dynamic comparisons. Use a calculated column when a genuinely row-level attribute must exist in the model, rather than creating it just to avoid writing a measure.

Iterators such as SUMX calculate an expression for each table row before aggregating the results. This is useful for quantity multiplied by unit price when no net amount column exists. A simple SUM cannot evaluate arbitrary row expressions. Large calculated columns and unnecessarily complex iterators can increase memory use or slow queries. Measure design should be driven by the analytical grain and report behaviour.

## Guided walkthrough in the tool
1. Write a measure for Total Revenue using a suitable existing amount field.
2. Write a SUMX alternative when revenue is Quantity × UnitPrice at row grain.
3. Create a row-level category only if it needs to be sliced or grouped repeatedly.
4. Compare model size and report behaviour; verify calculations at multiple filter levels.

### Additional hands-on instruction
Build Completed Sales as a measure applying status="Completed" and compare with a calculated row amount.

## Business case
If Sales contains three lines with quantities 2, 3 and 1 and unit prices 100, 200 and 50, SUMX returns 850. SUM(Sales[Quantity]) × SUM(Sales[Price]) returns (6 × 350) = 2,100, which is wrong. Row-level multiplication must happen before aggregation. Use measures for reusable context-dependent business totals.

## Independent practical challenge
Which is preferable for a slicer-responsive revenue total?

**Deliverable:** Record one case where a column would increase model size without helping the required visual.

## Verify your work
Test whether the total still makes sense under multiple slicers. A row-level column fixed at refresh will not automatically respond to report filter context in the way a measure does.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
a DAX measure

**Common pitfall:** Creating one calculated column per KPI.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
