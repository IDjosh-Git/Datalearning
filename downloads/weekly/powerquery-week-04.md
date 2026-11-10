# Power Query · Week 04 · Text transformations

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Standardise case, spacing and identifiers

## Before you begin: open the right file
- Download: `learning_sales_quality_lab.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=1880s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Text cleaning standardises labels that should represent the same category. “ North ”, “NORTH” and “north” may be three different source strings, but they probably describe one region. Trim removes leading and trailing whitespace; Clean removes many nonprinting characters; uppercase or lowercase makes the matching rule consistent. Keep the raw value available while validating the rule.

Text transformations can also corrupt identifiers if used indiscriminately. Removing punctuation from invoice numbers might merge two distinct codes; title-casing a customer’s name may affect culturally meaningful spelling. Use field-specific rules and check examples before applying them to every row. Where possible, maintain a mapping table for approved category values rather than repeatedly using ad hoc replacements.

## Guided walkthrough in the tool
1. Duplicate a sample Region field for side-by-side comparison.
2. Apply Trim, Clean and Uppercase to the cleaned version.
3. Group the cleaned category values and compare distinct counts with the raw version.
4. Check exceptions such as nonbreaking spaces, nulls and genuine category differences.

### Additional hands-on instruction
Apply Trim and Clean to region, use consistent casing, and review mismatched categories.

## Business case
A branch name appears as “ EAST”, “East” and “east ”. Trim and standardise case to a canonical value before grouping. Compare distinct branch values and revenue totals before and after. If the source also contains “East-1”, do not merge it automatically with “East” without a defined business mapping.

## Independent practical challenge
How would you standardise "  NORTH  " in a Region field?

**Deliverable:** Explain why standardising labels is safe while inventing missing identifiers is not.

## Verify your work
Standardisation is successful when equivalent labels merge and distinct labels remain distinct. Compare group-level totals before and after cleaning to spot unexpected category changes.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Trim whitespace and apply proper case or upper case consistently.

**Common pitfall:** Losing important leading zeroes from identifier columns.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
