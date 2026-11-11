# Microsoft Excel · Week 05 · IF, SUMIFS, COUNTIFS and lookup functions

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Calculate business KPIs by conditions and retrieve attributes from a reference table.

## Where to begin in the tool
Use Formulas > Logical or Lookup & Reference and test criteria against visible filtered rows.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`sku, product_name, category, standard_cost_ngn, list_price_ngn`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_product_catalog.csv`](../learning_product_catalog.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=19207s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. IF rules
return readable business categories from explicit conditions

### 2. SUMIFS
add sales meeting both status and region rules

### 3. COUNTIFS
count records satisfying multiple tests

### 4. XLOOKUP
match a stable ProductID and return a name or category with a clear not-found result.

## Why this skill matters
Why this skill matters: A regional manager wants comparable sales totals and product categories for a weekly trading review. The method is not only about producing an attractive figure. COUNTIFS: count records satisfying multiple tests XLOOKUP: match a stable ProductID and return a name or category with a clear not-found result. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. Use Formulas > Logical or Lookup & Reference and test criteria against visible filtered rows. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: IF rules — return readable business categories from explicit conditions Then test sumifs with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply countifs and inspect the output for errors.
4. Complete the independent challenge: Calculate paid revenue by region, high-value orders and missing product mappings, then explain why the filters matter. Before moving on, check the result against the acceptance criteria: A missing ProductID returns 'Unmapped' rather than a misleading blank; paid revenue excludes cancelled sales.

## Study this worked example
```text
=IF(E2>=50000,"High","Standard")
=SUMIFS(tblSales[Revenue],tblSales[Region],"North",tblSales[Status],"Paid")
=XLOOKUP(A2,Products[ID],Products[Category],"Unmapped")
```

**How to interpret the output:** IF, SUMIFS, COUNTIFS and lookup functions begins with a practical objective: Calculate business KPIs by conditions and retrieve attributes from a reference table. In Microsoft Excel, begin by understanding the workspace and the data rather than memorising a command. IF rules: return readable business categories from explicit conditions SUMIFS: add sales meeting both status and region rules Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A regional manager wants comparable sales totals and product categories for a weekly trading review. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Calculate paid revenue by region, high-value orders and missing product mappings, then explain why the filters matter.

**What you should hand in:** A missing ProductID returns 'Unmapped' rather than a misleading blank; paid revenue excludes cancelled sales.

## Check your result (after attempting)
Expected evidence: A missing ProductID returns 'Unmapped' rather than a misleading blank; paid revenue excludes cancelled sales. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a lookup on a nonunique key or letting cancelled orders inflate actual revenue.

**Common failure:** Using a lookup on a nonunique key or letting cancelled orders inflate actual revenue.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
