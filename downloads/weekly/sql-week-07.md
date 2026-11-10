# Sql · Week 07 · Window functions

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Compare records without collapsing detail

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=5402s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Window functions calculate values across related rows without collapsing each row into a summary. ROW_NUMBER can rank transactions within a customer, LAG can compare a month with its preceding month, and SUM(amount) OVER (...) can compute running totals. The PARTITION BY clause defines the groups; ORDER BY inside OVER defines the calculation sequence. This is distinct from the final ORDER BY used to display results.

Ordering must be deterministic for stable results. If two rows share a date, add a unique tie-breaker such as OrderID when using ROW_NUMBER. Running totals also depend on the window frame, which may include peers unexpectedly when ordering values repeat. Specify a ROWS frame when you intend a row-by-row cumulative result. Preserve the original row count to demonstrate that the window calculation did not aggregate rows away.

## Guided walkthrough in the tool
1. Build monthly revenue by region with GROUP BY.
2. Use LAG(revenue) partitioned by region and ordered by month to obtain the prior-month value.
3. Calculate the absolute or percentage change and handle the first month’s NULL prior value.
4. Compare two rows manually and inspect what happens when a month is missing.

### Additional hands-on instruction
Use ROW_NUMBER() OVER (PARTITION BY region ORDER BY order_date) and a regional running revenue total.

## Business case
A monthly report shows 10,000 in January, 12,500 in February and 11,000 in March. LAG returns the previous month’s measure without collapsing rows. February’s change is +2,500; March’s is −1,500. If January is missing from the filtered period, February’s previous value may be NULL, so do not treat it as zero.

## Independent practical challenge
Which function ranks rows sequentially within each customer?

**Deliverable:** Explain why GROUP BY and window output have different row counts.

## Verify your work
A missing prior month can mean a real gap, not a zero baseline. Decide whether your report should show the previous observed month or the previous calendar month.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date)

**Common pitfall:** Omitting deterministic tie-breakers.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
