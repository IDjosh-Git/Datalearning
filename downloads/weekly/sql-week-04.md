# Sql · Week 04 · Joins and fanout

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Identify and prevent duplicate metric inflation

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2823s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A JOIN matches rows using a condition. INNER JOIN keeps matching combinations; LEFT JOIN also retains rows from the left table with no match. The join condition must reflect the business relationship. Joining order headers to their lines repeats each header, so SUM(header_total) after the join can inflate revenue. This multiplication is called fanout and is one of the most damaging analytical SQL mistakes.

Before joining, inspect uniqueness of the keys on each side and estimate how many output rows to expect. If you need a customer-level summary, first aggregate orders to customer grain and then join that summary to Customers. If you need line revenue, sum the line amounts instead of repeated header amounts. A LEFT JOIN followed by WHERE right_table.some_field = ... may unintentionally behave like an INNER JOIN by dropping unmatched rows.

## Guided walkthrough in the tool
1. Count Orders and OrderLines, and check duplicate OrderID values on the expected unique side.
2. Join a single order with multiple lines and inspect repeated header values.
3. Compute revenue from line totals or from a pre-aggregated Orders subquery—not both mixed together.
4. Compare distinct order counts, total revenue and unmatched IDs before and after the join.

### Additional hands-on instruction
Join orders to customers on customer_id, then compare the overall order count and revenue with the unjoined table.

## Business case
An order header of 200 has two line items: 120 and 80. Joining headers to lines produces two copies of the header amount; SUM(header_amount) incorrectly yields 400. Either sum line amounts (120 + 80) or pre-aggregate at order grain. Test this one-order example before joining the complete dataset.

## Independent practical challenge
Why does SUM(orders.total) increase after joining items?

**Deliverable:** Describe a fanout diagnostic and how you would prevent an unintended metric increase.

## Verify your work
Always check three things after a join: row count, distinct key count and metric total. One correct count does not guarantee the other two are correct.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
One-to-many join duplicates parent rows

**Common pitfall:** Using DISTINCT to hide a broken join logic.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
