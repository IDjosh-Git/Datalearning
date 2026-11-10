# DataLearning practice resources — fictional training data

All records in the `learning_*.csv` files are **synthetic**. Names, dates, amounts and outcomes are teaching examples, not actual customers, staff, transactions or experiments.

## File selection
- `learning_sales_2026.csv`: transaction grain, formula work, SQL SELECT/JOIN/GROUP BY, Power Query and BI dashboards. `unit_cost_ngn` is **cost per unit**, so row margin is `(unit_price_ngn - unit_cost_ngn) * quantity` for Completed orders.
- `learning_sales_quality_lab.csv`: contains deliberate inconsistent dates, missing amounts, duplicate order IDs, region spacing and non-numeric quantity. Inspect and log corrections; do not simply delete rows.
- `learning_product_catalog.csv`: lookups and joining product records; note the catalog has SKUs but the sales file has category, not SKU—use it independently unless creating a valid SKU key.
- `learning_monthly_kpis.csv`: already aggregated monthly business KPIs and targets; **do not** join it at order-row grain without deliberate allocation or aggregation.
- `learning_experiment.csv`: binary conversion outcomes, groups A/B, device segments. Small synthetic lift is **not proof** of statistical significance.
- `learning_statistics_sample.csv`: distribution, outliers, correlation and modeling; investigate the deliberately extreme delivery value.
- `learning_customer_cohorts.csv`: signup-month cohorts and customer counts; do not confuse one row per customer with order events.
- `learning_forecast_series.csv`: monthly time series and baseline forecast exercises.
- `learning_ai_review_cases.csv`: prompt-quality and responsible AI review; do not upload real confidential information.
- `learning_staff_operations.csv`: categorical summaries and ethical aggregated reporting (all synthetic IDs).

## Shared exercise convention
For transaction analysis use `Completed` unless a task explicitly requires gross and returned sales; report whether cancelled/returned orders were excluded. Keep original files unchanged, record any transformations, and validate aggregations against source totals. CSV files use UTF-8 with BOM for better spreadsheet interoperability. Software licenses, local Python environment and actual cloud access are **not** bundled.
