# Tableau · Week 01 · Find your way around Tableau

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Connect to a file and identify dimensions and measures

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=26209s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Tableau is a visual analytics application that transforms connected data into interactive views. A worksheet contains one visual analysis; a dashboard combines worksheets; a story can sequence views into an argument. Start in the Data pane by identifying dimensions such as Region or Product and measures such as Revenue or Quantity. Tableau’s suggested roles are useful but not infallible: a numeric customer ID is still a categorical identifier.

A chart is determined by the fields placed on Rows, Columns, Marks and Filters. Tableau aggregates measures by default, so SUM(Revenue) by Region is different from a row-level transaction view. Before dragging fields, decide whether you want a total, count or average and what each mark should represent. Keep a clean workbook structure so other learners can follow how the result was created.

## Guided walkthrough in the tool
1. Connect to a small CSV containing OrderID, Region, OrderDate and Revenue.
2. Inspect dimensions, measures and field data types; correct any misclassified IDs.
3. Drag Region to Rows and SUM(Revenue) to Columns to create a bar chart.
4. Compare the regional totals and grand total with the original file.

### Additional hands-on instruction
Connect to the sales CSV and drag Region to Rows and a revenue measure to Columns; inspect aggregation.

## Business case
A Tableau workbook connects to a CSV containing Region and Revenue. Tableau puts Region under Dimensions and Revenue under Measures, then creates a bar chart when those fields are dragged to Rows and Columns. If Revenue was loaded as text, Tableau may use Count instead of Sum. Correct the field type and compare the total against the source before decorating the view.

## Independent practical challenge
Build a bar chart for North ₦24,000, South ₦18,000 and West ₦30,000. Which region leads?

**Deliverable:** Explain whether each field is discrete or continuous and what one mark represents.

## Verify your work
If the total is unexpectedly a count rather than a sum, check whether Revenue was imported as text. Document the grain of the source before building further views.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
West, with ₦30,000 revenue.

**Common pitfall:** Treating a category identifier as an amount to sum.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
