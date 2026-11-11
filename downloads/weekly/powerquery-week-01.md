# Power Query · Week 01 · Finding the Power Query editor and importing data

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Learn the Power Query editor, Query pane, preview grid, ribbon and Applied Steps before transformations.

## Where to begin in the tool
Open Excel > Data > Get Data or Power BI Desktop > Transform Data; locate Queries, Applied Steps and data preview.


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
### 1. Source connections
determine where the file is read during refresh

### 2. Preview grid
shows a sample and data-type icons for each column

### 3. Applied Steps
records an ordered set of transformations

### 4. Load versus Transform
choose whether to inspect and clean before sending results to Excel or the data model.

## Why this skill matters
Why this skill matters: A reporting assistant must repeatedly import monthly CSV exports without hand-copying and pasting rows. The method is not only about producing an attractive figure. Applied Steps: records an ordered set of transformations Load versus Transform: choose whether to inspect and clean before sending results to Excel or the data model. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open Excel > Data > Get Data or Power BI Desktop > Transform Data; locate Queries, Applied Steps and data preview. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Source connections — determine where the file is read during refresh Then test preview grid with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply applied steps and inspect the output for errors.
4. Complete the independent challenge: Import the weekly sales CSV, identify the Source and Changed Type steps, and explain how to refresh the result. Before moving on, check the result against the acceptance criteria: The loaded output reflects the source preview and recorded transformations; raw CSV is unchanged.

## Study this worked example
```text
Get Data → Text/CSV → Transform Data → Promote Headers → Close & Load
```

**How to interpret the output:** Finding the Power Query editor and importing data begins with a practical objective: Learn the Power Query editor, Query pane, preview grid, ribbon and Applied Steps before transformations. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Source connections: determine where the file is read during refresh Preview grid: shows a sample and data-type icons for each column Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A reporting assistant must repeatedly import monthly CSV exports without hand-copying and pasting rows. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Import the weekly sales CSV, identify the Source and Changed Type steps, and explain how to refresh the result.

**What you should hand in:** The loaded output reflects the source preview and recorded transformations; raw CSV is unchanged.

## Check your result (after attempting)
Expected evidence: The loaded output reflects the source preview and recorded transformations; raw CSV is unchanged. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Editing final worksheet cells and assuming those changes will survive future Power Query refreshes.

**Common failure:** Editing final worksheet cells and assuming those changes will survive future Power Query refreshes.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
