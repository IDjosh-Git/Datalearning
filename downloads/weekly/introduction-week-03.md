# Introduction · Week 03 · Granularity and keys

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Identify what one row means and how records are identified

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2823s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Granularity, or grain, answers “What does one row represent?” An orders table might have one row per order, whereas an order-lines table has one row per product in an order. An order with three products therefore occupies three line rows. A key identifies a record at its intended grain: OrderID might identify the order table, while the combination of OrderID and LineNumber identifies an order-line record. State the grain of every dataset before computing totals.

Joining tables can multiply rows. If an order has three lines, joining the order header to those lines repeats its header revenue three times. Summing that repeated column produces an incorrect result even when the join itself is technically valid. Measure at the correct grain, aggregate line-level amounts, or use a distinct order count as appropriate. Verify the relationship’s one-to-many direction and search for duplicates on the supposed unique side.

## Guided walkthrough in the tool
1. Write one sentence describing the grain of both Orders and OrderLines.
2. Check whether OrderID is unique in Orders and whether OrderID plus LineNumber is unique in OrderLines.
3. Join a small sample and compare the number of distinct orders before and after the join.
4. Calculate order count with distinct OrderID and line sales by summing line amount; compare with the source totals.

### Additional hands-on instruction
Inspect the sales export and locate order_id and customer_id. Compare COUNT rows with unique order IDs.

## Business case
Orders O-100 and O-101 each contain three order lines. A line-level table therefore has six rows but only two orders. A report labelled “6 orders” would mislead operations. Count distinct OrderID for order count and sum line amounts for line revenue; never assume one row means one business transaction.

## Independent practical challenge
Explain which metric needs DISTINCTCOUNT of order ID.

**Deliverable:** Write a grain statement and show a sample duplicate-key test appropriate to that grain.

## Verify your work
After a join, compare row counts, distinct key counts and grand totals to the originals. If the number of orders increases, inspect whether you counted lines rather than unique orders.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Number of unique orders, rather than order lines

**Common pitfall:** Double-counting a parent-level metric after joining child records.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
