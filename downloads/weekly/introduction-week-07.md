# Introduction · Week 07 · Business metrics

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Define KPI numerator, denominator and timeframe

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=WH937Gc_8eg&t=2770s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A key performance indicator (KPI) is a metric linked to a decision. Define it as a precise calculation with numerator, denominator, eligible population, period, unit and exclusions. “Conversion rate” could mean purchases divided by website visitors, checkout sessions or qualified leads; each is valid for a different question. Without a definition, two reports can disagree while both are mathematically correct.

Ratios can be especially deceptive when groups differ in size. If one branch converts 20 of 100 visits (20%) and another converts 12 of 40 (30%), the combined conversion is 32 of 140, or about 22.9%—not the simple average of 20% and 30%. When comparing time periods, check whether the comparison is like-for-like, whether the denominator changed, and whether the observed difference exceeds ordinary variation.

## Guided walkthrough in the tool
1. Draft a KPI specification card listing owner, business question, formula, source, grain and refresh frequency.
2. Calculate numerator and denominator independently before dividing; handle a zero denominator explicitly.
3. Segment the KPI by period and category and recombine using weighted totals, not averaged percentages.
4. Set a reporting threshold based on business impact and validate the metric against a known sample.

### Additional hands-on instruction
With monthly KPI data, compute sales attainment = net_sales_ngn / sales_target_ngn. Compare regions without summing percentages.

## Business case
Two stores report conversion rates of 20% and 30%. Store A had 100 visitors and store B had 40, so 20 + 12 = 32 purchases among 140 visits. The overall rate is approximately 22.9%, not 25%. Weighted aggregation matters whenever denominators differ. Include visitors and purchases in the KPI specification.

## Independent practical challenge
Compute rate if 54 of 180 qualified leads converted.

**Deliverable:** Reconcile the total attainment from summed sales and targets, then state the strongest underperformance.

## Verify your work
A KPI definition should be reproducible by someone who did not build the dashboard. Label the timeframe and whether the value is daily, monthly or cumulative.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
30%

**Common pitfall:** Mixing different cohorts and denominators.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
