# Excel · Week 06 · Dynamic arrays

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Create maintainable filtered and deduplicated outputs

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=zXnQNytHCPM.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Dynamic array functions return a collection of values that can spill into neighbouring cells. FILTER returns rows meeting a condition; UNIQUE removes repeated items; SORT orders a result. These functions let the report update when the source table grows without manually copying a formula down. For example, =SORT(UNIQUE(Sales[Region])) creates an automatically updated region list.

A spill needs empty destination cells. If a formula reports #SPILL!, check for blocking content or merged cells rather than altering the logic blindly. Spilled arrays are useful for summary lists and audit tables, but their size can change after refresh. Design downstream references and sheet layouts around that behaviour. Test both a populated result and the case where no records meet a filter.

## Guided walkthrough in the tool
1. Create a Table with Region, Status and Revenue fields.
2. Use UNIQUE and SORT to produce an independent list of regions.
3. Use FILTER to display rows for a chosen status, including an if-empty message.
4. Add a new region and confirm that the list expands without manually editing a range.

### Additional hands-on instruction
From sales data, use UNIQUE and SORT for region lists, then FILTER completed orders from a selected region.

## Business case
A regional dashboard needs an automatically updated list of active areas. SORT(UNIQUE(Sales[Region])) creates the list without manually maintaining its length. FILTER can display completed records for the selected region. Test what happens when a region disappears or is newly added, and give the spill formula enough empty cells to expand.

## Independent practical challenge
Produce sorted unique product names from Sales[Product].

**Deliverable:** Show which cell holds the formula, where the results spill and what causes #SPILL!.

## Verify your work
Use a deliberately empty condition to confirm your no-results message. Ensure the result area has room to expand and that the source table headers are not repeated in each spill row.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=SORT(UNIQUE(Sales[Product]))

**Common pitfall:** Blocking a spill range or using unsupported Excel editions.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
