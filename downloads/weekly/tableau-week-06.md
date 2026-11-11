# Tableau · Week 06 · Level of detail and advanced aggregate reasoning

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Apply FIXED and INCLUDE calculations carefully when category grain differs from metric grain.

## Where to begin in the tool
Create a calculated field from Analysis and add it beside a regular SUM to compare behaviour.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=K-3lEMHe2jU (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. FIXED
computes an expression at declared dimensions rather than a visible mark grain

### 2. INCLUDE
evaluates with an additional dimension

### 3. Filter order
some filters act before or after LOD computations

### 4. Verification
compare a city-level chart with the same region totals from the raw data.

## Why this skill matters
Why this skill matters: An analyst needs region totals displayed consistently in a highly detailed product view. The method is not only about producing an attractive figure. Filter order: some filters act before or after LOD computations Verification: compare a city-level chart with the same region totals from the raw data. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Create a calculated field from Analysis and add it beside a regular SUM to compare behaviour. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: FIXED — computes an expression at declared dimensions rather than a visible mark grain Then test include with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply filter order and inspect the output for errors.
4. Complete the independent challenge: Create a region-level total and display it alongside product detail; explain why that number may repeat. Before moving on, check the result against the acceptance criteria: Repeated region totals are not additive product facts, so summing the repeated figure across products would double count.

## Study this worked example
```text
{ FIXED [Region] : SUM([Revenue]) }
```

**How to interpret the output:** Level of detail and advanced aggregate reasoning begins with a practical objective: Apply FIXED and INCLUDE calculations carefully when category grain differs from metric grain. In Tableau, begin by understanding the workspace and the data rather than memorising a command. FIXED: computes an expression at declared dimensions rather than a visible mark grain INCLUDE: evaluates with an additional dimension Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: An analyst needs region totals displayed consistently in a highly detailed product view. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create a region-level total and display it alongside product detail; explain why that number may repeat.

**What you should hand in:** Repeated region totals are not additive product facts, so summing the repeated figure across products would double count.

## Check your result (after attempting)
Expected evidence: Repeated region totals are not additive product facts, so summing the repeated figure across products would double count. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Summing repeated FIXED values as if every product row contributed an independent region total.

**Common failure:** Summing repeated FIXED values as if every product row contributed an independent region total.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
