# Statistics · Week 03 · Range, variance and standard deviation

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Describe how spread affects a typical value

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=SzZ6GpcfoQY.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Spread measures how far observations vary. The range is maximum minus minimum. Variance averages squared deviations from the mean, and standard deviation is its square root, returning the measure to the original units. Distinguish population variance, which divides by N, from sample variance, which commonly divides by n−1 when estimating population variability from a sample.

Two branches may have the same average delivery time but very different reliability. Branch A might consistently deliver in 20–25 minutes while Branch B ranges from 5 to 60 minutes. The average alone does not show the service inconsistency. Standard deviation is sensitive to extreme values; also inspect quartiles or a box plot when the distribution is skewed. Interpret dispersion in the original business units, not as a standalone percentage unless appropriately defined.

## Guided walkthrough in the tool
1. Calculate mean and range for a small list of delivery times.
2. Subtract the mean from each observation and square the deviations.
3. Sum squared deviations and divide by n−1 for a sample variance; take the square root.
4. Compare two groups with similar means but different spreads and explain the operational impact.

### Additional hands-on instruction
Compute sample variance and standard deviation with and without the extreme observation.

## Business case
Branch A has delivery times 20, 21, 22 and 23 minutes, while B has 5, 19, 24 and 38. Both have a mean around 21.5, yet B is less consistent. Comparing standard deviations or ranges reveals the reliability difference. Calculate from the observations rather than concluding both services perform equally based on average alone.

## Independent practical challenge
Calculate the range of 12, 15, 21, 32.

**Deliverable:** Describe the units and why reporting only the average would hide instability.

## Verify your work
Confirm whether you are describing a complete population or estimating from a sample before choosing the variance denominator. Verify squared deviations are nonnegative.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
32 - 12 = 20.

**Common pitfall:** Confusing population standard deviation with sample standard deviation.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
