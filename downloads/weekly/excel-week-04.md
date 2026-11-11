# Microsoft Excel · Week 04 · Cleaning text, dates, duplicates and errors

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Fix dirty source data while keeping an auditable record of what changed.

## Where to begin in the tool
Use Data > Remove Duplicates carefully, Data > Text to Columns, and helper columns beside the raw Table.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17175s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Whitespace
TRIM removes extra spaces but must be checked before overwriting source values

### 2. Text standardisation
UPPER and PROPER create consistent labels without changing definitions

### 3. Validation
COUNTBLANK and conditional formatting reveal missing fields

### 4. Duplicate review
identify the genuine transaction key before deciding which records to exclude.

## Why this skill matters
Why this skill matters: An operations team exports inconsistent region spellings and occasional missing order dates from a point-of-sale device. The method is not only about producing an attractive figure. Validation: COUNTBLANK and conditional formatting reveal missing fields Duplicate review: identify the genuine transaction key before deciding which records to exclude. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Data > Remove Duplicates carefully, Data > Text to Columns, and helper columns beside the raw Table. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Whitespace — TRIM removes extra spaces but must be checked before overwriting source values Then test text standardisation with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply validation and inspect the output for errors.
4. Complete the independent challenge: Create cleaned Region and Status fields, flag blank order dates and suspect amounts, then document how many rows changed. Before moving on, check the result against the acceptance criteria: A label of '  north ' becomes 'North'; missing dates remain flagged rather than silently fabricated.

## Study this worked example
```text
=TRIM(A2)
=PROPER(TRIM(C2))
=IF(OR(D2="",D2<0),"Review","OK")
```

**How to interpret the output:** Cleaning text, dates, duplicates and errors begins with a practical objective: Fix dirty source data while keeping an auditable record of what changed. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Whitespace: TRIM removes extra spaces but must be checked before overwriting source values Text standardisation: UPPER and PROPER create consistent labels without changing definitions Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An operations team exports inconsistent region spellings and occasional missing order dates from a point-of-sale device. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create cleaned Region and Status fields, flag blank order dates and suspect amounts, then document how many rows changed.

**What you should hand in:** A label of '  north ' becomes 'North'; missing dates remain flagged rather than silently fabricated.

## Check your result (after attempting)
Expected evidence: A label of '  north ' becomes 'North'; missing dates remain flagged rather than silently fabricated. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Deleting repeated product rows even though different orders can contain the same product.

**Common failure:** Deleting repeated product rows even though different orders can contain the same product.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
