# Python and pandas · Week 01 · Python environment, notebooks and first expressions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Start confidently in a Python editor or notebook, run code cells and understand variables and errors.

## Where to begin in the tool
Open the Python Practice Arena or Jupyter notebook; identify code cells, Run, output area, file browser and error traceback.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, customer_id, customer, region, product_id, product, quantity, unit_price, unit_cost, status, channel`

Available `status` values: `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`mastery_orders.csv`](../mastery_orders.csv)
- **Video companion:** https://www.youtube.com/watch?v=GPVsHOlRBBI&t=324s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Interpreter
executes Python expressions and statements in sequence

### 2. Variables
bind readable names to values without hardcoding business assumptions

### 3. Data types
int, float, str and bool behave differently

### 4. Error messages
a traceback points to the failing line and helps diagnose syntax or missing names.

## Why this skill matters
Why this skill matters: A trainee analyst needs a repeatable calculator for simple business figures before importing files. The method is not only about producing an attractive figure. Data types: int, float, str and bool behave differently Error messages: a traceback points to the failing line and helps diagnose syntax or missing names. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open the Python Practice Arena or Jupyter notebook; identify code cells, Run, output area, file browser and error traceback. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Interpreter — executes Python expressions and statements in sequence Then test variables with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply data types and inspect the output for errors.
4. Complete the independent challenge: Create a notebook, calculate revenue for three items, change unit_price and explain why the output changes. Before moving on, check the result against the acceptance criteria: The printed value is 4500, and changing input values updates the calculation without retyping the formula.

## Study this worked example
```text
orders=3
unit_price=1500
revenue=orders*unit_price
print(revenue)  # 4500
```

**How to interpret the output:** Python environment, notebooks and first expressions begins with a practical objective: Start confidently in a Python editor or notebook, run code cells and understand variables and errors. In Python and pandas, begin by understanding the workspace and the data rather than memorising a command. Interpreter: executes Python expressions and statements in sequence Variables: bind readable names to values without hardcoding business assumptions Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A trainee analyst needs a repeatable calculator for simple business figures before importing files. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create a notebook, calculate revenue for three items, change unit_price and explain why the output changes.

**What you should hand in:** The printed value is 4500, and changing input values updates the calculation without retyping the formula.

## Check your result (after attempting)
Expected evidence: The printed value is 4500, and changing input values updates the calculation without retyping the formula. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Treating notebook output from an old cell execution as if it reflects the latest code.

**Common failure:** Treating notebook output from an old cell execution as if it reflects the latest code.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
