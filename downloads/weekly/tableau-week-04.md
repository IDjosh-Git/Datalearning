# Tableau · Week 04 · Calculated fields and business KPI definitions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Create reproducible calculations and understand row-level versus aggregate expressions.

## Where to begin in the tool
Use Analysis > Create Calculated Field; name fields clearly and check their aggregation.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=27233s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Calculated fields
define reusable metric logic such as Profit = Sales-Cost

### 2. Aggregation
SUM([Profit])/SUM([Sales]) is different from a mean of row ratios

### 3. Conditional logic
IF statements create categories under explicit rules

### 4. Error checks
avoid mixing aggregate and nonaggregate expressions arbitrarily.

## Why this skill matters
Why this skill matters: Finance stakeholders need consistent margin KPIs across filters and charts. The method is not only about producing an attractive figure. Conditional logic: IF statements create categories under explicit rules Error checks: avoid mixing aggregate and nonaggregate expressions arbitrarily. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Analysis > Create Calculated Field; name fields clearly and check their aggregation. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Calculated fields — define reusable metric logic such as Profit = Sales-Cost Then test aggregation with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply conditional logic and inspect the output for errors.
4. Complete the independent challenge: Create Profit and Margin % and verify a simple two-row example by hand. Before moving on, check the result against the acceptance criteria: For revenue 1000 and cost 700, profit is 300 and margin 30%; aggregate ratios should be computed from total components.

## Study this worked example
```text
[Profit] = [Sales] - [Cost]
[Margin %] = SUM([Profit]) / SUM([Sales])
```

**How to interpret the output:** Calculated fields and business KPI definitions begins with a practical objective: Create reproducible calculations and understand row-level versus aggregate expressions. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Calculated fields: define reusable metric logic such as Profit = Sales-Cost Aggregation: SUM([Profit])/SUM([Sales]) is different from a mean of row ratios Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: Finance stakeholders need consistent margin KPIs across filters and charts. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create Profit and Margin % and verify a simple two-row example by hand.

**What you should hand in:** For revenue 1000 and cost 700, profit is 300 and margin 30%; aggregate ratios should be computed from total components.

## Check your result (after attempting)
Expected evidence: For revenue 1000 and cost 700, profit is 300 and margin 30%; aggregate ratios should be computed from total components. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Averaging row-wise margins and reporting that as overall portfolio margin without justification.

**Common failure:** Averaging row-wise margins and reporting that as overall portfolio margin without justification.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
