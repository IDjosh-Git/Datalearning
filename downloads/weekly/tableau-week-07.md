# Tableau · Week 07 · Table calculations for running totals and comparisons

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Add running sums, ranks and percent-of-total calculations to an existing visual.

## Where to begin in the tool
Right-click the measure pill and select Quick Table Calculation; configure Compute Using explicitly.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=3_DeQdE25Bc (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Running totals
accumulate values in displayed sort order

### 2. Ranking
compare marks with chosen partition and order

### 3. Table calculation direction
controls which neighbouring marks contribute

### 4. Verification
manually test the first three visible months before trusting the entire line.

## Why this skill matters
Why this skill matters: A sales planner wants to track progress against a year-to-date target. The method is not only about producing an attractive figure. Table calculation direction: controls which neighbouring marks contribute Verification: manually test the first three visible months before trusting the entire line. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Right-click the measure pill and select Quick Table Calculation; configure Compute Using explicitly. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Running totals — accumulate values in displayed sort order Then test ranking with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply table calculation direction and inspect the output for errors.
4. Complete the independent challenge: Build a running-revenue view and a rank by product category, then identify the addressing direction. Before moving on, check the result against the acceptance criteria: The cumulative sequence must be 10,25,37 for the sample; ranking should honour the intended metric.

## Study this worked example
```text
RUNNING_SUM(SUM([Revenue]))
January 10; February 15; March 12 → cumulative 10,25,37
```

**How to interpret the output:** Table calculations for running totals and comparisons begins with a practical objective: Add running sums, ranks and percent-of-total calculations to an existing visual. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Running totals: accumulate values in displayed sort order Ranking: compare marks with chosen partition and order Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A sales planner wants to track progress against a year-to-date target. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a running-revenue view and a rank by product category, then identify the addressing direction.

**What you should hand in:** The cumulative sequence must be 10,25,37 for the sample; ranking should honour the intended metric.

## Check your result (after attempting)
Expected evidence: The cumulative sequence must be 10,25,37 for the sample; ranking should honour the intended metric. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using Table Down when the logical date order runs across columns.

**Common failure:** Using Table Down when the logical date order runs across columns.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
