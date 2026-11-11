# AI for Data Analysis · Week 05 · Generating and validating SQL with AI

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Request readable SELECT queries and verify schema, join grain and source totals before using results.

## Where to begin in the tool
Provide an invented database schema in the AI Tutor and run approved read-only SQL in the Practice Arena.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=DLpz6V_4SpA&t=347s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Schema grounding
include table and column names rather than asking AI to guess

### 2. Join constraints
state parent-child keys and expected cardinality

### 3. Read-only approach
require SELECT and CTE patterns

### 4. Verification
compare output counts and sums with independent source queries.

## Why this skill matters
Why this skill matters: A business analyst needs a trustworthy category sales extract without memorising every SQL function. The method is not only about producing an attractive figure. Read-only approach: require SELECT and CTE patterns Verification: compare output counts and sums with independent source queries. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Provide an invented database schema in the AI Tutor and run approved read-only SQL in the Practice Arena. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Schema grounding — include table and column names rather than asking AI to guess Then test join constraints with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply read-only approach and inspect the output for errors.
4. Complete the independent challenge: Generate a SQL reporting query, execute it against the practice schema, fix incompatible names and reconcile totals. Before moving on, check the result against the acceptance criteria: A valid join preserves orders when the dimension keys are unique; documented missing matches remain visible.

## Study this worked example
```text
Prompt: 'Given orders(order_id,product_id,revenue,status) and products(product_id,category), write a LEFT JOIN summary by category and explain fanout checks.'
```

**How to interpret the output:** Generating and validating SQL with AI begins with a practical objective: Request readable SELECT queries and verify schema, join grain and source totals before using results. In AI for Data Analysis, begin by understanding the workspace and the data rather than memorising a command. Schema grounding: include table and column names rather than asking AI to guess Join constraints: state parent-child keys and expected cardinality Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A business analyst needs a trustworthy category sales extract without memorising every SQL function. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Generate a SQL reporting query, execute it against the practice schema, fix incompatible names and reconcile totals.

**What you should hand in:** A valid join preserves orders when the dimension keys are unique; documented missing matches remain visible.

## Check your result (after attempting)
Expected evidence: A valid join preserves orders when the dimension keys are unique; documented missing matches remain visible. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Running generated UPDATE, DELETE or unverified queries on production systems.

**Common failure:** Running generated UPDATE, DELETE or unverified queries on production systems.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
