# Tableau · Week 05 · Filters, parameters and purposeful interactions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Give viewers useful controls while keeping metric definitions consistent.

## Where to begin in the tool
Add Region to Filters, show the filter card and create a Parameter for a selectable metric.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29112s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Dimension filters
determine the subset of records shown

### 2. Parameters
hold a selected user value that calculations can reference

### 3. Context filters
change the effective order of operations

### 4. Testing
compare filter selections and reset views with the raw source.

## Why this skill matters
Why this skill matters: A branch manager wants to compare regions without maintaining separate workbooks. The method is not only about producing an attractive figure. Context filters: change the effective order of operations Testing: compare filter selections and reset views with the raw source. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Add Region to Filters, show the filter card and create a Parameter for a selectable metric. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Dimension filters — determine the subset of records shown Then test parameters with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply context filters and inspect the output for errors.
4. Complete the independent challenge: Build a Region filter and a metric selector for Revenue versus Profit, then describe what changes. Before moving on, check the result against the acceptance criteria: Changing Region must update dependent charts; Revenue and Profit are not interchangeable currency concepts.

## Study this worked example
```text
IF [Metric Choice]='Revenue' THEN [Revenue] ELSE [Profit] END
```

**How to interpret the output:** Filters, parameters and purposeful interactions begins with a practical objective: Give viewers useful controls while keeping metric definitions consistent. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Dimension filters: determine the subset of records shown Parameters: hold a selected user value that calculations can reference Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A branch manager wants to compare regions without maintaining separate workbooks. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a Region filter and a metric selector for Revenue versus Profit, then describe what changes.

**What you should hand in:** Changing Region must update dependent charts; Revenue and Profit are not interchangeable currency concepts.

## Check your result (after attempting)
Expected evidence: Changing Region must update dependent charts; Revenue and Profit are not interchangeable currency concepts. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Assuming a parameter filters rows automatically without a linked calculation.

**Common failure:** Assuming a parameter filters rows automatically without a linked calculation.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
