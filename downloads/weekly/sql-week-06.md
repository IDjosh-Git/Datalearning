# Sql · Week 06 · CTEs and subqueries

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Break complex transformations into auditable steps

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=5642s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A common table expression (CTE) names an intermediate result using WITH. It can separate filtering, aggregation and presentation into readable blocks. This does not automatically make a query faster: it makes the analytical intention easier to review, and optimisation behaviour depends on the database engine. A subquery is another way to build an intermediate relation and is useful when a transformation belongs close to its consumer.

Use each step to preserve a clearly stated grain. For example, a `monthly_sales` CTE should return one row per month and region, not a mixture of individual transactions and summary totals. If a later join changes that grain, examine the relationship again. Break an elaborate query into a series of named, independently testable transformations rather than hiding multiple assumptions in one SELECT expression.

## Guided walkthrough in the tool
1. Start from a filtered set of eligible orders and name that CTE base_orders.
2. Create monthly_sales grouped by month and region with the required metrics.
3. Use a final SELECT to present or compare those metrics, avoiding SELECT *.
4. Run each CTE’s SELECT independently while debugging and compare counts and totals at every stage.

### Additional hands-on instruction
Create a cleaned_orders CTE and a by_region CTE, then select the final summary from the second one.

## Business case
An analyst writes a long query with filters, joins, monthly calculations and presentation formatting in one SELECT. A reviewer cannot see why the totals changed. Split the logic into base_orders, monthly_totals and final_report CTEs. Run each intermediate SELECT to reconcile row counts and sum amounts. CTEs improve clarity even when the runtime does not change.

## Independent practical challenge
When would a CTE improve clarity?

**Deliverable:** Compare intermediate row counts and ensure no premature aggregation masks detail.

## Verify your work
Check the grain and business meaning of each CTE output. A sensible name is no substitute for testing that the query still produces the expected keys and totals.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
When intermediate transformations need names and separate validation

**Common pitfall:** Assuming a CTE always improves execution performance.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
