# Power Bi · Week 01 · Model-first thinking

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Define business metrics and data grain before visuals

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=31982s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Power BI reports are powered by semantic models, not merely the visuals placed on a canvas. Start by defining the decision, measure, reporting period and source grain. For a sales report, decide whether each row represents an order, an order line or a daily summary. Define Net Revenue and Order Count before choosing chart types; otherwise a visually attractive report may still answer the wrong question.

A good model separates reusable business logic from individual report pages. Measures such as [Net Revenue] should return the same definition wherever they are used. The dimensions that users filter—date, customer, region and product—must relate predictably to the fact rows. Plan how refresh, access restrictions and changing source data will affect the model. Validate a small sample outside Power BI before creating many visuals.

## Guided walkthrough in the tool
1. Write a measure dictionary containing formula, unit, time grain and exclusions.
2. Inspect the source table grain, unique keys and expected relationships.
3. Sketch a model with one sales fact table and separate date, product and region dimensions.
4. Create a table visual with a basic sales measure and reconcile it against the source total.

### Additional hands-on instruction
Open Power BI Desktop, Get Data > Text/CSV, inspect the sales data and name fact and dimensions clearly.

## Business case
Suppose a report’s order-count card and regional table disagree. The card uses DISTINCTCOUNT(OrderID), while the table counts line rows. Draw the Sales fact grain and write measures once in a shared model. When both visualisations use the same definition, they become comparable. Measure consistency is more valuable than adding another decorative visual.

## Independent practical challenge
Why should Product dimension SKU values be unique?

**Deliverable:** Write the data grain, a target KPI definition and a report question before designing visuals.

## Verify your work
A beautiful chart cannot repair a duplicated fact table or a badly defined measure. Test the model with one easy-to-verify segment before expanding the dashboard.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
To avoid ambiguous relationship cardinality and incorrect filters

**Common pitfall:** Using many-to-many as a shortcut for dirty dimension keys.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
