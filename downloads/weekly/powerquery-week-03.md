# Power Query · Week 03 · Clean missing values and errors

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Inspect nulls, duplicates and transformation failures

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Missing, duplicated and invalid values require investigation before cleaning. A null delivery date may be acceptable for an open order but invalid for a completed order. Power Query can filter nulls, remove duplicates on selected columns and replace errors, but those operations change the number of rows contributing to your analysis. Define the validity rules before deciding which records to exclude.

Column quality and profiling tools help reveal error counts and distribution. Do not replace all missing amounts with zero or remove all duplicates without knowing their business meaning. Keep a separate exceptions query when the output must be auditable. Filtering source data should be documented so a future refresh does not silently discard new categories or changed statuses.

## Guided walkthrough in the tool
1. Profile a small orders dataset for nulls, duplicates and conversion errors.
2. Identify the business key and verify whether repeated rows are actually duplicates.
3. Separate clearly invalid records into an exceptions query before removal.
4. Reconcile clean row counts and total revenue against the source plus documented exclusions.

### Additional hands-on instruction
Count nulls, errors and duplicate order IDs before building a cleaned output and an exceptions query.

## Business case
Your order table has 2,000 rows, including 50 unmatched product IDs. Deleting those rows would make the revenue figure appear cleaner but omit real orders. Keep them in an exceptions query and investigate the master-data mismatch. Reconcile source, clean and exception totals, so the business can distinguish data gaps from real sales movements.

## Independent practical challenge
List two checks before removing duplicate customer rows.

**Deliverable:** Show how to trace a removed or corrected record back to the source.

## Verify your work
A successful refresh should not automatically be trusted. Confirm the number of rejected records and investigate unexpected changes in the exception rate.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Identify the unique customer key and determine whether repeated rows are valid history or accidental duplicates.

**Common pitfall:** Removing all duplicate-looking rows without checking grain.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
