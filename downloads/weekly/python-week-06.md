# Python and pandas · Week 06 · Joining datasets and analytical feature engineering

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Combine related tables and create purposeful derived fields without fanout errors.

## Where to begin in the tool
Use pandas merge(validate=...) and assign() while checking key uniqueness.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=GPVsHOlRBBI&t=18045s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Merge keys
left and right tables must refer to the same business entity

### 2. Validation
many_to_one detects duplicate dimension keys

### 3. Derived metrics
calculate margin and order size with safe denominators

### 4. Reproducibility
separate raw, cleaned and feature-enriched DataFrames.

## Why this skill matters
Why this skill matters: An analyst needs category profitability while preserving transaction-level revenue values. The method is not only about producing an attractive figure. Derived metrics: calculate margin and order size with safe denominators Reproducibility: separate raw, cleaned and feature-enriched DataFrames. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use pandas merge(validate=...) and assign() while checking key uniqueness. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Merge keys — left and right tables must refer to the same business entity Then test validation with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply derived metrics and inspect the output for errors.
4. Complete the independent challenge: Join retail orders to a product dimension and calculate margin by category; flag unmatched ProductIDs. Before moving on, check the result against the acceptance criteria: Post-merge row count must equal source orders for a valid many-to-one join; unmatched categories must be counted.

## Study this worked example
```text
import pandas as pd
monthly=pd.read_csv('learning_monthly_kpis.csv')
targets=monthly[['month','region','sales_target_ngn']].drop_duplicates()
facts=monthly.drop(columns='sales_target_ngn')
report=facts.merge(targets,on=['month','region'],how='left',validate='many_to_one')
report['target_attainment']=report['net_sales_ngn']/report['sales_target_ngn']
print(report[['month','region','target_attainment']].head())
```

**How to interpret the output:** Joining datasets and analytical feature engineering begins with a practical objective: Combine related tables and create purposeful derived fields without fanout errors. In Python and pandas, begin by understanding the workspace and the data rather than memorising a command. Merge keys: left and right tables must refer to the same business entity Validation: many_to_one detects duplicate dimension keys Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An analyst needs category profitability while preserving transaction-level revenue values. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Join retail orders to a product dimension and calculate margin by category; flag unmatched ProductIDs.

**What you should hand in:** Post-merge row count must equal source orders for a valid many-to-one join; unmatched categories must be counted.

## Check your result (after attempting)
Expected evidence: Post-merge row count must equal source orders for a valid many-to-one join; unmatched categories must be counted. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a many-to-many join and then treating inflated Revenue as genuine growth.

**Common failure:** Using a many-to-many join and then treating inflated Revenue as genuine growth.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
