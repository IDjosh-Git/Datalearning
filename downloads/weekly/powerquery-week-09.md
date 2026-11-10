# Power Query · Week 09 · Pivot and Unpivot

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Reshape wide reports into tidy rows

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Wide reports often store months or attributes in separate columns, which makes analysis difficult as new months arrive. Unpivot turns these columns into two fields such as Month and Value, producing a long or tidy table. This makes time-based filtering, grouping and charting easier. Pivot performs the reverse transformation by creating columns from category values. Choose the shape based on intended analysis and future refreshes.

Unpivoting the wrong columns can multiply irrelevant measures or destroy identifiers. Retain identifying columns such as ProductID and Region, and unpivot only the monthly value columns. Check whether nulls should be preserved and whether the transformed row count is explainable. After reshaping, compare the total of all values with the wide report’s original sum to confirm no data was lost.

## Guided walkthrough in the tool
1. Start with ProductID, Jan, Feb and Mar columns and identify the fixed ID.
2. Select ProductID and choose Unpivot Other Columns.
3. Rename Attribute to Month and Value to Sales; set correct data types.
4. Compare the long-table total with the sum across all three source month columns.

### Additional hands-on instruction
Create a small wide monthly table from learning_monthly_kpis.csv, then unpivot Jan–Mar measures into records.

## Business case
A report has one row per product with columns Jan, Feb and Mar. Unpivot Other Columns, keeping ProductID fixed, creates one row per product-month. A line chart can then filter Month consistently. Confirm that summing all long-format Sales values matches the total in the wide original, and inspect null months separately.

## Independent practical challenge
A table has columns Product, Jan, Feb, Mar. What changes after unpivoting the month columns?

**Deliverable:** Explain which columns remain identifiers and what new field becomes the measure name.

## Verify your work
For three complete month columns and ten products, expect up to thirty month-product records. Check how missing values affect the count and document the output grain.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
One Month column and one Revenue column replace three separate month columns.

**Common pitfall:** Leaving monthly headers as columns in a trend-ready model.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
