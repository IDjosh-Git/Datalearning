# Sql · Week 10 · SQL validation

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Reconcile before presenting outputs

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=8209s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
SQL validation asks whether a query’s answer can be trusted, not simply whether it runs successfully. Start with an expected output specification: grain, eligible population, formula and reporting period. Cross-check record counts and totals against a source extract or an independent query. Include unmatched keys, duplicate keys, null counts and boundary-date cases in the review.

Reconciliation differences must be explained. A 1% variance can be acceptable under one documented definition and completely wrong under another. Build test cases for zero records, duplicated IDs, late-arriving transactions and currency inconsistencies. Keep a record of query version, dataset snapshot and assumptions so a reviewer can reproduce the numbers later. A final dashboard should never be the first place the metric is checked.

## Guided walkthrough in the tool
1. Write the specification and expected grain for three business measures.
2. Create independent control queries for total rows, distinct IDs and total amount.
3. Test known exceptions, including missing dates, duplicate keys and records at period boundaries.
4. Prepare a validation log describing each difference, its cause and the resolution.

### Additional hands-on instruction
Build a monthly revenue-by-region query and reconcile summed detail totals to the published summary.

## Business case
A monthly revenue query returns 3.2 million, but the finance export lists 3.1 million. Before changing the query, check differences in returns, currency, date cutoffs, status and duplicated joins. Build an exception table for unmatched transactions. The audit should explain the 0.1 million variance rather than silently making totals agree.

## Independent practical challenge
How do you detect duplicate order IDs?

**Deliverable:** Export a stakeholder-ready table with definitions and one suggested chart.

## Verify your work
The final metric should reconcile with the independently calculated control for the same population and timeframe. When it does not, report the difference instead of concealing it.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
GROUP BY order_id HAVING COUNT(*) > 1

**Common pitfall:** Accepting a plausible number without independent checks.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
