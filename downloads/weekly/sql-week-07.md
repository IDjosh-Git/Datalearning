# SQL and SQLite · Week 07 · Window functions and time-based comparisons

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Calculate rankings, running totals and period comparisons without losing transaction detail.

## Where to begin in the tool
Use OVER clauses with PARTITION BY and ORDER BY, then inspect window output row by row.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=5402s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. ROW_NUMBER
creates a deterministic per-group ordering when ties are specified

### 2. RANK
shows shared ranks where values tie

### 3. LAG
compares a current row with a previous time period

### 4. Windows versus GROUP BY
window results can preserve row detail while showing aggregate context.

## Why this skill matters
Why this skill matters: The operations team requests a monthly comparison table to feed a line chart and exception report. The method is not only about producing an attractive figure. LAG: compares a current row with a previous time period Windows versus GROUP BY: window results can preserve row detail while showing aggregate context. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use OVER clauses with PARTITION BY and ORDER BY, then inspect window output row by row. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: ROW_NUMBER — creates a deterministic per-group ordering when ties are specified Then test rank with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply lag and inspect the output for errors.
4. Complete the independent challenge: Find the last month versus current month change for each region and create a running-revenue result. Before moving on, check the result against the acceptance criteria: For values 10,15,12 by month, running total is 10,25,37; first LAG is NULL.

## Study this worked example
```text
WITH monthly AS (
 SELECT region,substr(order_date,1,7) AS month,
 ROUND(SUM(quantity*unit_price*(1-discount_pct)),2) AS revenue
 FROM orders WHERE status='Completed' GROUP BY region,substr(order_date,1,7)
)
SELECT region,month,revenue,
LAG(revenue) OVER(PARTITION BY region ORDER BY month) AS prev_revenue,
SUM(revenue) OVER(PARTITION BY region ORDER BY month) AS running_revenue
FROM monthly ORDER BY region,month;
```

**How to interpret the output:** Window functions and time-based comparisons begins with a practical objective: Calculate rankings, running totals and period comparisons without losing transaction detail. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. ROW_NUMBER: creates a deterministic per-group ordering when ties are specified RANK: shows shared ranks where values tie Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: The operations team requests a monthly comparison table to feed a line chart and exception report. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Find the last month versus current month change for each region and create a running-revenue result.

**What you should hand in:** For values 10,15,12 by month, running total is 10,25,37; first LAG is NULL.

## Check your result (after attempting)
Expected evidence: For values 10,15,12 by month, running total is 10,25,37; first LAG is NULL. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Omitting ORDER BY inside an ordered window and interpreting undefined sequence as time.

**Common failure:** Omitting ORDER BY inside an ordered window and interpreting undefined sequence as time.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
