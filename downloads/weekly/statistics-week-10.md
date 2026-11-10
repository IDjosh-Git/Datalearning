# Statistics · Week 10 · Simple regression and reporting uncertainty

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Use a basic trend line with suitable caveats

## Before you begin: open the right file
- Download: `learning_forecast_series.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, net_sales_ngn, orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=7ArmBVF2dCs.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Simple linear regression models the average linear association between a response Y and a predictor X. The fitted equation is often written ŷ = a + bX, where a is the intercept and b is the estimated change in predicted Y for a one-unit increase in X. For an illustrative model ŷ = 20 + 3X, an X value of 8 gives a predicted Y of 44. The units and observed range of X matter when interpreting both parameters.

Regression is not proof of causation. Omitted factors can influence both the predictor and the response, and extrapolating far beyond the observed X range can produce unreliable predictions. Inspect residuals for patterns and outliers, examine predictive error and report uncertainty. A technically valid fitted line may perform poorly in a new group or future period. Explain what question the model can answer and what evidence would be required to claim a causal effect.

## Guided walkthrough in the tool
1. Plot the predictor and response to inspect shape, outliers and potential nonlinearity.
2. Fit or inspect a simple regression equation and explain the intercept and slope in business units.
3. Calculate a prediction within the observed range and compare it to known values.
4. Check residual patterns, range limits and limitations before writing a recommendation.

### Additional hands-on instruction
Plot month and net_sales_ngn, fit a simple baseline and inspect residual seasonality.

## Business case
A fitted model predicts Orders = 20 + 3 × Advertising Units. At 8 units, the prediction is 44 orders. But if the model was fitted only for advertising units from 1 to 10, predicting at 100 units is extrapolation and much less reliable. Review residual patterns and alternative influences before making a budget recommendation.

## Independent practical challenge
Predict orders at 8 units using orders = 20 + 3x.

**Deliverable:** Separate interpolation from extrapolation and state what accuracy measure you would track.

## Verify your work
For the illustrative model, X = 8 predicts Y = 44. This describes the fitted association, not a guaranteed outcome or a proven causal effect of changing X.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
44 orders; an association, not proof the spend caused the change.

**Common pitfall:** Extrapolating outside observed data and implying causation.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
