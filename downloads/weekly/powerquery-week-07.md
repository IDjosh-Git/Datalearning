# Power Query · Week 07 · Merge queries

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Join related tables and detect missing matches

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=VO-MyVMKUC4.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Merge Queries joins tables horizontally using matching keys. For example, a Sales table may reference a ProductID, while a Products table supplies the product name and category. Select the key columns in both tables and a join kind that fits the reporting question. A Left Outer join retains all Sales rows and attaches matching Product fields; unmatched products appear with null attributes.

Duplicate keys on the lookup side can multiply sales rows when you expand the joined table. Before merging, check key uniqueness and matching types. After the merge, compare the row count and revenue total with the original Sales table. Keep unmatched records visible for investigation rather than silently excluding them from the report. This makes the merge both analytically correct and auditable.

## Guided walkthrough in the tool
1. Inspect uniqueness of Products[ProductID] and matching types in both queries.
2. Merge Sales with Products using ProductID and a Left Outer join.
3. Expand only the needed descriptive columns and look for missing matches.
4. Reconcile Sales row count and revenue total before and after expansion.

### Additional hands-on instruction
Use a one-column region lookup built from the sales CSV, merge by region and check match counts.

## Business case
The Products table contains two versions of one ProductID. Merging and expanding both matches duplicates a Sales row, inflating revenue. Check lookup-key uniqueness before merge, retain a source identifier, and compare row count and revenue after expansion. When a product has no match, preserve the Sales record while investigating the missing metadata.

## Independent practical challenge
What happens to unmatched order rows in a Left Outer merge?

**Deliverable:** Run an anti-join to find missing lookups before loading to the report model.

## Verify your work
If the number of Sales rows increases, investigate duplicate matching keys. If product names are null, inspect missing or differently formatted IDs before changing join type.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
All left-side orders remain, with null fields for unmatched products.

**Common pitfall:** Using an inner join and silently discarding unmatched orders.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
