# Excel · Week 07 · Data cleaning

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Standardise text and verify duplicates

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=22498s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Text data often contains invisible whitespace, inconsistent letter case and stray characters. TRIM removes ordinary extra spaces; CLEAN removes many nonprintable characters; SUBSTITUTE replaces specific characters. Before joining tables or counting categories, standardise these fields and confirm that two values which look identical really compare as equal. Email addresses, category labels and external IDs deserve special care.

Duplicate detection must use the correct key. Two customers with the same name are not necessarily duplicate customer records; an OrderID repeated with different LineNumbers may be expected. Create a cleaning column rather than overwriting the source immediately, compare before-and-after distinct counts, and keep an exception list. Excel Text to Columns or Power Query can help split imported text fields reproducibly.

## Guided walkthrough in the tool
1. Create a RawRegion column with differences in capitalisation and spacing.
2. Create CleanRegion using TRIM, CLEAN and a consistent casing rule.
3. Compare unique counts before and after normalisation and inspect merged categories.
4. Flag duplicate business keys with COUNTIF but confirm whether the record grain permits repeats.

### Additional hands-on instruction
Import the dirty sales file, inspect blank price, malformed quantity and duplicated order ID, and make a corrected copy.

## Business case
Imported regions include “South”, “ south” and “SOUTH”. Trimming and standardising their case makes reports group them together. But “South-East” and “South East” might be distinct official categories; do not automatically replace punctuation without an approved mapping. Inspect the frequency table before and after cleaning to catch mistaken merges.

## Independent practical challenge
Propose a quick clean-up sequence for imported customer names.

**Deliverable:** Write a before/after quality summary and keep every disputed row in an exceptions tab.

## Verify your work
If values are still different after TRIM, look for non-breaking spaces or character-encoding issues. Do not delete all duplicates until you know why they appeared.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
check types; TRIM/CLEAN; standardise case; inspect duplicates

**Common pitfall:** Deleting records solely because customer names repeat.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
