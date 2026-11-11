# Power Query · Week 07 · Merging lookup tables and checking join matches

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Enrich transactions with attributes while preventing duplicate-key fanout.

## Where to begin in the tool
Use Home > Merge Queries, choose matching ProductID columns and a Left Outer join, then expand selected fields.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=VO-MyVMKUC4 (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Join direction
Left Outer preserves the source transaction table

### 2. Key quality
dimension keys should be unique at the intended grain

### 3. Match diagnostics
identify null expanded attributes and fix mapping errors

### 4. Validation
compare source and merged row counts and sums.

## Why this skill matters
Why this skill matters: The product manager wants category analysis from order lines and a separate product master file. The method is not only about producing an attractive figure. Match diagnostics: identify null expanded attributes and fix mapping errors Validation: compare source and merged row counts and sums. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Home > Merge Queries, choose matching ProductID columns and a Left Outer join, then expand selected fields. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Join direction — Left Outer preserves the source transaction table Then test key quality with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply match diagnostics and inspect the output for errors.
4. Complete the independent challenge: Merge orders with product categories and produce a list of unmatched product identifiers. Before moving on, check the result against the acceptance criteria: A unique product lookup should preserve one result per order row; unmatched ProductID remains visible.

## Study this worked example
```text
Orders LEFT JOIN Products ON ProductID → expand Category, UnitCost
```

**How to interpret the output:** Merging lookup tables and checking join matches begins with a practical objective: Enrich transactions with attributes while preventing duplicate-key fanout. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Join direction: Left Outer preserves the source transaction table Key quality: dimension keys should be unique at the intended grain Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: The product manager wants category analysis from order lines and a separate product master file. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Merge orders with product categories and produce a list of unmatched product identifiers.

**What you should hand in:** A unique product lookup should preserve one result per order row; unmatched ProductID remains visible.

## Check your result (after attempting)
Expected evidence: A unique product lookup should preserve one result per order row; unmatched ProductID remains visible. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a many-to-many merge without checking whether revenue duplicates after expansion.

**Common failure:** Using a many-to-many merge without checking whether revenue duplicates after expansion.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
