# Power Query · Week 03 · Cleaning nulls, duplicates and transformation errors

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Build a repeatable quality-control sequence with defensible exception handling.

## Where to begin in the tool
Use the column filter and Transform > Replace Values, Remove Errors only after inspecting the affected rows.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Nulls
distinguish absent facts from zero-valued facts

### 2. Errors
filter and inspect transformation errors before removal

### 3. Duplicates
specify transaction-grain keys before removing rows

### 4. Audit evidence
record source count, rows removed and fields corrected.

## Why this skill matters
Why this skill matters: A BI refresh fails when the source contains malformed amounts and duplicate transaction IDs. The method is not only about producing an attractive figure. Duplicates: specify transaction-grain keys before removing rows Audit evidence: record source count, rows removed and fields corrected. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use the column filter and Transform > Replace Values, Remove Errors only after inspecting the affected rows. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Nulls — distinguish absent facts from zero-valued facts Then test errors with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply duplicates and inspect the output for errors.
4. Complete the independent challenge: Produce a small issues table and a cleaned sales query while keeping a raw reference query untouched. Before moving on, check the result against the acceptance criteria: The number of cleaned rows plus investigated removals must reconcile to the input rows.

## Study this worked example
```text
Quality checks: missing OrderID count; duplicate OrderID count; invalid Amount count
```

**How to interpret the output:** Cleaning nulls, duplicates and transformation errors begins with a practical objective: Build a repeatable quality-control sequence with defensible exception handling. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Nulls: distinguish absent facts from zero-valued facts Errors: filter and inspect transformation errors before removal Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A BI refresh fails when the source contains malformed amounts and duplicate transaction IDs. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Produce a small issues table and a cleaned sales query while keeping a raw reference query untouched.

**What you should hand in:** The number of cleaned rows plus investigated removals must reconcile to the input rows.

## Check your result (after attempting)
Expected evidence: The number of cleaned rows plus investigated removals must reconcile to the input rows. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Removing all null rows and inadvertently excluding profitable transactions.

**Common failure:** Removing all null rows and inadvertently excluding profitable transactions.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
