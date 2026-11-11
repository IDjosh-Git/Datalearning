# Microsoft Excel · Week 06 · PivotTables, dynamic arrays and reusable analysis

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Summarise thousands of rows into pivot summaries and dynamic filtered lists without manual recalculation.

## Where to begin in the tool
Choose Insert > PivotTable, place fields in Rows, Columns, Values and Filters, then refresh after source changes.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=zXnQNytHCPM (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Pivot aggregation
choose Sum of Revenue rather than Count of Revenue

### 2. Slicers
connect relevant pivot views so business users can filter

### 3. Dynamic arrays
FILTER and UNIQUE return ranges that can spill into adjacent cells

### 4. LET
name intermediate calculations to keep complex formulas readable and maintainable.

## Why this skill matters
Why this skill matters: A reporting analyst needs a reusable monthly sales summary that updates when new export rows arrive. The method is not only about producing an attractive figure. Dynamic arrays: FILTER and UNIQUE return ranges that can spill into adjacent cells LET: name intermediate calculations to keep complex formulas readable and maintainable. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Choose Insert > PivotTable, place fields in Rows, Columns, Values and Filters, then refresh after source changes. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Pivot aggregation — choose Sum of Revenue rather than Count of Revenue Then test slicers with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply dynamic arrays and inspect the output for errors.
4. Complete the independent challenge: Build a region-by-month PivotTable and slicer, then compare it with a formula-based total and explain any mismatch. Before moving on, check the result against the acceptance criteria: A pivot total for Paid orders must match independently computed SUMIFS on the same data and filters.

## Study this worked example
```text
=UNIQUE(tblSales[Region])
=LET(paid,SUMIFS(tblSales[Revenue],tblSales[Status],"Paid"),paid)
Pivot Rows: Region; Values: Sum of Revenue
```

**How to interpret the output:** PivotTables, dynamic arrays and reusable analysis begins with a practical objective: Summarise thousands of rows into pivot summaries and dynamic filtered lists without manual recalculation. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Pivot aggregation: choose Sum of Revenue rather than Count of Revenue Slicers: connect relevant pivot views so business users can filter Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A reporting analyst needs a reusable monthly sales summary that updates when new export rows arrive. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a region-by-month PivotTable and slicer, then compare it with a formula-based total and explain any mismatch.

**What you should hand in:** A pivot total for Paid orders must match independently computed SUMIFS on the same data and filters.

## Check your result (after attempting)
Expected evidence: A pivot total for Paid orders must match independently computed SUMIFS on the same data and filters. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Forgetting PivotTable Refresh, or placing cells in a spill range where they block the result.

**Common failure:** Forgetting PivotTable Refresh, or placing cells in a spill range where they block the result.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
