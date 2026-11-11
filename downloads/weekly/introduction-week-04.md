# Data Analysis · Week 04 · Understanding and measuring data quality

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Identify missing values, erroneous amounts and duplicate keys before trusting a calculation.

## Where to begin in the tool
Use filters, conditional formatting or data-profiling tools to inspect required columns.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=12881s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Completeness
count missing required dates and identifiers

### 2. Validity
flag negative quantities where forbidden

### 3. Consistency
standardise category labels

### 4. Accuracy controls
reconcile source counts after any cleaning step.

## Why this skill matters
Why this skill matters: An internal audit team needs a defensible note on source quality before accepting a revenue report. The method is not only about producing an attractive figure. Consistency: standardise category labels Accuracy controls: reconcile source counts after any cleaning step. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use filters, conditional formatting or data-profiling tools to inspect required columns. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Completeness — count missing required dates and identifiers Then test validity with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply consistency and inspect the output for errors.
4. Complete the independent challenge: Write three quality rules and quantify the rows that fail each rule in the practice file. Before moving on, check the result against the acceptance criteria: Each rule has a count, rationale and treatment; source and cleaned totals reconcile after approved changes.

## Study this worked example
```text
Orders = 1000; missing dates = 18; duplicate transaction keys = 12
Investigate before removal
```

**How to interpret the output:** Understanding and measuring data quality begins with a practical objective: Identify missing values, erroneous amounts and duplicate keys before trusting a calculation. In Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Completeness: count missing required dates and identifiers Validity: flag negative quantities where forbidden Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An internal audit team needs a defensible note on source quality before accepting a revenue report. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Write three quality rules and quantify the rows that fail each rule in the practice file.

**What you should hand in:** Each rule has a count, rationale and treatment; source and cleaned totals reconcile after approved changes.

## Check your result (after attempting)
Expected evidence: Each rule has a count, rationale and treatment; source and cleaned totals reconcile after approved changes. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Replacing every null with zero and silently changing averages.

**Common failure:** Replacing every null with zero and silently changing averages.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
