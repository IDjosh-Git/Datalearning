# AI for Data Analysis · Week 06 · AI-assisted Python analysis and debugging

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Use AI to explain code, diagnose errors and draft reproducible pandas transformations.

## Where to begin in the tool
Share a minimal synthetic traceback and short code snippet, then test the proposed change in the Python editor.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=DLpz6V_4SpA&t=488s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Error context
include the exact traceback and expected behaviour

### 2. Pandas transforms
request explicit column names, dtype checks and copies

### 3. Reproducibility
state package versions and file assumptions

### 4. Tests
run with a changed input to ensure the fix generalises.

## Why this skill matters
Why this skill matters: A data team wants an assistant to reduce debugging time while keeping changes reviewable. The method is not only about producing an attractive figure. Reproducibility: state package versions and file assumptions Tests: run with a changed input to ensure the fix generalises. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Share a minimal synthetic traceback and short code snippet, then test the proposed change in the Python editor. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Error context — include the exact traceback and expected behaviour Then test pandas transforms with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply reproducibility and inspect the output for errors.
4. Complete the independent challenge: Fix an intentionally broken pandas aggregation and write one automated or manual validation check. Before moving on, check the result against the acceptance criteria: Code must execute without hiding errors; revenue output matches an independent filtered sum.

## Study this worked example
```text
Prompt: 'Explain why df[Revenue].sum() raises NameError, correct the code, and create an assertion for Paid revenue.'
```

**How to interpret the output:** AI-assisted Python analysis and debugging begins with a practical objective: Use AI to explain code, diagnose errors and draft reproducible pandas transformations. In AI for Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Error context: include the exact traceback and expected behaviour Pandas transforms: request explicit column names, dtype checks and copies Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A data team wants an assistant to reduce debugging time while keeping changes reviewable. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Fix an intentionally broken pandas aggregation and write one automated or manual validation check.

**What you should hand in:** Code must execute without hiding errors; revenue output matches an independent filtered sum.

## Check your result (after attempting)
Expected evidence: Code must execute without hiding errors; revenue output matches an independent filtered sum. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Blindly running generated pip commands or exposing secrets in error logs shared with AI.

**Common failure:** Blindly running generated pip commands or exposing secrets in error logs shared with AI.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
