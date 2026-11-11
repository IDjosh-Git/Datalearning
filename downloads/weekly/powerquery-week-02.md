# Power Query · Week 02 · Data types, date locale and column profiling

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Ensure values are correctly typed before creating calculated analysis fields.

## Where to begin in the tool
In Power Query choose Transform > Data Type, Using Locale where needed, then View > Column quality.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel`

Available `status` values: `Cancelled`, `Completed`, `Returned`, `complete`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns. Source status values are Cancelled, Completed, Returned, complete.

## Dataset and companion video
- **Download the dataset:** [`learning_sales_quality_lab.csv`](../learning_sales_quality_lab.csv)
- **Video companion:** https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Type semantics
dates, decimal values and text identifiers are not interchangeable

### 2. Locale
an ambiguous date requires a known regional format

### 3. Quality profiling
inspect Valid, Error and Empty percentages

### 4. Step order
correct parsing early so later filters are consistent.

## Why this skill matters
Why this skill matters: A regional finance team receives exports from systems using different date conventions. The method is not only about producing an attractive figure. Quality profiling: inspect Valid, Error and Empty percentages Step order: correct parsing early so later filters are consistent. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. In Power Query choose Transform > Data Type, Using Locale where needed, then View > Column quality. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Type semantics — dates, decimal values and text identifiers are not interchangeable Then test locale with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply quality profiling and inspect the output for errors.
4. Complete the independent challenge: Convert date and revenue columns, preserve zero-padded IDs, and document one ambiguous date. Before moving on, check the result against the acceptance criteria: After conversion, date sorting is chronological and revenue can be summed numerically; IDs retain leading zeroes.

## Study this worked example
```text
Text '31/12/2026' → Date (English United Kingdom)
Amount '1,250.50' → Decimal Number using appropriate locale
```

**How to interpret the output:** Data types, date locale and column profiling begins with a practical objective: Ensure values are correctly typed before creating calculated analysis fields. In Power Query, begin by understanding the workspace and the data rather than memorising a command. Type semantics: dates, decimal values and text identifiers are not interchangeable Locale: an ambiguous date requires a known regional format Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A regional finance team receives exports from systems using different date conventions. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Convert date and revenue columns, preserve zero-padded IDs, and document one ambiguous date.

**What you should hand in:** After conversion, date sorting is chronological and revenue can be summed numerically; IDs retain leading zeroes.

## Check your result (after attempting)
Expected evidence: After conversion, date sorting is chronological and revenue can be summed numerically; IDs retain leading zeroes. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using formatting alone to 'fix' a text date or allowing locale ambiguity to swap day and month.

**Common failure:** Using formatting alone to 'fix' a text date or allowing locale ambiguity to swap day and month.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
