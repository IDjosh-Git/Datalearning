# Introduction · Week 06 · Charts and visual perception

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Choose visuals aligned to analytical questions

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=21589s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Choose a chart by the relationship you need to show. A bar chart compares categories, a line chart shows a measure over a meaningful time sequence, a histogram shows how continuous values are distributed, and a scatterplot explores the association between two numeric variables. Do not put unrelated quantities on the same axis or select a decorative visual before defining the question it must answer.

Visual perception can mislead. A bar chart whose vertical axis starts far above zero may exaggerate a small difference in magnitude. Crowded category labels, rainbow palettes, 3D perspective and unlabelled percentages make comparisons harder. A line chart must not connect categories as if they had an ordered numeric scale. Use informative titles, readable units and a restrained colour system so the evidence is easier to interpret.

## Guided walkthrough in the tool
1. Write the analytical question above the draft chart and identify its comparison type.
2. Prepare the table at the right grain, including a consistent date order or category ranking.
3. Choose the simplest suitable visual and set a defensible axis scale and units.
4. Ask a peer to explain the main finding from the chart without prompting; revise any unclear labels.

### Additional hands-on instruction
Plot monthly net sales as a line and regions as a horizontal bar; label units and disclose aggregation.

## Business case
A manager wants to compare delivery performance across branches. Use bars for branch-level on-time percentages, with a consistent zero baseline if bars encode magnitude. If the question changes to monthly movement, switch to a line chart with an ordered month axis. A 3D pie chart would make both comparisons harder to read.

## Independent practical challenge
Choose charts for quarterly sales trend and top-five products.

**Deliverable:** Write one evidenced observation and one limitation for each visual.

## Verify your work
The chart should let a reader answer the original question within seconds. Check that totals, category order and axis values match the source; do not infer causality from a chart alone.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
line chart for time; bar chart for product comparison

**Common pitfall:** Using a pie chart for dozens of categories.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
