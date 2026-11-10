# Statistics · Week 02 · Mean, median and mode

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Choose a useful measure of central tendency

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=SzZ6GpcfoQY.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
The mean is the sum of observed values divided by how many values there are. The median is the middle value after sorting; for an even number of observations it is the average of the two middle values. The mode is the most frequent value and is often useful for categories. With data 2, 3, 3, 4, 20, mean is 6.4, median is 3 and mode is 3—three different views of the same distribution.

Choosing a “typical” value depends on the question and distribution. Mean uses every value and is sensitive to extreme observations. Median is more resistant to outliers and can describe skewed order values or salaries more meaningfully. Mode can identify a common shoe size or product category but may have several equally common values. Always pair a central tendency measure with sample size and a description of spread.

## Guided walkthrough in the tool
1. Sort the values 2, 3, 3, 4, 20 and calculate the mean.
2. Identify the middle value and the most frequent value.
3. Replace 20 with 200 and compare which statistic moves most.
4. Write a recommendation for which statistic to report as the typical order value and why.

### Additional hands-on instruction
Compute mean and median delivery_minutes. Investigate the extreme 220-minute row.

## Business case
Delivery times are 12, 13, 14, 15 and 90 minutes. Mean is 28.8 but median is 14, so the outlier makes the mean poor as a “typical” delivery-time description. Investigate whether 90 was a real delay or an entry error. Both the average and median can be useful, but they answer slightly different business questions.

## Independent practical challenge
Find the median for 10, 12, 13, 14, 100.

**Deliverable:** State which summary better describes a typical delivery and why.

## Verify your work
Check the arithmetic by calculating the total and observation count separately. A median of an unsorted list is unreliable; sort first and handle the even-count case correctly.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
13.

**Common pitfall:** Reporting only a mean when values are heavily skewed.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
