# SQL and SQLite · Week 06 · CTEs, subqueries and maintainable reporting SQL

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Split a difficult analysis into readable stages that can be checked separately.

## Where to begin in the tool
Start with WITH named CTEs, review the intermediate result, then select the final summary.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=5642s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. CTEs
provide named temporary result sets within a statement

### 2. Layering
filter valid orders before the final group and ranking

### 3. Reuse
avoid repeating hardcoded filters across many expressions

### 4. Debugging
execute a CTE's SELECT alone to verify row counts before adding complexity.

## Why this skill matters
Why this skill matters: An analytics engineer is preparing a report query colleagues must be able to read and audit. The method is not only about producing an attractive figure. Reuse: avoid repeating hardcoded filters across many expressions Debugging: execute a CTE's SELECT alone to verify row counts before adding complexity. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Start with WITH named CTEs, review the intermediate result, then select the final summary. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: CTEs — provide named temporary result sets within a statement Then test layering with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply reuse and inspect the output for errors.
4. Complete the independent challenge: Rewrite a regional KPI report as two CTEs and show how you verified the filtered source rows. Before moving on, check the result against the acceptance criteria: The sum of regions should equal the Completed-only sum from the base table, with matching date ranges.

## Study this worked example
```text
WITH completed AS (SELECT * FROM orders WHERE status='Completed'),
regions AS (SELECT region,SUM(quantity*unit_price*(1-discount_pct)) AS total
FROM completed GROUP BY region)
SELECT * FROM regions ORDER BY total DESC;
```

**How to interpret the output:** CTEs, subqueries and maintainable reporting SQL begins with a practical objective: Split a difficult analysis into readable stages that can be checked separately. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. CTEs: provide named temporary result sets within a statement Layering: filter valid orders before the final group and ranking Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An analytics engineer is preparing a report query colleagues must be able to read and audit. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Rewrite a regional KPI report as two CTEs and show how you verified the filtered source rows.

**What you should hand in:** The sum of regions should equal the Completed-only sum from the base table, with matching date ranges.

## Check your result (after attempting)
Expected evidence: The sum of regions should equal the Completed-only sum from the base table, with matching date ranges. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Treating a CTE as a permanently saved table or hiding inconsistent filters in many nested clauses.

**Common failure:** Treating a CTE as a permanently saved table or hiding inconsistent filters in many nested clauses.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
