# Sql · Week 09 · Query performance

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Filter early and inspect plans

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=7795s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Query performance depends on the volume of data scanned, join choices, filters, indexes or partitions, and the work required to aggregate or sort results. A SELECT * over a wide table transfers more data than a targeted projection. The database optimiser chooses an execution plan; do not assume the written order of WHERE conditions is the execution order. Begin with correctness, then identify the costly operation from actual plan evidence.

Use EXPLAIN or your database’s plan viewer to understand scan types, join operators, estimated row counts and sort steps. Poor row-count estimates can produce expensive joins; missing or unsuitable indexes may force full scans. Functions applied to indexed date columns can sometimes prevent efficient range filtering. Performance changes should be benchmarked on comparable data and with the same expected result, not judged solely by one lucky run.

## Guided walkthrough in the tool
1. Run a correct baseline query and record its result count and elapsed time.
2. Inspect the execution plan and identify scans, joins or sorts with high estimated cost.
3. Replace an unnecessary SELECT * and rewrite a date filter using sargable range boundaries.
4. Run the revised query and verify identical results, then compare plans and timings.

### Additional hands-on instruction
Use EXPLAIN QUERY PLAN on a filtered orders query; compare narrow projection against SELECT * and identify indexed keys.

## Business case
A report scans five years of transactions to answer a one-month question. Select only needed columns and filter by a sargable date boundary; inspect EXPLAIN before and after. But if a rewritten filter excludes late-night records or alters join semantics, the faster query is not an improvement. Validate identical results before comparing speeds.

## Independent practical challenge
Name two common causes of slow analytical queries.

**Deliverable:** Record the query, estimated approach and result validation, without claiming a speedup from tiny training data.

## Verify your work
An improved plan is useful only if the answer is still correct. Do not remove filters or change join semantics merely to make the runtime shorter.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
missing useful index/partition pruning; join fanout or large scans

**Common pitfall:** Assuming all indexes improve every workload.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
