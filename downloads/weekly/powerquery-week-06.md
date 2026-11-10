# Power Query · Week 06 · Append queries

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Combine tables with matching meaning and types

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Append Queries stacks rows from multiple tables. This is useful for combining monthly files with the same column meanings. A properly designed append does not require matching column order, but inconsistent column names or types can create unexpected null columns and conversion errors. Standardise the schema before appending and record the source file or period so that totals remain traceable.

Appending is different from merging. An append adds records vertically; a merge adds columns horizontally by a matching key. If two monthly files overlap, appending can double-count transactions unless duplicates are identified. Check file-level row counts and total amounts before and after the append. Plan how new files will be added during refresh without hard-coding every month’s name.

## Guided walkthrough in the tool
1. Inspect two monthly files and align column names, data types and business meaning.
2. Use Append Queries as New to combine them into a separate output query.
3. Add or retain a SourceMonth field to trace each row.
4. Compare appended row counts and totals with the sum of the individual files; check overlaps.

### Additional hands-on instruction
Split sales by quarter, append back together and compare row totals and column types.

## Business case
January has 100 orders and February has 120. Appending the two queries should produce 220 records before any intentional exclusions. If the combined result has 245, investigate overlapping exports or duplicated file loads. If it has 195, inspect column mismatches or filters. Counts and totals provide fast verification of an append.

## Independent practical challenge
When should you Append rather than Merge two monthly CSV files?

**Deliverable:** Test missing-column behaviour and document your quality checks.

## Verify your work
The combined row count should equal the component counts unless an explicit deduplication step is applied. Verify that unexpected null columns were not created by name mismatches.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Append stacks rows of compatible columns; Merge adds columns by matching keys.

**Common pitfall:** Appending tables that encode different currencies without conversion.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
