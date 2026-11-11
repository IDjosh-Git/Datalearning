# AI for Data Analysis · Week 04 · Generating and checking Excel formulas with AI

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Use AI to draft formulas while personally verifying references and edge cases.

## Where to begin in the tool
Ask for the target Excel version, table fields, criteria and three test cases before accepting a generated formula.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=DLpz6V_4SpA&t=205s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Structured references
table column names are safer than hardcoded ranges

### 2. Condition logic
SUMIFS and IF must match business inclusion rules

### 3. Lookup behaviour
XLOOKUP should handle missing keys

### 4. Testing
compare generated output with a hand-calculated three-row sample.

## Why this skill matters
Why this skill matters: A finance analyst wants to accelerate spreadsheet construction without weakening controls. The method is not only about producing an attractive figure. Lookup behaviour: XLOOKUP should handle missing keys Testing: compare generated output with a hand-calculated three-row sample. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Ask for the target Excel version, table fields, criteria and three test cases before accepting a generated formula. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Structured references — table column names are safer than hardcoded ranges Then test condition logic with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply lookup behaviour and inspect the output for errors.
4. Complete the independent challenge: Ask AI for a SUMIFS and XLOOKUP formula, then test both on a small synthetic table. Before moving on, check the result against the acceptance criteria: The Paid North result matches hand arithmetic; an unknown product ID returns an explicit missing value.

## Study this worked example
```text
Prompt: 'Write an Excel SUMIFS formula for tblSales Revenue where Status=Paid and Region=North. Explain each argument and add a test.'
```

**How to interpret the output:** Generating and checking Excel formulas with AI begins with a practical objective: Use AI to draft formulas while personally verifying references and edge cases. In AI for Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Structured references: table column names are safer than hardcoded ranges Condition logic: SUMIFS and IF must match business inclusion rules Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A finance analyst wants to accelerate spreadsheet construction without weakening controls. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Ask AI for a SUMIFS and XLOOKUP formula, then test both on a small synthetic table.

**What you should hand in:** The Paid North result matches hand arithmetic; an unknown product ID returns an explicit missing value.

## Check your result (after attempting)
Expected evidence: The Paid North result matches hand arithmetic; an unknown product ID returns an explicit missing value. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Pasting a formula whose workbook/table names do not exist, then assuming a #NAME? error is harmless.

**Common failure:** Pasting a formula whose workbook/table names do not exist, then assuming a #NAME? error is harmless.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
