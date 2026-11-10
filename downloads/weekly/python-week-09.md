# Python · Week 09 · Time series, charts and testable forecasts

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Time-series analysis must respect time order; random train/test splits can leak future information.

## Before you begin: open the right file
- Download: `learning_forecast_series.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, net_sales_ngn, orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=GPVsHOlRBBI&t=21168s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Time-series analysis must respect time order; random train/test splits can leak future information.



## Guided walkthrough in the tool
1. Identify the input schema, grain and business metric.
2. Apply the technique demonstrated in the lesson using the selected practice dataset.
3. Reconcile the output with the source and document assumptions.
4. Turn the result into a concise report with one defensible recommendation.

### Additional hands-on instruction
Make a 3-month trailing baseline from the forecast series, then test it on later months.

## Business case
Time-series analysis must respect time order; random train/test splits can leak future information.

## Independent practical challenge
Make a 3-month trailing baseline from the forecast series, then test it on later months.

**Deliverable:** Report MAE and compare against a naive last-month forecast.

## Verify your work
Report MAE and compare against a naive last-month forecast.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
