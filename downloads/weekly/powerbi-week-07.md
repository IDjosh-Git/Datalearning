# Power Bi · Week 07 · DAX denominator control

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Make percentage metrics interpretable

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=8512s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Percentage measures are ratios, not standalone sums. Divide the correct numerator by the correct denominator using DIVIDE to handle zero denominators safely. A category’s share of total revenue often needs to remove the category filter from the denominator while respecting the chosen date or region. ALL, REMOVEFILTERS and ALLSELECTED affect filters differently; select the behaviour that matches the report question.

A share-of-total measure can be correct in a detail row yet confusing in a total row or under a slicer. “Share of all company sales” differs from “share of the currently selected products”. Explain which you are reporting. Use a small table with category amounts, denominator amounts and percentage values to reveal what the formula is actually doing.

## Guided walkthrough in the tool
1. Create a base [Revenue] measure and display it by product category.
2. Define a denominator that removes only the Product[Category] filter.
3. Calculate percentage with DIVIDE and apply a percentage format.
4. Change date and region slicers; verify the denominator reacts as the written definition requires.

### Additional hands-on instruction
Calculate target attainment using DIVIDE(SUM(Net Sales),SUM(Target)) then test region and month slicers.

## Business case
A Category Share measure shows 40% for Furniture when all products are visible. A slicer limiting products to Furniture and Electronics may change the intended denominator. Decide whether the question is share of all products or share of selected products. Use filter modifiers accordingly, and test the measure under multiple slicer states.

## Independent practical challenge
Which DAX function guards against divide-by-zero?

**Deliverable:** Show the overall percentage from aggregate totals rather than averaging regional percentages.

## Verify your work
Category percentages should add up appropriately for the selected population and mutually exclusive categories. Do not assume that every selection will sum to exactly 100% if other filters remain in place.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
DIVIDE(numerator,denominator)

**Common pitfall:** Using / without considering zero denominators.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
