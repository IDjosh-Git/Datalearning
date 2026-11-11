# SQL and SQLite · Week 02 · Writing SELECT, WHERE, ORDER BY and LIMIT

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Retrieve precise records instead of dumping entire tables to the screen.

## Where to begin in the tool
In the SQL editor, type SELECT followed by columns, FROM table, WHERE conditions and ORDER BY expression.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=1484s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Projection
choose only needed columns and give useful aliases

### 2. Filtering
apply numeric, text and date predicates with correct syntax

### 3. Sorting
sort explicitly when a top-N list is requested

### 4. Limiting
use LIMIT to preview rows without assuming natural database order.

## Why this skill matters
Why this skill matters: A trading manager requests a precise list of the largest completed orders for follow-up. The method is not only about producing an attractive figure. Sorting: sort explicitly when a top-N list is requested Limiting: use LIMIT to preview rows without assuming natural database order. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. In the SQL editor, type SELECT followed by columns, FROM table, WHERE conditions and ORDER BY expression. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Projection — choose only needed columns and give useful aliases Then test filtering with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply sorting and inspect the output for errors.
4. Complete the independent challenge: Return ten highest-value completed orders and explain why the filtering happens before ranking. Before moving on, check the result against the acceptance criteria: All returned rows are Completed with revenue over 10000 and sorted descending; tie handling should be explained.

## Study this worked example
```text
SELECT order_id,region,quantity*unit_price*(1-discount_pct) AS net_revenue
FROM orders WHERE status='Completed' AND quantity*unit_price*(1-discount_pct)>10000
ORDER BY net_revenue DESC LIMIT 10;
```

**How to interpret the output:** Writing SELECT, WHERE, ORDER BY and LIMIT begins with a practical objective: Retrieve precise records instead of dumping entire tables to the screen. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. Projection: choose only needed columns and give useful aliases Filtering: apply numeric, text and date predicates with correct syntax Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A trading manager requests a precise list of the largest completed orders for follow-up. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Return ten highest-value completed orders and explain why the filtering happens before ranking.

**What you should hand in:** All returned rows are Completed with revenue over 10000 and sorted descending; tie handling should be explained.

## Check your result (after attempting)
Expected evidence: All returned rows are Completed with revenue over 10000 and sorted descending; tie handling should be explained. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Assuming the last inserted row is always the last result when ORDER BY is absent.

**Common failure:** Assuming the last inserted row is always the last result when ORDER BY is absent.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
