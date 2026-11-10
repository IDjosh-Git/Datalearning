# Excel · Week 01 · Excel data types

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Format values without confusing storage types

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=zXnQNytHCPM.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Excel displays values according to their number format, but storage type controls calculations. Entering 18500 as a numeric amount and formatting it as currency does not change the underlying value. Entering “₦18,500” as uncleaned text may stop SUM from including it. Dates are stored as serial numbers with display formats; mixing a text date and a true date leads to inconsistent filtering and time calculations.

Identifiers are different from amounts. A customer code such as 00125 must remain text because removing leading zeros changes the identifier. Before using formulas, inspect cells with alignment, ISNUMBER, ISTEXT and date formatting. Convert carefully and validate the results. Formatting a text number to currency usually does not convert it to a number; a deliberate data-cleaning step is required.

## Guided walkthrough in the tool
1. Build a four-column table with CustomerID, OrderDate, Amount and Status.
2. Enter IDs as text; enter amounts as numbers and apply a currency format separately.
3. Use ISNUMBER on Amount and test whether sorting OrderDate works chronologically.
4. Compare SUM(Amount) with a hand calculation; inspect unexpected blank or zero results.

### Additional hands-on instruction
Open the sales CSV, apply Date and Currency formats, and test =ISNUMBER() on a true date or amount.

## Business case
Imagine a column of order amounts imported as text because every value includes a currency symbol. The spreadsheet may display the amounts convincingly while SUM reports zero. Keep the source values, parse a clean numeric column, and compare three records to invoices. Format the clean column as currency only after conversion, and report how many rows could not be parsed.

## Independent practical challenge
How do you test whether A2 contains a genuine Excel date?

**Deliverable:** Identify one text-as-number trap and show how to correct it without losing the original.

## Verify your work
Type test formulas are diagnostics, not corrections. After converting text numbers, re-check total, row count and the original values to ensure no amounts were silently lost.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=ISNUMBER(A2)

**Common pitfall:** Mistaking display formatting for changing the underlying type.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
