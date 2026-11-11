# SQL and SQLite · Week 05 · CASE, NULL and conditional business rules

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Classify transactions transparently and avoid incorrect logic for missing fields.

## Where to begin in the tool
Use CASE WHEN for categories and IS NULL or COALESCE when checking absent values.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=4111s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. NULL semantics
NULL is unknown and cannot be tested reliably with = NULL

### 2. CASE
defines readable derived categories with an ELSE fallback

### 3. COALESCE
selects a fallback value where business rules permit

### 4. Conditional totals
SUM(CASE WHEN ... THEN ... END) can create reporting measures with explicit logic.

## Why this skill matters
Why this skill matters: A compliance report needs consistent categories and explicit disclosure of incomplete records. The method is not only about producing an attractive figure. COALESCE: selects a fallback value where business rules permit Conditional totals: SUM(CASE WHEN ... THEN ... END) can create reporting measures with explicit logic. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use CASE WHEN for categories and IS NULL or COALESCE when checking absent values. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: NULL semantics — NULL is unknown and cannot be tested reliably with = NULL Then test case with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply coalesce and inspect the output for errors.
4. Complete the independent challenge: Create spending bands and count missing Region values without replacing missing revenue with zero. Before moving on, check the result against the acceptance criteria: High-value flag follows the threshold; NULL Region displays as Unknown only in the reporting output.

## Study this worked example
```text
SELECT order_id,
CASE WHEN quantity*unit_price*(1-discount_pct)>=50000 THEN 'High' ELSE 'Standard' END AS band,
COALESCE(region,'Unknown') AS reporting_region FROM orders;
```

**How to interpret the output:** CASE, NULL and conditional business rules begins with a practical objective: Classify transactions transparently and avoid incorrect logic for missing fields. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. NULL semantics: NULL is unknown and cannot be tested reliably with = NULL CASE: defines readable derived categories with an ELSE fallback Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A compliance report needs consistent categories and explicit disclosure of incomplete records. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create spending bands and count missing Region values without replacing missing revenue with zero.

**What you should hand in:** High-value flag follows the threshold; NULL Region displays as Unknown only in the reporting output.

## Check your result (after attempting)
Expected evidence: High-value flag follows the threshold; NULL Region displays as Unknown only in the reporting output. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using = NULL rather than IS NULL or assigning missing values a false zero.

**Common failure:** Using = NULL rather than IS NULL or assigning missing values a false zero.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
