# Introduction · Week 05 · Descriptive statistics

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Interpret mean, median and outliers

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=SzZ6GpcfoQY.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
Descriptive statistics summarise a distribution, but one number rarely tells the full story. The mean is the arithmetic total divided by observation count. The median is the middle value after sorting. With salaries 20, 22, 23, 25 and 110 (in thousands), the mean is 40 while the median is 23 because the unusually high salary pulls the mean upward. The mode is the most frequent value. Compare location, spread and the shape of the distribution.

Outliers need investigation rather than automatic removal. A large order can be a genuine enterprise purchase, a decimal-place error or a duplicated invoice. Each possibility changes the business interpretation. Segmenting by region or customer type may reveal that an overall average hides important group differences. Present units, sample size and a sensible measure of variability so users can understand what “typical” really means.

## Guided walkthrough in the tool
1. Sort a small numeric column and calculate mean, median, minimum, maximum and range.
2. Flag values far from the main cluster; check the underlying record instead of deleting it automatically.
3. Compare average order value for each region and then for the full company.
4. Describe which measure is most representative and why, noting sample size and outliers.

### Additional hands-on instruction
Sort delivery_minutes and calculate mean, median, range and maximum. Compare the averages before and after investigating the outlier.

## Business case
A branch reports five orders valued 20, 22, 23, 25 and 110 thousand. A manager asking about the typical order is likely better served by the median of 23 thousand than the mean of 40 thousand. But for expected total revenue, the mean multiplied by order volume may still be useful. Choose based on the question.

## Independent practical challenge
Calculate the median of 10, 12, 13, 14, 100.

**Deliverable:** Recommend the statistic a service manager should use and justify it in ordinary language.

## Verify your work
Recalculate the mean with and without the high value as a sensitivity check. If the business question is “typical transaction”, the median may be more useful; explain the choice rather than hiding the mean.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
13

**Common pitfall:** Using averages without inspecting distribution.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
