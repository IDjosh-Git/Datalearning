# Data Analysis · Week 06 · Preparing data for a repeatable analysis

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Separate raw source, cleaned records and reporting summaries into traceable layers.

## Where to begin in the tool
Create Raw, Clean and Summary sheets or equivalent tables in a notebook.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=21589s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Raw preservation
keep an untouched reference for audit

### 2. Cleaning rules
record how nulls and labels were handled

### 3. Aggregate tables
report one row per reporting group

### 4. Reproducibility
repeat the same steps when next week's data arrives.

## Why this skill matters
Why this skill matters: A junior analyst must repeat last week's report using a new sales export next month. The method is not only about producing an attractive figure. Aggregate tables: report one row per reporting group Reproducibility: repeat the same steps when next week's data arrives. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Create Raw, Clean and Summary sheets or equivalent tables in a notebook. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Raw preservation — keep an untouched reference for audit Then test cleaning rules with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply aggregate tables and inspect the output for errors.
4. Complete the independent challenge: Describe a simple cleaning flow and create an audit trail with row counts before and after processing. Before moving on, check the result against the acceptance criteria: Every dropped or excluded record has a reason, and category totals reconcile to the clean rows.

## Study this worked example
```text
Raw 100 rows → 3 flagged → Clean 97 valid records
Summary groups by Region and Month
```

**How to interpret the output:** Preparing data for a repeatable analysis begins with a practical objective: Separate raw source, cleaned records and reporting summaries into traceable layers. In Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Raw preservation: keep an untouched reference for audit Cleaning rules: record how nulls and labels were handled Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A junior analyst must repeat last week's report using a new sales export next month. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Describe a simple cleaning flow and create an audit trail with row counts before and after processing.

**What you should hand in:** Every dropped or excluded record has a reason, and category totals reconcile to the clean rows.

## Check your result (after attempting)
Expected evidence: Every dropped or excluded record has a reason, and category totals reconcile to the clean rows. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Editing raw source values without documenting the transformation.

**Common failure:** Editing raw source values without documenting the transformation.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
