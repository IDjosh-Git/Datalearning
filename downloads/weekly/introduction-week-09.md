# Introduction · Week 09 · Insight storytelling

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Move from observation to evidence-backed action

## Before you begin: open the right file
- Download: `learning_monthly_kpis.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: month, region, net_sales_ngn, sales_target_ngn, gross_profit_ngn, order_count, late_shipments, returned_orders.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=PSNXoAs2FtQ&t=29175s.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
An effective insight has four linked parts: context, finding, evidence and recommendation. “Sales fell” is a finding; “net sales fell 12% in the West between August and September, while the rest of the business remained stable” supplies stronger evidence and a comparison. The recommendation should be proportional to the evidence, such as investigating delivery disruption in that region—not claiming a cause you have not tested.

Separate facts from hypotheses. Note the dataset, time window, baseline and any relevant uncertainty. Make the next action specific: who should act, what should be checked, and when. For an executive audience, one clear headline, a well-labelled chart and two or three implications are usually better than many decorative charts. For technical reviewers, include the calculation method and validation details.

## Guided walkthrough in the tool
1. Write a one-sentence headline that states a quantified finding with a comparison.
2. Add one chart or table showing the evidence and data coverage.
3. List two alternative explanations and the checks that would help distinguish them.
4. Recommend a specific next action with an owner and follow-up metric.

### Additional hands-on instruction
Compare two months of regional sales, identify the largest absolute variance and suggest a follow-up query.

## Business case
A dashboard shows that customer complaints increased when average delivery time rose. Say “the two measures increased together in the observed weeks,” then test if complaints concerned delayed deliveries and whether reporting practices changed. Recommend investigating late dispatches. Avoid asserting that delivery time caused every complaint without supporting evidence.

## Independent practical challenge
Write an insight using observation, evidence and action.

**Deliverable:** Create a 90-word insight with one recommendation and one statement of what the data does not establish.

## Verify your work
Read the story backward: if the recommendation does not follow from the data, revise it. Avoid implying causality or certainty beyond what the available evidence can support.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
observation + quantified evidence + recommended next step

**Common pitfall:** Claiming a cause without testing alternatives.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
