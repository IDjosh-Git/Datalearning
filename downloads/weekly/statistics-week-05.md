# Statistics · Week 05 · Sampling and bias

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Recognise when a sample misrepresents users

## Before you begin: open the right file
- Download: `learning_experiment.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: session_id, variant, converted, device, region, basket_items.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=bvglAgAZtXE.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Sampling allows us to estimate features of a large population using a smaller set of observations. A simple random sample gives each eligible member a known selection chance. Stratified sampling divides the population into important groups and samples from each; this can improve representation for smaller groups. Convenience sampling uses easy-to-reach people and may be strongly biased. Choosing more observations does not automatically correct a biased method.

Bias can arise from who is selected, who refuses to respond, how a question is worded or when data is collected. A weekday-only customer survey may miss weekend shoppers, and an online-only form excludes people without access. Before interpreting an estimate, ask whether the sample resembles the target population on relevant factors. Explain coverage gaps and avoid treating a survey proportion as an exact census result.

## Guided walkthrough in the tool
1. Define the target customer population and list groups likely to behave differently.
2. Compare a weekday-only convenience survey with a sampling plan covering all trading days.
3. Choose a sampling method and explain how participants would be selected.
4. Document likely coverage and non-response biases and how you would assess their severity.

### Additional hands-on instruction
Inspect experiment records by device and region; compare group composition before measuring lift.

## Business case
A survey about Saturday shopping is collected only on Tuesday mornings. The resulting sample may underrepresent weekend-only shoppers, even if many responses are collected. A better design covers different shopping periods and checks representation of relevant groups. Sample size does not fix an exclusion built into the selection process.

## Independent practical challenge
Name one sampling problem in surveying only app users who opened a promo email.

**Deliverable:** Identify who might be missing from the sample and what additional data would reduce bias.

## Verify your work
A sample is useful only if its limitations are understood. Compare sampled group proportions against known population benchmarks where possible, and disclose gaps rather than overclaiming precision.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Selection bias: many customers never receive or open that email.

**Common pitfall:** Generalising from a convenience sample without caveats.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
