# Microsoft Excel · Week 03 · Essential Excel formulas and cell references

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Build correct arithmetic and summary formulas and know when to lock a reference.

## Where to begin in the tool
Use the formula bar, AutoSum and Formulas > Insert Function; inspect each cell's referenced ranges.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_monthly_kpis.csv`](../learning_monthly_kpis.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17175s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Operators
+ - * / act on numeric cells and must use the intended units

### 2. SUM and AVERAGE
summarise an explicit range rather than typing hardcoded totals

### 3. Relative versus absolute references
$B$1 keeps a tax-rate cell fixed when copying

### 4. Formula auditing
trace errors by changing one input and comparing the recalculated result.

## Why this skill matters
Why this skill matters: A finance assistant needs a dependable daily revenue sheet that recalculates when transactions change. The method is not only about producing an attractive figure. Relative versus absolute references: $B$1 keeps a tax-rate cell fixed when copying Formula auditing: trace errors by changing one input and comparing the recalculated result. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use the formula bar, AutoSum and Formulas > Insert Function; inspect each cell's referenced ranges. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Operators — + - * / act on numeric cells and must use the intended units Then test sum and average with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply relative versus absolute references and inspect the output for errors.
4. Complete the independent challenge: Compute line revenue, tax using one fixed rate cell, grand total and average order-line value; copy formulas through all rows. Before moving on, check the result against the acceptance criteria: A 3-unit order at 1500 produces 4500 before tax; a fixed 7.5% rate in H2 produces 337.50 tax.

## Study this worked example
```text
D2 = B2*C2
E2 = D2*$H$2
=SUM(D2:D101) and =AVERAGE(D2:D101)
```

**How to interpret the output:** Essential Excel formulas and cell references begins with a practical objective: Build correct arithmetic and summary formulas and know when to lock a reference. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Operators: + - * / act on numeric cells and must use the intended units SUM and AVERAGE: summarise an explicit range rather than typing hardcoded totals Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A finance assistant needs a dependable daily revenue sheet that recalculates when transactions change. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Compute line revenue, tax using one fixed rate cell, grand total and average order-line value; copy formulas through all rows.

**What you should hand in:** A 3-unit order at 1500 produces 4500 before tax; a fixed 7.5% rate in H2 produces 337.50 tax.

## Check your result (after attempting)
Expected evidence: A 3-unit order at 1500 produces 4500 before tax; a fixed 7.5% rate in H2 produces 337.50 tax. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Hardcoding a tax percentage in every row or confusing gross and net amounts.

**Common failure:** Hardcoding a tax percentage in every row or confusing gross and net amounts.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
