# Sql · Week 02 · SELECT and WHERE

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Retrieve precisely filtered records

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=1484s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
SELECT chooses columns and WHERE restricts which rows qualify. Start with a deliberately small projection rather than SELECT * when writing a report. SQL evaluates logical conditions against each row, so a filter such as status = 'Completed' AND amount >= 10000 includes only rows meeting both conditions. ORDER BY determines display order; without it, the database does not promise a particular row sequence.

Text matching depends on the database’s collation and case-handling rules. Date filters deserve special care: timestamp fields include a time of day, so filtering with BETWEEN inclusive end dates can miss records on the last day. A robust month boundary uses >= the start of the month and < the first moment of the following month. Check how NULL behaves before assuming NOT IN or <> includes missing values.

## Guided walkthrough in the tool
1. Inspect table columns and write down the exact fields needed for a report.
2. Filter completed orders with a date boundary; inspect a few records at the start and end.
3. Add ORDER BY date DESC and LIMIT or TOP if appropriate to the SQL dialect.
4. Compare filtered row counts with an independent source summary and check for unintentional exclusions.

### Additional hands-on instruction
In orders, return order_id, region and order_date for a single region; use LIMIT for a readable preview.

## Business case
An order occurs at 2026-11-30 18:45. A filter order_timestamp <= '2026-11-30' may exclude it because the literal often resolves to midnight. The safer November range is >= '2026-11-01' and < '2026-12-01'. Check the database’s timestamp and timezone rules before relying on boundaries.

## Independent practical challenge
Write a filter for orders above 500.

**Deliverable:** Explain why filtering before aggregation changes the population but ordering does not.

## Verify your work
Verify time zones and timestamp types when reporting daily or monthly results. Explain why an exclusive upper boundary is safer than testing a date field for exact equality.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
WHERE amount > 500

**Common pitfall:** Using HAVING instead of WHERE for ordinary row filtering.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
