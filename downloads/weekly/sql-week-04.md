# SQL and SQLite · Week 04 · JOINs, table grain and duplicate control

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Combine fact data with reference tables without accidentally multiplying money.

## Where to begin in the tool
Use SQL JOIN statements and inspect key uniqueness before selecting LEFT or INNER JOIN.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2823s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Primary keys
one product should have one reference row per ProductID

### 2. Foreign keys
order lines may repeat a ProductID legitimately

### 3. LEFT versus INNER
preserving unmatched orders protects the source row count

### 4. Fanout checks
compare COUNT and SUM before and after the join.

## Why this skill matters
Why this skill matters: A merchandising team needs product categories to compare profitability without losing orders with missing reference values. The method is not only about producing an attractive figure. LEFT versus INNER: preserving unmatched orders protects the source row count Fanout checks: compare COUNT and SUM before and after the join. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use SQL JOIN statements and inspect key uniqueness before selecting LEFT or INNER JOIN. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Primary keys — one product should have one reference row per ProductID Then test foreign keys with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply left versus inner and inspect the output for errors.
4. Complete the independent challenge: Join orders to a product lookup and list unmatched ProductIDs for review. Before moving on, check the result against the acceptance criteria: LEFT JOIN should keep every source order row if the product dimension is unique; totals should remain unchanged.

## Study this worked example
```text
SELECT o.order_id,o.customer_id,c.segment,
o.quantity*o.unit_price*(1-o.discount_pct) AS net_revenue
FROM orders o LEFT JOIN customers c ON o.customer_id=c.customer_id;
```

**How to interpret the output:** JOINs, table grain and duplicate control begins with a practical objective: Combine fact data with reference tables without accidentally multiplying money. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. Primary keys: one product should have one reference row per ProductID Foreign keys: order lines may repeat a ProductID legitimately Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A merchandising team needs product categories to compare profitability without losing orders with missing reference values. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Join orders to a product lookup and list unmatched ProductIDs for review.

**What you should hand in:** LEFT JOIN should keep every source order row if the product dimension is unique; totals should remain unchanged.

## Check your result (after attempting)
Expected evidence: LEFT JOIN should keep every source order row if the product dimension is unique; totals should remain unchanged. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Joining to a dimension with duplicate keys and silently doubling sales totals.

**Common failure:** Joining to a dimension with duplicate keys and silently doubling sales totals.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
