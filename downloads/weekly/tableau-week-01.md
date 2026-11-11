# Tableau · Week 01 · Tableau interface, worksheets and first connection

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Become familiar with Tableau's start page, data source pane, shelves, Marks card and sheet/dashboard/story tabs.

## Where to begin in the tool
Open Tableau Public or Desktop, connect to a CSV, inspect the Data Source grid and create a new Worksheet.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=26209s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Start page
connects to files or authorised servers

### 2. Data pane
separates dimensions from measures and shows field roles

### 3. Shelves
Rows and Columns determine chart structure

### 4. Marks card
controls colour, size, label, detail and tooltip without changing original data.

## Why this skill matters
Why this skill matters: A trainee visual analyst must navigate Tableau before being asked to build a management dashboard. The method is not only about producing an attractive figure. Shelves: Rows and Columns determine chart structure Marks card: controls colour, size, label, detail and tooltip without changing original data. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open Tableau Public or Desktop, connect to a CSV, inspect the Data Source grid and create a new Worksheet. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Start page — connects to files or authorised servers Then test data pane with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply shelves and inspect the output for errors.
4. Complete the independent challenge: Load a sample sales dataset, identify two dimensions and two measures and save the workbook with a descriptive name. Before moving on, check the result against the acceptance criteria: The sheet should show a bar per region when Region is on Rows and SUM(Revenue) on Columns.

## Study this worked example
```text
Connect to learning_sales_2026.csv → Sheet 1 → drag Region to Rows; Revenue to Columns
```

**How to interpret the output:** Tableau interface, worksheets and first connection begins with a practical objective: Become familiar with Tableau's start page, data source pane, shelves, Marks card and sheet/dashboard/story tabs. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Start page: connects to files or authorised servers Data pane: separates dimensions from measures and shows field roles Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A trainee visual analyst must navigate Tableau before being asked to build a management dashboard. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Load a sample sales dataset, identify two dimensions and two measures and save the workbook with a descriptive name.

**What you should hand in:** The sheet should show a bar per region when Region is on Rows and SUM(Revenue) on Columns.

## Check your result (after attempting)
Expected evidence: The sheet should show a bar per region when Region is on Rows and SUM(Revenue) on Columns. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Treating the number of marks in a chart as the number of raw records in a dataset.

**Common failure:** Treating the number of marks in a chart as the number of raw records in a dataset.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
