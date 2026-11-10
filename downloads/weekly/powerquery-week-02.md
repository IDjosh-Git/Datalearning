# Power Query · Week 02 · Data types and locale

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Convert text, dates and currency reliably

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power Query stores each column using a data type such as text, whole number, decimal number, date or datetime. A value that looks like 12/11/2026 can mean different dates depending on locale. Explicitly set the correct locale when parsing imported dates or numeric separators. A currency field containing a symbol may need cleaning before numerical conversion. Do not allow silent conversion failures to turn valid records into errors or nulls.

Identifiers often require text type. If a customer code 00125 is converted to whole number, its leading zeros disappear. Dates should be validated against plausible ranges after conversion, and currency amounts should be in consistent units. When a source uses mixed date formats, a single global conversion may be unsafe. Separate exceptional records for investigation instead of repeatedly guessing the intended meaning.

## Guided walkthrough in the tool
1. Inspect fields that look numeric or date-like and sample their original source strings.
2. Use Change Type with Locale to parse one known date format correctly.
3. Keep business IDs as text and convert genuine amounts to a decimal or currency type.
4. Inspect error rows and compare sums, minimum dates and row counts after conversion.

### Additional hands-on instruction
Import the deliberately dirty file and inspect 03/02/2026 as text before applying locale; document the intended date order.

## Business case
An imported date string “04/05/2026” could mean April 5 or May 4. Parsing it under the wrong locale can produce a valid but incorrect date that is hard to notice. Compare several known source records and choose the intended locale explicitly. Type conversion should preserve business meaning, not merely eliminate error messages.

## Independent practical challenge
Why is the correct locale important for converting 03/04/2026?

**Deliverable:** Identify rows requiring business confirmation rather than guessing date conventions.

## Verify your work
A type conversion is correct only if representative records keep their intended meanings. Test ambiguous dates such as 03/04/2026 and confirm the correct month and day.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Without a locale it can mean 3 April or 4 March.

**Common pitfall:** Using a display format to fix underlying type errors.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
