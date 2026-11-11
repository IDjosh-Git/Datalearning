# Tableau · Week 03 · Building bar charts, line charts and a readable visual

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Choose the right shelf/marks combinations for rankings and trends.

## Where to begin in the tool
Use Rows and Columns shelves, Show Me and Marks to create a sorted bar view and time-series line.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=27620s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Bar charts
compare category size with a zero baseline

### 2. Line charts
trend numeric values against ordered dates

### 3. Sorting
sort by the correct measure rather than alphabetic category

### 4. Tooltips and labels
show useful units and context without duplicating clutter.

## Why this skill matters
Why this skill matters: A monthly business review requires a clear ranking plus sales movement over time. The method is not only about producing an attractive figure. Sorting: sort by the correct measure rather than alphabetic category Tooltips and labels: show useful units and context without duplicating clutter. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Rows and Columns shelves, Show Me and Marks to create a sorted bar view and time-series line. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Bar charts — compare category size with a zero baseline Then test line charts with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply sorting and inspect the output for errors.
4. Complete the independent challenge: Produce a regional ranking and a monthly revenue line, then describe one pattern supported by the charts. Before moving on, check the result against the acceptance criteria: Regional totals sum to the same filtered base revenue; monthly dates appear chronologically.

## Study this worked example
```text
Rows: Region; Columns: SUM(Revenue); Sort descending
Columns: MONTH(OrderDate); Rows: SUM(Revenue); Marks: Line
```

**How to interpret the output:** Building bar charts, line charts and a readable visual begins with a practical objective: Choose the right shelf/marks combinations for rankings and trends. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Bar charts: compare category size with a zero baseline Line charts: trend numeric values against ordered dates Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A monthly business review requires a clear ranking plus sales movement over time. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Produce a regional ranking and a monthly revenue line, then describe one pattern supported by the charts.

**What you should hand in:** Regional totals sum to the same filtered base revenue; monthly dates appear chronologically.

## Check your result (after attempting)
Expected evidence: Regional totals sum to the same filtered base revenue; monthly dates appear chronologically. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a continuous numeric field as a category or letting auto-sorted dates scramble the trend.

**Common failure:** Using a continuous numeric field as a category or letting auto-sorted dates scramble the trend.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
