# Power Bi · Week 03 · Star schema

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Use dimensions to filter fact tables predictably

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=33537s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A star schema typically centres on a fact table containing business events and measures, surrounded by dimension tables containing descriptive attributes. Sales is a fact; Calendar, Product and Customer are dimensions. A one-to-many relationship usually filters from a unique dimension key to many fact rows. This helps the report use a consistent filter path and reduces ambiguous joins.

Relationships are not simply lines drawn between columns with similar names. Check uniqueness on the “one” side, matching data types and the intended cardinality. Many-to-many or bidirectional relationships can produce confusing results when used without a specific modelling justification. Create a dedicated date table for reliable time comparisons and mark it appropriately where required. Compare results before and after introducing relationships.

## Guided walkthrough in the tool
1. Write the grain and key for the Sales fact table.
2. Create dimension tables with one row per Date, Product and Customer key.
3. Relate each dimension key to the fact key and verify the one-to-many cardinality.
4. Test a table visual filtered by product and month, and reconcile grand totals.

### Additional hands-on instruction
Create separate Region and Calendar dimensions, relate them one-to-many to the sales fact, and inspect filter direction.

## Business case
A Product table contains two rows for ProductID 5. Power BI cannot safely use that column as a unique one-side key. Deduplicate only after establishing which product record is valid, then create the relationship. Test a product slicer against a known order; if filtering behaves unexpectedly, inspect keys and cardinality first.

## Independent practical challenge
What goes on the one side of Date–Sales relationship?

**Deliverable:** Test whether a region slicer filters the fact once, without duplicating transactions.

## Verify your work
If a product slicer does not change revenue, inspect the relationship and filter direction before editing the measure. If totals unexpectedly double, inspect duplicate dimension keys and fact grain.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Date table with unique dates

**Common pitfall:** Relying on bi-directional relationships everywhere.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
