# Power Query · Week 05 · Conditional columns and filtering

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Classify records with transparent rules

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Conditional columns translate business rules into repeatable classifications. For example, classify Amount >= 10000 as High, Amount >= 5000 as Medium, and the rest as Low. The order of conditions matters because the first condition that matches determines the result. Add explicit handling for nulls and unexpected values so the query does not accidentally classify unknown amounts as Low.

Filters determine which records enter the final report. Filtering to completed orders is reasonable for completed-sales analysis, but it should not be applied to an order-pipeline report. Document every classification and filter in business language, then test the boundary values. Keeping rules in named query steps makes it easier to review changes when thresholds or business definitions are updated.

## Guided walkthrough in the tool
1. Write the classification rules in a short table including boundaries and missing values.
2. Add a Conditional Column using the agreed ordering.
3. Test examples exactly at 5000 and 10000 plus a null record.
4. Filter only records allowed by the report definition, then reconcile counts by category.

### Additional hands-on instruction
Create a revenue band from unit price and a completed-status flag with an explicit unknown category.

## Business case
Classifying orders with amounts 4,999, 5,000 and 10,000 should produce Low, Medium and High under thresholds >= 5,000 and >= 10,000. Test exactly on the boundaries. A missing amount should become Unknown, not Low. Boundary cases are the quickest way to verify conditional logic in Power Query.

## Independent practical challenge
Classify Amount = 120,000 under the rule and explain why the Status filter matters.

**Deliverable:** Count unknown cases separately and test boundary values.

## Verify your work
If categories fail to cover all rows, inspect ELSE and null handling. The sum of category counts should equal the eligible input count when labels are mutually exclusive and exhaustive.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
High; only paid transactions belong in realized-revenue reporting.

**Common pitfall:** Counting cancelled orders as completed sales.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
