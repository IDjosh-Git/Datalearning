# Statistics · Week 06 · Probability in everyday analysis

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Calculate simple conditional and joint probabilities

## Before you begin: open the right file
- Download: `learning_experiment.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: session_id, variant, converted, device, region, basket_items.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=_IgyaD7vOOA.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Probability measures the chance of an event on a scale from 0 to 1. If 15 of 60 equally relevant observed orders contain an error, the observed error proportion is 15/60 = 0.25, or 25%. Conditional probability concerns a specific subset: P(Error | North) is the error proportion among North-region orders, not among all orders. The denominator changes when the condition changes.

Joint probability asks how likely two events are together. For example, P(North and Late) divides the count of orders that are both North and late by the full relevant population. Do not assume events are independent; region and lateness may be associated. A historical proportion is an estimate of future chance only under appropriate sampling and stability assumptions. Always show numerator, denominator and conditioning group.

## Guided walkthrough in the tool
1. Draw a small two-way frequency table for Region and Late/On-time status.
2. Calculate the overall late-order proportion using all eligible orders.
3. Calculate P(Late | North) using only North-region orders as the denominator.
4. Calculate P(North and Late) using all orders and explain how it differs from the conditional probability.

### Additional hands-on instruction
Calculate conversion proportion within mobile sessions and overall; list numerators and denominators.

## Business case
Of 100 orders, 30 are North-region and 12 of those are late. P(Late | North) = 12/30 = 40%, while P(North and Late) = 12/100 = 12%. Both numbers describe the same 12 late orders but answer different questions. The denominator is part of the probability definition.

## Independent practical challenge
If 15 of 60 orders have errors, what is P(Error)?

**Deliverable:** Explain the difference between P(Convert | Mobile) and P(Mobile and Convert).

## Verify your work
Probabilities must remain between zero and one. If your conditional probability exceeds one or disagrees with a table count, re-check which group belongs in the denominator.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
15/60 = 25%.

**Common pitfall:** Confusing conditional probability with overall probability.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
