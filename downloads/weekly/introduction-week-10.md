# Introduction · Week 10 · End-to-end project

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Deliver a reproducible analytical recommendation

## Before you begin: open the right file
- Download: `learning_sales_2026.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: order_id, order_date, region, category, quantity, unit_price_ngn, unit_cost_ngn, status, customer_id, channel.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=23562s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
An end-to-end analytics project is a documented chain from business question to decision. Define the audience and success measure, inspect source data, document the grain, clean with reproducible rules, calculate metrics, validate outputs, and communicate findings. The finished deliverable is more than a dashboard: it is a trustworthy explanation of how each number was produced and what the business should do next.

Reproducibility means that someone else can run the same steps on refreshed data and obtain the same definitions and comparable results. Preserve data dictionaries, queries or transformation steps, metric formulas and the decision log. Quality assurance is part of the project—not an optional final glance. Your final recommendation should identify likely benefits, uncertainty and any further evidence required before a high-impact decision.

## Guided walkthrough in the tool
1. Write a project brief with business question, stakeholders, decisions and measurable success criteria.
2. Prepare a source inventory and quality log, then create a clean analysis table at a stated grain.
3. Build two diagnostic views and validate each metric against an independent sample calculation.
4. Present findings, limitations and a recommendation; package the data dictionary and repeatable steps as evidence.

### Additional hands-on instruction
Combine sales and monthly targets into a two-chart executive summary. Match month and region before comparing.

## Business case
A restaurant chain wants to reduce cancellations. Your report should show cancellation rate by location and week, data exclusions, and an example investigation: are cancellations concentrated around long preparation times? Deliver a dashboard, reproducible query, field definitions and one-page recommendation. Another analyst should be able to rerun the project after new data arrives.

## Independent practical challenge
List the minimum sections of an analysis handover.

**Deliverable:** Submit a mini-report with question, data checks, KPI definition, findings, limitations and action.

## Verify your work
A reviewer should be able to trace any headline value back to its source records and transformations. Include a reproducibility checklist and a short note describing what you would improve with more time.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
question; method; findings; limitations; recommendation

**Common pitfall:** Presenting charts without a decision or validation.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
