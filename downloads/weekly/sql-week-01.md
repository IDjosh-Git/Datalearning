# SQL and SQLite · Week 01 · Understanding databases and SQL editor environments

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Explore a SQL client, tables, schemas and query results before writing your first analytical statement.

## Where to begin in the tool
Open the SQL Practice Arena or SQLite client; identify connection, schema browser, query editor, Run button and result grid.


## Source data dictionary · exact practice file fields
The SQL database contains the following **real tables and columns**. Use these names in your queries rather than assuming fields that do not exist.

- `customers (customer_id, customer_name, segment, region, signup_date)`
- `orders (order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep)`
- `targets (month_start, region, sales_target)`

Available `status` values: `Completed`, `Returned`, `Cancelled`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Completed, Returned, Cancelled.

## Dataset and companion video
- **Download the dataset:** [`retail_practice.sqlite`](../retail_practice.sqlite)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=908s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Database versus table
the database stores related tables and views

### 2. Columns and rows
a row is one record at a defined grain and columns contain typed attributes

### 3. Query editor
type a statement without changing the underlying data

### 4. Read-only work
SELECT explores information while destructive statements must never be run casually.

## Why this skill matters
Why this skill matters: A trainee analyst receives an unfamiliar retail database and must first learn its structure without modifying transactions. The method is not only about producing an attractive figure. Query editor: type a statement without changing the underlying data Read-only work: SELECT explores information while destructive statements must never be run casually. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Open the SQL Practice Arena or SQLite client; identify connection, schema browser, query editor, Run button and result grid. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Database versus table — the database stores related tables and views Then test columns and rows with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply query editor and inspect the output for errors.
4. Complete the independent challenge: List available tables, inspect five rows, and explain the meaning of one order and its primary key. Before moving on, check the result against the acceptance criteria: The table list appears and the sample query returns no more than five rows; no source records change.

## Study this worked example
```text
SELECT name FROM sqlite_master WHERE type = 'table';
SELECT * FROM orders LIMIT 5;
```

**How to interpret the output:** Understanding databases and SQL editor environments begins with a practical objective: Explore a SQL client, tables, schemas and query results before writing your first analytical statement. In SQL and SQLite, begin by understanding the workspace and the data rather than memorising a command. Database versus table: the database stores related tables and views Columns and rows: a row is one record at a defined grain and columns contain typed attributes Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A trainee analyst receives an unfamiliar retail database and must first learn its structure without modifying transactions. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
List available tables, inspect five rows, and explain the meaning of one order and its primary key.

**What you should hand in:** The table list appears and the sample query returns no more than five rows; no source records change.

## Check your result (after attempting)
Expected evidence: The table list appears and the sample query returns no more than five rows; no source records change. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Running UPDATE or DELETE while intending to practise reading data.

**Common failure:** Running UPDATE or DELETE while intending to practise reading data.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
