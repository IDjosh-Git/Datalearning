# Statistics · Week 04 · Frequency tables and distributions

> DataLearning practice brief — synthetic training material. Keep your original source file unchanged and make a copy for transformations.

## Learning outcome
Recognise common shapes and outliers

## Before you begin: open the right file
- Download: `learning_statistics_sample.csv` in `/downloads/` of your DataLearning project.
- Important fields / tables: observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag.
- Related video (opens within the lesson page): https://www.youtube.com/watch?v=SzZ6GpcfoQY.
- Use Excel / Power BI / Tableau / Power Query for CSV sources, a SQLite-compatible reader for `.sqlite` files, or Python/pandas for code-based analysis as the week requires.

## Understand the analytical method
A frequency table counts observations within categories or numeric intervals. A histogram groups continuous observations into bins, while a bar chart compares distinct categories. Distribution shape helps explain central tendency: symmetric, right-skewed, left-skewed or multimodal patterns tell different stories. Outliers are values that stand away from the bulk of the data and should be investigated rather than automatically deleted.

Bin width can alter how a histogram appears. Too-wide bins hide meaningful groups; too-narrow bins exaggerate random noise. A box plot summarises median, quartiles and potential outliers using a convention such as 1.5 times the interquartile range. It flags points for review, not automatic errors. Always state the measurement unit and sample size, and compare distributions within relevant groups when an overall pattern may hide differences.

## Guided walkthrough in the tool
1. Group order values into justified intervals and count values in each bin.
2. Make a histogram and describe the number of peaks and direction of skew.
3. Find the median, lower quartile and upper quartile; calculate IQR.
4. Flag possible extreme values and inspect whether they are genuine business events.

### Additional hands-on instruction
Create a delivery-time frequency table with clear bin boundaries and inspect skew and outliers.

## Business case
An order-value histogram looks very different when bins are 1,000 wide instead of 10,000 wide. One view reveals clusters; another hides them. Document the bin choice, inspect possible outliers, and calculate quartiles. Do not interpret every isolated bar as a separate customer segment until you understand the sample size and grouping.

## Independent practical challenge
For spend 10, 15, 70, 90, 120, how many customers fall in 50–99?

**Deliverable:** Compare the histogram to a bar chart of regions and explain the variable-type distinction.

## Verify your work
If changing the bin width reverses the story, describe that sensitivity. The number of observations in the frequency table must reconcile to the dataset count.

- Confirm the number of records used and explain any excluded records.
- Check date, currency, percentage and unit formats.
- Recalculate at least one sample manually or using another method.
- Separate observed results from assumptions about why they occurred.
- Include source, period, filters and limitations in the presentation.

## Compare with the suggested solution (after attempting the task)
Two: 70 and 90.

**Common pitfall:** Using arbitrary bins to overstate a pattern.

---
The lesson content and model answers are intended for study. Completing the worksheet does not automatically mark the app quiz or progress as complete.
