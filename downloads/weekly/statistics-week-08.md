# Statistics · Week 08 · Confidence intervals

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Explain an estimate and its uncertainty

## Before you begin: open the right file
- Download: `learning_experiment.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: session_id, variant, converted, device, region, basket_items.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=bS2Tmxpc0mw.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A confidence interval reports an estimate and the uncertainty implied by a statistical procedure. Suppose a sample conversion rate is 20% and the calculated 95% interval is 16%–24%. The interval expresses a range produced by a method designed to contain the fixed population rate in roughly 95% of repeated samples, under the model’s assumptions. It does not mean the population rate randomly changes between 16% and 24%.

Interval width reflects sample size, observed variability and the chosen confidence level. Larger reliable samples often yield narrower intervals; a higher confidence level generally yields wider intervals. A narrow interval can still be misleading if sampling bias or measurement error is present. Use confidence intervals when decisions depend on precision, not just on a single point estimate. Compare uncertainty with the minimum business difference that would change your action.

## Guided walkthrough in the tool
1. State the population parameter you want to estimate and the sampling method.
2. Write the sample estimate and reported interval using the correct units.
3. Compare a wider and narrower interval and discuss what precision means for the decision.
4. List assumptions and potential biases that the interval calculation does not solve.

### Additional hands-on instruction
Estimate A/B conversion rates from learning_experiment.csv and compare plausible uncertainty intervals.

## Business case
Two conversion experiments report rates of 20%. Experiment A has a confidence interval from 10% to 30%; B has one from 18% to 22%. B is more precise under the stated assumptions, though both share the same point estimate. Before declaring either reliable, check the sampling design and whether the interval method fits the data.

## Independent practical challenge
How should you describe a 95% interval of 16%–24% for conversion?

**Deliverable:** Report sample sizes and discuss why a small difference may be inconclusive.

## Verify your work
Interpret the interval in relation to the repeated-sampling procedure, not as a posterior probability about a fixed parameter. Always state the sample size and relevant assumptions.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Under repeated sampling, the method would cover the population rate in about 95% of samples.

**Common pitfall:** Claiming a 95% probability that a fixed population rate is in this particular interval.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
