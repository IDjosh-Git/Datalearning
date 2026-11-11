# Tableau · Week 02 · Understanding field types, measures and data relationships

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Set data types and link tables while respecting their analytical grain.

## Where to begin in the tool
In the Data Source view inspect field-type icons, relationships and field profiles before building marks.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`customer_id, signup_date, last_order_date, region, acquisition_channel, orders_lifetime`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_customer_cohorts.csv`](../learning_customer_cohorts.csv)
- **Video companion:** https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=28460s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. Dimensions
group and segment data rather than being automatically summed

### 2. Measures
numerical fields are typically aggregated per mark

### 3. Date types
continuous dates and discrete date parts produce different timelines

### 4. Relationships
combine tables logically but verify keys to avoid inflated totals.

## Why this skill matters
Why this skill matters: A merchandiser needs reliable category comparisons across two related data files. The method is not only about producing an attractive figure. Date types: continuous dates and discrete date parts produce different timelines Relationships: combine tables logically but verify keys to avoid inflated totals. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. In the Data Source view inspect field-type icons, relationships and field profiles before building marks. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: Dimensions — group and segment data rather than being automatically summed Then test measures with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply date types and inspect the output for errors.
4. Complete the independent challenge: Classify six fields, set a correct OrderDate type and sketch a valid sales-to-product relationship. Before moving on, check the result against the acceptance criteria: Revenue by Product Category should reconcile to the same total as the underlying valid sales data.

## Study this worked example
```text
OrderDate = Date; Region = Dimension; Revenue = Measure
Orders[ProductID] → Products[ProductID]
```

**How to interpret the output:** Understanding field types, measures and data relationships begins with a practical objective: Set data types and link tables while respecting their analytical grain. In Tableau, begin by understanding the workspace and the data rather than memorising a command. Dimensions: group and segment data rather than being automatically summed Measures: numerical fields are typically aggregated per mark Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A merchandiser needs reliable category comparisons across two related data files. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Classify six fields, set a correct OrderDate type and sketch a valid sales-to-product relationship.

**What you should hand in:** Revenue by Product Category should reconcile to the same total as the underlying valid sales data.

## Check your result (after attempting)
Expected evidence: Revenue by Product Category should reconcile to the same total as the underlying valid sales data. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Connecting tables using product names that are not unique or treating CustomerID as an additive measure.

**Common failure:** Connecting tables using product names that are not unique or treating CustomerID as an additive measure.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
