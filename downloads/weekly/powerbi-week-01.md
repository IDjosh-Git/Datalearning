# Power BI Desktop · Week 01 · Touring Power BI Desktop and its workspace

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Recognise the Report, Data and Model views, main ribbon and essential panes without prior Power BI experience.

## Where to begin in the tool
Install or open Power BI Desktop, select a blank report and locate Home > Get Data, Transform Data, fields and visualizations panes.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=31982s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Report view
design the canvas that viewers will interact with

### 2. Data view
inspect loaded tables and column values

### 3. Model view
inspect relationships and table directions

### 4. PBIX files
save a versioned report and distinguish the desktop file from the published Power BI service item.

## Why this skill matters
Why this skill matters: A new business analyst is onboarding and must understand where to load, inspect, model and visualise data. The method is not only about producing an attractive figure. Model view: inspect relationships and table directions PBIX files: save a versioned report and distinguish the desktop file from the published Power BI service item. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Install or open Power BI Desktop, select a blank report and locate Home > Get Data, Transform Data, fields and visualizations panes. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Report view — design the canvas that viewers will interact with Then test data view with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply model view and inspect the output for errors.
4. Complete the independent challenge: Open Power BI Desktop, import a practice sales CSV, identify three views and save a PBIX with a descriptive name. Before moving on, check the result against the acceptance criteria: The imported table should appear in Data view and Model view; the Report canvas should remain ready for visuals.

## Study this worked example
```text
Home → Get data → Text/CSV → Transform Data → Close & Apply
```

**How to interpret the output:** Touring Power BI Desktop and its workspace begins with a practical objective: Recognise the Report, Data and Model views, main ribbon and essential panes without prior Power BI experience. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Report view: design the canvas that viewers will interact with Data view: inspect loaded tables and column values Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A new business analyst is onboarding and must understand where to load, inspect, model and visualise data. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Open Power BI Desktop, import a practice sales CSV, identify three views and save a PBIX with a descriptive name.

**What you should hand in:** The imported table should appear in Data view and Model view; the Report canvas should remain ready for visuals.

## Check your result (after attempting)
Expected evidence: The imported table should appear in Data view and Model view; the Report canvas should remain ready for visuals. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Building charts before checking data types or assuming Save publishes to the Power BI Service.

**Common failure:** Building charts before checking data types or assuming Save publishes to the Power BI Service.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
