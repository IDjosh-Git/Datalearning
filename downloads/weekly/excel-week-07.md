# Microsoft Excel · Week 07 · Choosing and interpreting Excel charts

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Create truthful visuals that match the business question and explain what each chart shows.

## Where to begin in the tool
Select a PivotTable summary, use Insert > Recommended Charts or the chart family, then format axes and titles.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=22498s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Lines
show time trends with dates in chronological order

### 2. Bars
compare categories starting quantitative bars from zero

### 3. KPI context
report units, dates and baseline alongside a headline metric

### 4. Chart integrity
avoid truncated axes, 3D effects and over-coloured categories.

## Why this skill matters
Why this skill matters: The sales director needs two charts that communicate trends and priorities in under one minute. The method is not only about producing an attractive figure. KPI context: report units, dates and baseline alongside a headline metric Chart integrity: avoid truncated axes, 3D effects and over-coloured categories. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Select a PivotTable summary, use Insert > Recommended Charts or the chart family, then format axes and titles. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Lines — show time trends with dates in chronological order Then test bars with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply kpi context and inspect the output for errors.
4. Complete the independent challenge: Produce a three-month revenue trend, a region ranking and one sentence distinguishing an observed change from its cause. Before moving on, check the result against the acceptance criteria: The line must connect Jan, Feb and Mar in order; (135000-150000)/150000 = -10% month-on-month.

## Study this worked example
```text
Monthly revenue: Jan 120000, Feb 150000, Mar 135000
Line chart → Feb peak; Mar is 10% below Feb
```

**How to interpret the output:** Choosing and interpreting Excel charts begins with a practical objective: Create truthful visuals that match the business question and explain what each chart shows. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Lines: show time trends with dates in chronological order Bars: compare categories starting quantitative bars from zero Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: The sales director needs two charts that communicate trends and priorities in under one minute. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Produce a three-month revenue trend, a region ranking and one sentence distinguishing an observed change from its cause.

**What you should hand in:** The line must connect Jan, Feb and Mar in order; (135000-150000)/150000 = -10% month-on-month.

## Check your result (after attempting)
Expected evidence: The line must connect Jan, Feb and Mar in order; (135000-150000)/150000 = -10% month-on-month. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a pie chart with many categories or writing 'marketing caused the fall' without evidence.

**Common failure:** Using a pie chart with many categories or writing 'marketing caused the fall' without evidence.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
