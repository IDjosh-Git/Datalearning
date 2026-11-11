# Power BI Desktop · Week 03 · Building relationships and a star schema

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Model sales facts with reusable dimension tables to prevent misleading totals and filters.

## Where to begin in the tool
Use Model view and Manage relationships; confirm which table has unique keys before setting cardinality.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_2026.csv`](../learning_sales_2026.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=33537s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Grain
one fact row represents an order line or event

### 2. Dimensions
Date, Product and Region describe records without repeating measures

### 3. Relationships
use one-to-many where the dimension key is unique

### 4. Filter direction
prefer predictable single-direction filters until a specific reason demands more.

## Why this skill matters
Why this skill matters: A retailer wants a dashboard that can filter by month, store and product without double-counting sales. The method is not only about producing an attractive figure. Relationships: use one-to-many where the dimension key is unique Filter direction: prefer predictable single-direction filters until a specific reason demands more. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Model view and Manage relationships; confirm which table has unique keys before setting cardinality. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Grain — one fact row represents an order line or event Then test dimensions with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply relationships and inspect the output for errors.
4. Complete the independent challenge: Create or sketch a FactSales table related to Product and Date dimensions; verify filtering totals by one product. Before moving on, check the result against the acceptance criteria: Each fact row must match at most one product dimension key; a filtered total should never increase from an accidental join.

## Study this worked example
```text
FactSales[ProductID] (*) → (1) DimProduct[ProductID]
DimDate[Date] (1) → (*) FactSales[OrderDate]
```

**How to interpret the output:** Building relationships and a star schema begins with a practical objective: Model sales facts with reusable dimension tables to prevent misleading totals and filters. In Power BI Desktop, begin by understanding the workspace and the data rather than memorising a command. Grain: one fact row represents an order line or event Dimensions: Date, Product and Region describe records without repeating measures Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A retailer wants a dashboard that can filter by month, store and product without double-counting sales. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create or sketch a FactSales table related to Product and Date dimensions; verify filtering totals by one product.

**What you should hand in:** Each fact row must match at most one product dimension key; a filtered total should never increase from an accidental join.

## Check your result (after attempting)
Expected evidence: Each fact row must match at most one product dimension key; a filtered total should never increase from an accidental join. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Making many-to-many relationships to hide duplicate keys or linking tables on nonunique names.

**Common failure:** Making many-to-many relationships to hide duplicate keys or linking tables on nonunique names.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
