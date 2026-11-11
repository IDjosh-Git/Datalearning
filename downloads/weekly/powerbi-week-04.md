# Power BI Desktop · Week 04 · DAX measures and evaluation context

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Write measures that react correctly to slicers and compare them with calculated columns.

## Where to begin in the tool
Choose Modeling > New measure, write DAX and place the result on a Card and in a table visual.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=34053s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Measures versus columns
a measure aggregates in the current filter context

### 2. SUM and DISTINCTCOUNT
compute revenue and orders based on model relationships

### 3. DIVIDE
safely handles zero denominators

### 4. Context
row selections and slicers change which fact rows contribute to a measure.

## Why this skill matters
Why this skill matters: Management wants accurate performance metrics that adjust instantly to the selected region and period. The method is not only about producing an attractive figure. DIVIDE: safely handles zero denominators Context: row selections and slicers change which fact rows contribute to a measure. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Choose Modeling > New measure, write DAX and place the result on a Card and in a table visual. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Measures versus columns — a measure aggregates in the current filter context Then test sum and distinctcount with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply divide and inspect the output for errors.
4. Complete the independent challenge: Create Revenue, Orders and AOV measures; filter by Region and compare totals with raw data. Before moving on, check the result against the acceptance criteria: AOV must equal selected revenue divided by selected distinct orders, not average of precomputed category averages.

## Study this worked example
```text
Sales Revenue = SUM(FactSales[Revenue])
Orders = DISTINCTCOUNT(FactSales[OrderID])
AOV = DIVIDE([Sales Revenue],[Orders])
```

**How to interpret the output:** DAX measures and evaluation context begins with a practical objective: Write measures that react correctly to slicers and compare them with calculated columns. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Measures versus columns: a measure aggregates in the current filter context SUM and DISTINCTCOUNT: compute revenue and orders based on model relationships Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: Management wants accurate performance metrics that adjust instantly to the selected region and period. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create Revenue, Orders and AOV measures; filter by Region and compare totals with raw data.

**What you should hand in:** AOV must equal selected revenue divided by selected distinct orders, not average of precomputed category averages.

## Check your result (after attempting)
Expected evidence: AOV must equal selected revenue divided by selected distinct orders, not average of precomputed category averages. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a calculated column to replace a dynamic KPI measure or dividing without checking zeros.

**Common failure:** Using a calculated column to replace a dynamic KPI measure or dividing without checking zeros.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
