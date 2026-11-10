# Sql · Week 05 · NULL and CASE

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Handle unknowns consistently

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=4111s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
NULL represents an absent or unknown value, not an ordinary value such as 0 or empty text. Comparisons involving NULL usually evaluate to unknown; use IS NULL and IS NOT NULL rather than = NULL. COALESCE can supply a fallback, but converting an unknown amount to zero changes the business meaning. Decide whether zero is appropriate for the metric, and document that assumption.

CASE produces conditional output: for example, classify an order as Large when amount >= 10000, Medium when >= 5000, and Small otherwise. Evaluate conditions in the intended order because the first matching WHEN determines the result. Use explicit ELSE handling for unexpected statuses; silently assigning every missing case to Small can hide data-quality issues. Test threshold boundaries and actual NULL rows.

## Guided walkthrough in the tool
1. Count missing and nonmissing values before applying COALESCE.
2. Write a CASE classification with ordered thresholds and an explicit ELSE.
3. Test records exactly on each threshold and records with NULL amount.
4. Aggregate counts by the new category and reconcile them to the input row count.

### Additional hands-on instruction
Write a CASE expression for an order value band and use COALESCE only where the business rule permits a default.

## Business case
The amount is missing for some imported records. COALESCE(amount,0) may seem convenient, but it changes “not known” into “known zero”. In a dashboard, classify these values as Unknown until a business rule is approved. In a CASE expression, handle NULL before comparing numeric thresholds so missing records do not fall into an ordinary low-value group.

## Independent practical challenge
Why does amount = NULL return no matches?

**Deliverable:** Count unclassified rows and explain how a NULL differs from the numeric value 0.

## Verify your work
If every record must receive one label, the category counts should add up to the eligible row count. A missing amount should be reported as Unknown unless the business definition explicitly treats it as zero.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
NULL is unknown; use IS NULL

**Common pitfall:** Conflating NULL with zero or an empty string.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
