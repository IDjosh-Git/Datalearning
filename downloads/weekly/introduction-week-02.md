# Introduction · Week 02 · Data types and measurement

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Distinguish numeric, categorical, dates and identifiers

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17311s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Data types determine which transformations and summaries make sense. A numeric quantity such as units sold can be added; a customer ID that happens to contain digits must be treated as an identifier. Categories (region, product type) support grouping. Dates support periods and elapsed time. A Boolean field records two logical states, while free text may require additional cleaning or categorisation. Distinguish a field’s business meaning from the type your software inferred when it imported the file.

Measurement scale also matters. A product code is a nominal category; a satisfaction rating from 1 to 5 is ordinal because 5 ranks above 4 but the gap may not be equal to the gap between 2 and 1. A currency amount has arithmetic meaning, but only when units and exchange rates are compatible. Treat missing values as “unknown” until their cause is understood; zero is often a real observation rather than a synonym for blank.

## Guided walkthrough in the tool
1. Inspect ten rows and write a short data dictionary: field, meaning, permitted values and expected type.
2. Mark IDs as text to retain leading zeros; inspect dates for day/month ambiguity.
3. Try a valid operation for each field: total amount, count category values, or group by month.
4. Compare the imported type to the intended type and record any conversion failures.

### Additional hands-on instruction
Import the sales CSV and classify columns as dates, amounts, labels or keys. Test leading zeros in identifiers.

## Business case
A field imported as 20261101 might be a date key rather than a quantity. If your spreadsheet sums it, the output is meaningless despite being numeric. Convert a documented YYYYMMDD key into a date only after verifying that the source convention is consistent. Keep a separate raw ID text field when leading zeros carry meaning.

## Independent practical challenge
Classify 00125, 2026-06-01, ₦18,500 and Completed.

**Deliverable:** Explain why adding customer IDs produces a meaningless total, then document the correct measure type.

## Verify your work
Your data dictionary should distinguish identifiers, measures, categories and dates. Do not average customer IDs or sum satisfaction labels. After conversions, confirm that row counts and identifiers have not changed unexpectedly.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
identifier; date; currency/numeric; categorical

**Common pitfall:** Converting identifiers to numbers and losing leading zeros.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
