# Python and pandas · Week 05 · Filtering, grouping and business KPI calculations

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Compute revenue, customer counts and category KPIs with pandas using explicit business rules.

## Where to begin in the tool
Use boolean masks, groupby().agg and named summary columns in a notebook.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=GPVsHOlRBBI&t=29035s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Boolean masks
select rows satisfying business conditions

### 2. GroupBy
creates category-level calculations without manual loops

### 3. Named aggregation
produces readable output schema

### 4. Validation
compare grouped totals with a separately calculated ungrouped total.

## Why this skill matters
Why this skill matters: A commercial analyst is preparing a monthly regional performance comparison for management. The method is not only about producing an attractive figure. Named aggregation: produces readable output schema Validation: compare grouped totals with a separately calculated ungrouped total. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use boolean masks, groupby().agg and named summary columns in a notebook. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Boolean masks — select rows satisfying business conditions Then test groupby with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply named aggregation and inspect the output for errors.
4. Complete the independent challenge: Build a region summary with paid revenue and distinct orders, then identify top contribution. Before moving on, check the result against the acceptance criteria: The sum of grouped paid revenue must match the source Paid-only revenue under the same filters.

## Study this worked example
```text
import pandas as pd
df=pd.read_csv('learning_sales_quality_lab.csv')
df['quantity']=pd.to_numeric(df['quantity'],errors='coerce')
df['unit_price_ngn']=pd.to_numeric(df['unit_price_ngn'],errors='coerce')
# Flag invalid numeric fields; exclude them from the calculation, never silently repair.
invalid=df['quantity'].isna()|df['unit_price_ngn'].isna()
print('Rows needing investigation:',int(invalid.sum()))
valid=df.loc[~invalid].copy()
valid['revenue_ngn']=valid['quantity']*valid['unit_price_ngn']
completed=valid.loc[valid['status'].eq('Completed')]
summary=completed.groupby('region',dropna=False).agg(
    revenue_ngn=('revenue_ngn','sum'),orders=('order_id','nunique'))
print(summary)
```

**How to interpret the output:** Filtering, grouping and business KPI calculations begins with a practical objective: Compute revenue, customer counts and category KPIs with pandas using explicit business rules. In Python and pandas, begin by understanding the workspace and the data rather than memorising a command. Boolean masks: select rows satisfying business conditions GroupBy: creates category-level calculations without manual loops Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A commercial analyst is preparing a monthly regional performance comparison for management. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Build a region summary with paid revenue and distinct orders, then identify top contribution.

**What you should hand in:** The sum of grouped paid revenue must match the source Paid-only revenue under the same filters.

## Check your result (after attempting)
Expected evidence: The sum of grouped paid revenue must match the source Paid-only revenue under the same filters. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using count instead of nunique for order IDs or including returned orders in paid sales.

**Common failure:** Using count instead of nunique for order IDs or including returned orders in paid sales.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
