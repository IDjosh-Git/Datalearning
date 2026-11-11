# Power BI Desktop · Week 05 · Time intelligence and period comparisons

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Analyse month-over-month and year-over-year changes with a proper date dimension.

## Where to begin in the tool
Mark a contiguous DimDate as a Date table and use Calendar fields on a time-series visual.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=2770s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Date table
one row per date supports consistent calendar calculations

### 2. Period logic
PREVIOUSMONTH and DATEADD compare comparable windows

### 3. Percentage variance
divide by the prior period and handle missing months

### 4. Completeness
flag partial current periods to avoid biased comparisons.

## Why this skill matters
Why this skill matters: A reporting team needs a credible monthly trend and variance against the previous trading period. The method is not only about producing an attractive figure. Percentage variance: divide by the prior period and handle missing months Completeness: flag partial current periods to avoid biased comparisons. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Mark a contiguous DimDate as a Date table and use Calendar fields on a time-series visual. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Date table — one row per date supports consistent calendar calculations Then test period logic with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply percentage variance and inspect the output for errors.
4. Complete the independent challenge: Build a line chart of monthly revenue plus a MoM percentage table, identifying incomplete months. Before moving on, check the result against the acceptance criteria: For March 135000 versus February 150000, MoM = -10%; date labels must sort chronologically.

## Study this worked example
```text
Previous Month Revenue = CALCULATE([Sales Revenue],DATEADD(DimDate[Date],-1,MONTH))
MoM % = DIVIDE([Sales Revenue]-[Previous Month Revenue],[Previous Month Revenue])
```

**How to interpret the output:** Time intelligence and period comparisons begins with a practical objective: Analyse month-over-month and year-over-year changes with a proper date dimension. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Date table: one row per date supports consistent calendar calculations Period logic: PREVIOUSMONTH and DATEADD compare comparable windows Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A reporting team needs a credible monthly trend and variance against the previous trading period. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a line chart of monthly revenue plus a MoM percentage table, identifying incomplete months.

**What you should hand in:** For March 135000 versus February 150000, MoM = -10%; date labels must sort chronologically.

## Check your result (after attempting)
Expected evidence: For March 135000 versus February 150000, MoM = -10%; date labels must sort chronologically. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Comparing a partial current month with a complete previous month without explaining the limitation.

**Common failure:** Comparing a partial current month with a complete previous month without explaining the limitation.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
