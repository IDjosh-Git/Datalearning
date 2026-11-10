# Sql · Week 08 · Date-based cohorts

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Align event dates with business definitions

## Before you begin: open the right file
- Download: `retail_practice.sqlite` in `/downloads/` of your DataLearning project.
- Important fields / tables: customers(customer_id, customer_name, segment, region, signup_date), orders(order_id, order_date, customer_id, region, category, product, quantity, unit_price, unit_cost, discount_pct, status, sales_rep), targets(month_start, region, sales_target).
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=8217s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A cohort groups entities by a shared starting event, such as the month a customer first purchased. A retention table then asks how many members of each starting cohort return in later periods. Distinguish “new customer” from “first order in the selected dataset”; partial history can misclassify old customers as new. Align event dates to the business timezone and use consistent month boundaries.

In retention reporting, the denominator is usually the number of customers in the original cohort, while each later numerator counts returning members from that cohort. Multiple orders by the same customer in a month should count once for customer retention. A cohort matrix should clearly label Month 0, Month 1 and later periods, and should not compare immature recent cohorts against months they have not yet reached.

## Guided walkthrough in the tool
1. Find each customer’s first eligible order date from complete available history.
2. Assign the customer to a cohort month and each order to an activity month.
3. Count distinct active customers by cohort month and elapsed month.
4. Divide by the original cohort size; verify a few customers by tracing their activity.

### Additional hands-on instruction
Group customers by signup month; compare with orders grouped by order month and explain the different populations.

## Business case
Customers A and B first purchased in January. A returned in February, while B did not. January-cohort Month 1 retention is 1/2 = 50%. If A made five February orders, retention is still 50%, not 250%. Count active customers distinctly and divide by the original cohort size, not the number of transactions.

## Independent practical challenge
Why can daily conversion divided by daily activations mislead?

**Deliverable:** Write an unambiguous cohort definition and note which timezone and calendar rules it needs.

## Verify your work
Recent cohorts have fewer observed follow-up months. Leave future periods blank rather than showing them as zero retention, which would be misleading.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Numerator and denominator may describe different populations

**Common pitfall:** Mixing event and cohort denominators.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
