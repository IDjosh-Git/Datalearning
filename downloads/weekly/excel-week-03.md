# Excel · Week 03 · Relative and absolute references

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Lock lookup assumptions correctly

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17175s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A cell reference changes when a formula is copied unless you lock the appropriate part. A1 is relative; $A$1 locks both column and row; $A1 locks the column; A$1 locks the row. The right choice depends on the structure of the model. For example, when calculating a discount from a shared rate in B1, write =C2*$B$1 and fill down so every row uses the same rate.

Copying a formula is a form of automated repetition. Errors appear when the reference moves to a header, to an unintended period or outside a lookup range. Before filling a complex model, predict what the copied references should become. Use F4 to cycle reference types in desktop Excel. Even a formula that returns a plausible number may be wrong if it points at the wrong assumptions.

## Guided walkthrough in the tool
1. Create Amount in C2:C6 and enter a single rate in B1.
2. In D2 type =C2*$B$1; copy the formula down and inspect the references.
3. Change B1 to verify that all calculated amounts update together.
4. Create a two-dimensional grid and practise mixed references to lock a heading row and a category column.

### Additional hands-on instruction
Create a small scenario sheet with unit price and quantity, put a rate in $F$1 and copy =B2*C2*(1+$F$1).

## Business case
A discount model stores a rate of 7% in B1 and revenue in C2:C21. Copying =C2*B1 down shifts the rate to B2 and then B3, producing plausible but wrong numbers. Lock the assumption with $B$1. Inspect formulas near the bottom of the table after copying—where reference errors are easiest to spot.

## Independent practical challenge
Write revenue after tax when price is B2 and tax rate in F1.

**Deliverable:** Check three rows against a hand-calculated result and note what changes when a $ is omitted.

## Verify your work
Inspect both the first and last copied formulas. The shared input must remain $B$1, while row-level amounts should advance C2, C3 and so on.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=B2*(1+$F$1)

**Common pitfall:** Using relative tax reference when copying down.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
