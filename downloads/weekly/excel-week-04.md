# Excel · Week 04 · SUMIFS and COUNTIFS

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Aggregate records across multiple criteria

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=17175s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
SUMIFS adds values that satisfy every specified condition. The first argument is the range of amounts to sum; each later pair supplies a criteria range and its criterion. COUNTIFS counts qualifying records instead of adding amounts. With Sales[Region] and Sales[Status], SUMIFS can calculate completed revenue in the East without first filtering rows manually. Every criteria range must cover the same number of records as the sum range.

Text criteria need quotation marks, while operators used with cell values require concatenation: ">="&G2. Dates should be true Excel dates, not ambiguous text. SUMIFS evaluates conditions as AND; an OR condition usually needs separate results combined or a different approach. Validate formulas against a filtered subset and be explicit about whether missing values count as zero, omitted or unknown.

## Guided walkthrough in the tool
1. Create columns Region, Status, Date and Revenue in an Excel Table.
2. Write a SUMIFS for completed East revenue and COUNTIFS for the corresponding order count.
3. Add a date boundary with criteria such as ">="&DATE(2026,11,1).
4. Filter the source to the same rows and reconcile total and count manually.

### Additional hands-on instruction
Use completed rows in the sales CSV. Calculate regional revenue with SUMIFS on a calculated line-revenue column.

## Business case
The finance team needs sales from East completed orders in November. Sum the Revenue field with Region = East, Status = Completed and dates inside the November window. Verify a few filtered orders manually. A surprisingly low total could mean dates were imported as text or “East ” contains a trailing space.

## Independent practical challenge
Count rows where Region=West and Status=Won in Sales.

**Deliverable:** Compare two region totals with a PivotTable and disclose that cancelled orders were excluded.

## Verify your work
A result of zero may mean no matching rows, a mismatched category spelling or amounts stored as text. Compare the criteria values to source rows before changing the formula.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
=COUNTIFS(Sales[Region],"West",Sales[Status],"Won")

**Common pitfall:** Using different-sized criteria ranges.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
