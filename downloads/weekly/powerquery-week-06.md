# Power Query · Week 06 · Appending monthly files and controlling schema drift

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Combine compatible files vertically into one analysis-ready table.

## Where to begin in the tool
Use Home > Append Queries and inspect the combined preview and column types afterwards.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=VO-MyVMKUC4 (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Append versus merge
append stacks rows whereas merge adds related columns

### 2. Schema alignment
ensure identical field names and measurement units

### 3. Null columns
unmatched fields can introduce blanks after append

### 4. Refresh
new month extracts should follow the same documented cleaning logic.

## Why this skill matters
Why this skill matters: A reporting team wants one growing sales dataset from monthly CSV exports. The method is not only about producing an attractive figure. Null columns: unmatched fields can introduce blanks after append Refresh: new month extracts should follow the same documented cleaning logic. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Home > Append Queries and inspect the combined preview and column types afterwards. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Append versus merge — append stacks rows whereas merge adds related columns Then test schema alignment with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply null columns and inspect the output for errors.
4. Complete the independent challenge: Append two monthly datasets and compare the combined sum with their independently calculated totals. Before moving on, check the result against the acceptance criteria: Combined row count equals the sum of compatible sources and revenue equals the sum of each month's revenue.

## Study this worked example
```text
Append JanOrders and FebOrders → CombinedOrders
Check TotalRows = JanRows + FebRows
```

**How to interpret the output:** Appending monthly files and controlling schema drift begins with a practical objective: Combine compatible files vertically into one analysis-ready table. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Append versus merge: append stacks rows whereas merge adds related columns Schema alignment: ensure identical field names and measurement units Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A reporting team wants one growing sales dataset from monthly CSV exports. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Append two monthly datasets and compare the combined sum with their independently calculated totals.

**What you should hand in:** Combined row count equals the sum of compatible sources and revenue equals the sum of each month's revenue.

## Check your result (after attempting)
Expected evidence: Combined row count equals the sum of compatible sources and revenue equals the sum of each month's revenue. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Appending transactions in different currencies without converting or flagging their units.

**Common failure:** Appending transactions in different currencies without converting or flagging their units.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
