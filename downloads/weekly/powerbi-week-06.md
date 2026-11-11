# Power BI Desktop · Week 06 · Advanced DAX and analytical scenarios

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Control denominators and create context-aware comparisons without confusing totals.

## Where to begin in the tool
Use Modeling > New measure, then test results in a matrix with Region as rows and slicer filters.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=7494s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. CALCULATE
changes filter context for a specified calculation

### 2. ALL versus ALLSELECTED
choose grand totals versus user-selected totals deliberately

### 3. Ranking
RANKX or ranking measures require a clear comparison population

### 4. Sanity checks
inspect row values and grand totals under two filter states.

## Why this skill matters
Why this skill matters: Executives want market contribution and ranking metrics under controlled country and period slicers. The method is not only about producing an attractive figure. Ranking: RANKX or ranking measures require a clear comparison population Sanity checks: inspect row values and grand totals under two filter states. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Modeling > New measure, then test results in a matrix with Region as rows and slicer filters. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: CALCULATE — changes filter context for a specified calculation Then test all versus allselected with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply ranking and inspect the output for errors.
4. Complete the independent challenge: Calculate revenue share by region and explain whether it is a share of all data or selected regions. Before moving on, check the result against the acceptance criteria: All region shares should sum to 100% when the denominator uses the appropriate total; compare to a source-based cross-check.

## Study this worked example
```text
Region Share % = DIVIDE([Sales Revenue],CALCULATE([Sales Revenue],ALL(DimRegion)))
Rank = RANKX(ALL(DimRegion[Region]),[Sales Revenue],,DESC)
```

**How to interpret the output:** Advanced DAX and analytical scenarios begins with a practical objective: Control denominators and create context-aware comparisons without confusing totals. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. CALCULATE: changes filter context for a specified calculation ALL versus ALLSELECTED: choose grand totals versus user-selected totals deliberately Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: Executives want market contribution and ranking metrics under controlled country and period slicers. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Calculate revenue share by region and explain whether it is a share of all data or selected regions.

**What you should hand in:** All region shares should sum to 100% when the denominator uses the appropriate total; compare to a source-based cross-check.

## Check your result (after attempting)
Expected evidence: All region shares should sum to 100% when the denominator uses the appropriate total; compare to a source-based cross-check. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Removing all filters unintentionally with ALL(FactSales) or treating every percentage as additive.

**Common failure:** Removing all filters unintentionally with ALL(FactSales) or treating every percentage as additive.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
