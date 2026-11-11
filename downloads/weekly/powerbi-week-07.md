# Power BI Desktop · Week 07 · Designing Power BI visuals and interactions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Select charts for decisions and make drilldown and filters understandable to a new user.

## Where to begin in the tool
On Report view add clustered bars, line charts and Cards, then inspect Format visual and Edit interactions.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=8512s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. KPI cards
show unit, current period and change from target

### 2. Lines and bars
choose time and category visualizations based on question

### 3. Interactions
test cross-filtering, drill-through and tooltips

### 4. Accessibility
label measures clearly and check contrast and keyboard focus where supported.

## Why this skill matters
Why this skill matters: The sales leadership team needs a summary where a manager can investigate a changing KPI by region. The method is not only about producing an attractive figure. Interactions: test cross-filtering, drill-through and tooltips Accessibility: label measures clearly and check contrast and keyboard focus where supported. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. On Report view add clustered bars, line charts and Cards, then inspect Format visual and Edit interactions. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: KPI cards — show unit, current period and change from target Then test lines and bars with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply interactions and inspect the output for errors.
4. Complete the independent challenge: Create one report page with three cards and two visuals, and verify that selecting a bar affects other visuals intentionally. Before moving on, check the result against the acceptance criteria: A selected region should update related KPIs, while totals in a separate validation table remain consistent.

## Study this worked example
```text
Cards: Revenue, Orders, Margin %
Line: Revenue by Month
Bar: Revenue by Region
```

**How to interpret the output:** Designing Power BI visuals and interactions begins with a practical objective: Select charts for decisions and make drilldown and filters understandable to a new user. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. KPI cards: show unit, current period and change from target Lines and bars: choose time and category visualizations based on question Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: The sales leadership team needs a summary where a manager can investigate a changing KPI by region. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create one report page with three cards and two visuals, and verify that selecting a bar affects other visuals intentionally.

**What you should hand in:** A selected region should update related KPIs, while totals in a separate validation table remain consistent.

## Check your result (after attempting)
Expected evidence: A selected region should update related KPIs, while totals in a separate validation table remain consistent. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Overcrowding the canvas or leaving unwanted visual-to-visual filters enabled.

**Common failure:** Overcrowding the canvas or leaving unwanted visual-to-visual filters enabled.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
