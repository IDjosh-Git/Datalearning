# Python and pandas · Week 04 · Cleaning DataFrames safely

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Handle missing records, duplicates, inconsistent labels and invalid numeric values with reproducible code.

## Where to begin in the tool
Use pandas info(), isna(), duplicated() and transformations on a copied DataFrame.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=GPVsHOlRBBI&t=14578s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Missingness
count nulls by column before selecting a treatment

### 2. Duplication
identify transaction keys before calling drop_duplicates

### 3. Strings
strip and standardise region names without changing raw data

### 4. Numeric checks
to_numeric(errors='coerce') makes invalid fields auditable as nulls.

## Why this skill matters
Why this skill matters: A logistics dataset contains spelling differences and incomplete rows that must be investigated before KPI calculations. The method is not only about producing an attractive figure. Strings: strip and standardise region names without changing raw data Numeric checks: to_numeric(errors='coerce') makes invalid fields auditable as nulls. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use pandas info(), isna(), duplicated() and transformations on a copied DataFrame. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Missingness — count nulls by column before selecting a treatment Then test duplication with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply strings and inspect the output for errors.
4. Complete the independent challenge: Create a data quality report, clean one text column and document how many values were affected. Before moving on, check the result against the acceptance criteria: Row count should change only if a documented removal rule is applied; missing totals must be reported.

## Study this worked example
```text
import pandas as pd
df=pd.read_csv('learning_sales_2026.csv')
clean=df.copy()
clean['region']=clean['region'].astype('string').str.strip().str.title()
print(clean.isna().sum())
```

**How to interpret the output:** Cleaning DataFrames safely begins with a practical objective: Handle missing records, duplicates, inconsistent labels and invalid numeric values with reproducible code. In Python and pandas, begin by understanding the workspace and the data rather than memorising a command. Missingness: count nulls by column before selecting a treatment Duplication: identify transaction keys before calling drop_duplicates Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A logistics dataset contains spelling differences and incomplete rows that must be investigated before KPI calculations. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create a data quality report, clean one text column and document how many values were affected.

**What you should hand in:** Row count should change only if a documented removal rule is applied; missing totals must be reported.

## Check your result (after attempting)
Expected evidence: Row count should change only if a documented removal rule is applied; missing totals must be reported. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Calling dropna on every column and silently losing valid customers or orders.

**Common failure:** Calling dropna on every column and silently losing valid customers or orders.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
