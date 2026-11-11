# SQL and SQLite · Week 03 · GROUP BY, aggregation and KPI queries

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Turn transaction records into business metrics using grouped aggregations.

## Where to begin in the tool
Write SELECT columns and SUM/COUNT aggregates, followed by GROUP BY and optional HAVING.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2334s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. COUNT versus COUNT DISTINCT
distinguish rows from unique customers or orders

### 2. SUM and AVG
aggregate numeric measures at the correct grain

### 3. GROUP BY
groups rows by categories rather than returning each transaction

### 4. HAVING
filters aggregated groups after aggregation, unlike WHERE on individual rows.

## Why this skill matters
Why this skill matters: A retailer needs comparable regional KPIs before creating a dashboard in a BI tool. The method is not only about producing an attractive figure. GROUP BY: groups rows by categories rather than returning each transaction HAVING: filters aggregated groups after aggregation, unlike WHERE on individual rows. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Write SELECT columns and SUM/COUNT aggregates, followed by GROUP BY and optional HAVING. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: COUNT versus COUNT DISTINCT — distinguish rows from unique customers or orders Then test sum and avg with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply group by and inspect the output for errors.
4. Complete the independent challenge: Create a revenue-by-region table and identify the region with the highest completed revenue. Before moving on, check the result against the acceptance criteria: Sum of regions must reconcile to the Completed-only grand total unless intentionally excluded by HAVING.

## Study this worked example
```text
SELECT region,COUNT(DISTINCT order_id) AS orders,
ROUND(SUM(quantity*unit_price*(1-discount_pct)),2) AS net_revenue
FROM orders WHERE status='Completed' GROUP BY region ORDER BY net_revenue DESC;
```

**How to interpret the output:** GROUP BY, aggregation and KPI queries begins with a practical objective: Turn transaction records into business metrics using grouped aggregations. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. COUNT versus COUNT DISTINCT: distinguish rows from unique customers or orders SUM and AVG: aggregate numeric measures at the correct grain Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A retailer needs comparable regional KPIs before creating a dashboard in a BI tool. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create a revenue-by-region table and identify the region with the highest completed revenue.

**What you should hand in:** Sum of regions must reconcile to the Completed-only grand total unless intentionally excluded by HAVING.

## Check your result (after attempting)
Expected evidence: Sum of regions must reconcile to the Completed-only grand total unless intentionally excluded by HAVING. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Mixing ungrouped columns into grouped queries or counting order lines as unique orders.

**Common failure:** Mixing ungrouped columns into grouped queries or counting order lines as unique orders.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
