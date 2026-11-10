# Introduction · Week 01 · The analyst mindset

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Convert ambiguous requests into measurable questions

## Before you begin: open the right file
- Download: `kiosk_week.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: date, day, units_sold, price_per_meal, unit_cost_per_meal, daily_fixed_cost, weather.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=70s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A data analyst does not start with a chart. Start by translating a decision into a question that can be answered with observed data. “Sales are bad” is a feeling; “Which region had a lower net revenue this month than last month, adjusted for returns?” specifies a measure, grouping, comparison period and adjustment. Ask who will use the result and what action they could take. Write down the population and the meaning of each metric before touching the data.

The same number can tell several stories if its definition changes. Revenue can mean gross sales, net sales after returns, or collected cash. A 10% drop in net revenue might arise from fewer orders, smaller order sizes or more refunds. These are different operational problems requiring different actions. A good analysis separates the observation (what happened) from a proposed explanation (why it happened), then looks for evidence that tests the explanation.

## Guided walkthrough in the tool
1. Interview the stakeholder: name the decision, audience, time period and acceptable level of detail.
2. Rewrite the request as one primary measurable question and two diagnostic sub-questions.
3. List the minimum fields needed: transaction date, region, order ID, amount and refund amount.
4. Sketch the comparison table before calculating it: region, previous month, current month, change and notes.

### Additional hands-on instruction
In the kiosk data, distinguish an observable revenue change from a hypothesis about staffing or pricing.

## Business case
A regional sales manager sees a decline but asks for “a sales chart”. Start with monthly net sales and order count by region. If revenue fell while order count stayed steady, investigate basket size or discounts. If both fell, investigate demand or fulfilment. The chart should lead to a testable next question, not a prematurely confident explanation.

## Independent practical challenge
Write a measurable question for a declining delivery service.

**Deliverable:** Hand in a one-sentence question, its measure, timeframe and two alternative explanations.

## Verify your work
A measurable question identifies a unit of comparison, a calculation and a time boundary. Before presenting a cause, test alternative explanations and any missing data. Write one sentence saying what the current figures cannot establish.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Which region had the largest month-on-month decline in on-time delivery rate?

**Common pitfall:** Treating correlation as proof of cause.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
