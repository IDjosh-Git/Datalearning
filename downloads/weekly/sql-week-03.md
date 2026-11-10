# Sql · Week 03 · Aggregation

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Choose SUM, COUNT and DISTINCT deliberately

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2334s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Aggregation converts rows into summaries. SUM adds numeric values, COUNT(*) counts rows, COUNT(column) counts non-NULL values, and COUNT(DISTINCT column) counts distinct non-NULL keys. GROUP BY specifies the grain of the output. For example, grouping by region gives one row per region, while grouping by region and month gives one row per combination. Choose grouping columns to match the business question.

A percentage needs a numerator and denominator computed over the same eligible population. Never average percentages from groups of unequal size unless a meaningful weighting method is used. HAVING filters groups after aggregation, whereas WHERE filters individual rows before aggregation. Missing amounts, duplicated joins and unexpected GROUP BY dimensions are common reasons totals fail to reconcile.

## Guided walkthrough in the tool
1. Write a base SELECT that filters the eligible transaction rows.
2. Add GROUP BY region with SUM(amount) and COUNT(DISTINCT order_id).
3. Calculate an overall total separately and compare it with the sum of regional totals.
4. Add HAVING to show only regions meeting a threshold, documenting which groups were removed.

### Additional hands-on instruction
Group completed orders by region and compare COUNT(*), SUM(quantity) and SUM(quantity*unit_price).

## Business case
North has two orders of 100 and 200; South has one of 1,000. SUM by region yields 300 and 1,000, while COUNT(*) yields 2 and 1. Neither ranking answers every business question. Make the desired metric explicit, validate the overall revenue of 1,300 and avoid accidentally comparing average order value with total revenue.

## Independent practical challenge
Write a count of unique customers by region.

**Deliverable:** Validate one group independently and clarify inclusion of returns or cancellations.

## Verify your work
If regional totals do not reconcile, inspect filters, NULLs and duplicate joins. State whether the metric measures rows, orders or customers—not all three.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
SELECT region, COUNT(DISTINCT customer_id) FROM orders GROUP BY region;

**Common pitfall:** Mixing non-grouped columns with aggregate results.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
