# Statistics · Week 09 · Hypothesis tests and p-values

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
State hypotheses and avoid common interpretation errors

## Before you begin: open the right file
- Download: `learning_experiment.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: session_id, variant, converted, device, region, basket_items.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=vyX4m89VkyI.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A hypothesis test evaluates how compatible observed data are with a proposed null model. Begin with a null hypothesis H₀ and an alternative H₁, choose a suitable test, define the significance threshold in advance, and check assumptions. A p-value is the probability, under the null model and testing procedure, of results at least as extreme as the observed evidence. It is not the probability that H₀ is true.

A small p-value can support rejecting the null model under the stated assumptions, but statistical significance is not the same as practical importance. A huge sample can detect a tiny effect that the business does not care about. Conversely, a non-significant result does not prove there is no effect. Report the effect estimate and its uncertainty alongside the p-value, and consider multiple-testing risk when checking many metrics or subgroups.

## Guided walkthrough in the tool
1. Write H₀ and H₁ in terms of a measurable business quantity.
2. Check test assumptions and choose an appropriate procedure before viewing results.
3. Compare the p-value with the pre-specified threshold and state the resulting decision.
4. Discuss effect size, confidence interval and practical importance before recommending action.

### Additional hands-on instruction
Define a null of equal A/B conversion, set alpha before inspection and calculate or interpret a suitable test.

## Business case
A new checkout treatment shows p = 0.03 under a correctly specified test with pre-selected α = 0.05. That result can justify rejecting H₀ in the chosen framework, but it does not prove a large effect or a 97% probability that the treatment works. Report the estimated conversion difference and its confidence interval before deciding whether to deploy it.

## Independent practical challenge
At a pre-specified 5% significance level, what decision follows p=0.03?

**Deliverable:** Report effect size, interval and caveats, not just a pass/fail significance label.

## Verify your work
With α = 0.05 and p = 0.03, you would reject H₀ under the test assumptions. You would not conclude that H₀ has a 3% probability of being true.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Reject H0, subject to assumptions; do not infer practical importance from p alone.

**Common pitfall:** Equating statistical significance with a large business impact.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
