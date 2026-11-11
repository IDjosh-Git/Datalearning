# Data Analysis · Week 03 · Data grain, keys and simple relationships

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Understand what one row represents and why duplicates can be legitimate.

## Where to begin in the tool
Inspect OrderID, ProductID and Status fields and compare counts of rows and distinct orders.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=2823s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Granularity
one row per order differs from one row per order line

### 2. Unique keys
identify records without confusion

### 3. Relationships
join descriptive tables by stable keys

### 4. Reconciliation
count both total rows and distinct transactions to expose the difference.

## Why this skill matters
Why this skill matters: A logistics dashboard must show unique shipments rather than line items. The method is not only about producing an attractive figure. Relationships: join descriptive tables by stable keys Reconciliation: count both total rows and distinct transactions to expose the difference. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Inspect OrderID, ProductID and Status fields and compare counts of rows and distinct orders. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Granularity — one row per order differs from one row per order line Then test unique keys with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply relationships and inspect the output for errors.
4. Complete the independent challenge: Explain how three rows can represent two purchases and choose the right measure for 'number of orders'. Before moving on, check the result against the acceptance criteria: COUNTROWS = 3 but DISTINCTCOUNT(OrderID) = 2; both figures are right for different questions.

## Study this worked example
```text
Orders: O1 appears twice for two products, O2 once
Row count = 3; unique orders = 2
```

**How to interpret the output:** Data grain, keys and simple relationships begins with a practical objective: Understand what one row represents and why duplicates can be legitimate. In Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Granularity: one row per order differs from one row per order line Unique keys: identify records without confusion Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A logistics dashboard must show unique shipments rather than line items. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Explain how three rows can represent two purchases and choose the right measure for 'number of orders'.

**What you should hand in:** COUNTROWS = 3 but DISTINCTCOUNT(OrderID) = 2; both figures are right for different questions.

## Check your result (after attempting)
Expected evidence: COUNTROWS = 3 but DISTINCTCOUNT(OrderID) = 2; both figures are right for different questions. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Calling repeated OrderID values erroneous duplicates without checking line-item grain.

**Common failure:** Calling repeated OrderID values erroneous duplicates without checking line-item grain.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
