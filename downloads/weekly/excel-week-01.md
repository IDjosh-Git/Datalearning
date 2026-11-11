# Microsoft Excel · Week 01 · Getting comfortable with the Excel workspace

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Identify ribbon tabs, worksheets, cells, ranges and the formula bar before typing or analysing data.

## Where to begin in the tool
Open Excel, choose Blank workbook, locate Home and Data ribbons, Name Box, formula bar, sheet tabs and Save As.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=zXnQNytHCPM (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Workbook versus worksheet
a workbook is the file and sheets organise different tables

### 2. Cell addresses
B3 identifies a column and row and is used in formulas

### 3. Ribbon commands
Home formats cells while Data handles import sorting and filtering

### 4. Reliable saving
keep a raw sheet untouched and save a descriptive .xlsx version.

## Why this skill matters
Why this skill matters: A shop assistant needs a tidy daily sales workbook that a supervisor can reopen and understand without verbal instructions. The method is not only about producing an attractive figure. Ribbon commands: Home formats cells while Data handles import sorting and filtering Reliable saving: keep a raw sheet untouched and save a descriptive .xlsx version. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open Excel, choose Blank workbook, locate Home and Data ribbons, Name Box, formula bar, sheet tabs and Save As. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Workbook versus worksheet — a workbook is the file and sheets organise different tables Then test cell addresses with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply ribbon commands and inspect the output for errors.
4. Complete the independent challenge: Create a workbook named Retail_Practice.xlsx, make Raw_Data and Analysis tabs, enter three sales rows and calculate one line total. Before moving on, check the result against the acceptance criteria: The formula =B2*C2 multiplies 3 by 1500 to return 4500; the source values remain independently readable.

## Study this worked example
```text
A1: Product  B1: Units  C1: Price
A2: Notebook B2: 3 C2: 1500
D2: =B2*C2  → 4500
```

**How to interpret the output:** Getting comfortable with the Excel workspace begins with a practical objective: Identify ribbon tabs, worksheets, cells, ranges and the formula bar before typing or analysing data. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. Workbook versus worksheet: a workbook is the file and sheets organise different tables Cell addresses: B3 identifies a column and row and is used in formulas Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A shop assistant needs a tidy daily sales workbook that a supervisor can reopen and understand without verbal instructions. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create a workbook named Retail_Practice.xlsx, make Raw_Data and Analysis tabs, enter three sales rows and calculate one line total.

**What you should hand in:** The formula =B2*C2 multiplies 3 by 1500 to return 4500; the source values remain independently readable.

## Check your result (after attempting)
Expected evidence: The formula =B2*C2 multiplies 3 by 1500 to return 4500; the source values remain independently readable. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Typing data over a formula or confusing the active sheet with the entire workbook.

**Common failure:** Typing data over a formula or confusing the active sheet with the entire workbook.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
