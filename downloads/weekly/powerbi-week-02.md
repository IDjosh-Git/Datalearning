# Power BI Desktop · Week 02 · Connecting and profiling data in Power Query

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Import spreadsheets or CSVs and identify incorrect types, missing fields and quality problems before modelling.

## Where to begin in the tool
From Power BI Desktop choose Home > Transform Data; inspect Column quality, Column distribution and Applied Steps.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=32751s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Import options
choose the correct delimiter, encoding and header row

### 2. Data types
dates must really be Date and sales values numeric

### 3. Profiling
inspect errors, blanks and unique counts before removal

### 4. Refresh
repeat transformations reliably instead of manually altering report output.

## Why this skill matters
Why this skill matters: A commercial team exports sales from several systems with inconsistent date and currency columns. The method is not only about producing an attractive figure. Profiling: inspect errors, blanks and unique counts before removal Refresh: repeat transformations reliably instead of manually altering report output. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. From Power BI Desktop choose Home > Transform Data; inspect Column quality, Column distribution and Applied Steps. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Import options — choose the correct delimiter, encoding and header row Then test data types with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply profiling and inspect the output for errors.
4. Complete the independent challenge: Document the source schema, correct at least two types and explain one missing-value decision. Before moving on, check the result against the acceptance criteria: Your transformed table should include numeric Amount and a valid OrderDate with documented errors.

## Study this worked example
```text
Power Query: promote headers → set types → inspect Amount and Date → Close & Apply
```

**How to interpret the output:** Connecting and profiling data in Power Query begins with a practical objective: Import spreadsheets or CSVs and identify incorrect types, missing fields and quality problems before modelling. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Import options: choose the correct delimiter, encoding and header row Data types: dates must really be Date and sales values numeric Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A commercial team exports sales from several systems with inconsistent date and currency columns. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Document the source schema, correct at least two types and explain one missing-value decision.

**What you should hand in:** Your transformed table should include numeric Amount and a valid OrderDate with documented errors.

## Check your result (after attempting)
Expected evidence: Your transformed table should include numeric Amount and a valid OrderDate with documented errors. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Silently replacing invalid sales values with zero, which alters the business measure.

**Common failure:** Silently replacing invalid sales values with zero, which alters the business measure.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
