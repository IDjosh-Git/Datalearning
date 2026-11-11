# Python and pandas · Week 07 · Exploratory data analysis and charts

> DataLearning comprehensive practical lesson. Data is fictional. This worksheet supports the full in-app explanation and independent practice. Do not overwrite your raw source file.

## Learning outcome
Use descriptive statistics and matplotlib visuals to expose patterns without implying causation.

## Where to begin in the tool
In Jupyter run describe() and plot time trends and category comparisons with clear axes.


## Source data dictionary · exact practice file fields
The linked CSV uses these **exact header names**. Import the file before attempting examples. If an exercise uses a friendly or calculated name, map or create it first.

`observation_id, delivery_minutes, basket_value_ngn, satisfaction_score, region, complaint_flag`

The worked example may introduce derived fields or example tables. Create or rename those fields explicitly and verify results against these original source columns.

## Dataset and companion video
- **Download the dataset:** [`learning_statistics_sample.csv`](../learning_statistics_sample.csv)
- **Video companion:** https://www.youtube.com/watch?v=GPVsHOlRBBI&t=28456s (the in-app Watch button opens the YouTube player when embedding is permitted).
- **Reading order:** first identify controls, then read the four concepts, reproduce the example, try an independent case, and validate your evidence.

## Explain the four essential concepts
### 1. EDA
explore range, central tendency and missingness before selecting a chart

### 2. Time series
aggregate by actual period in chronological order

### 3. Category comparison
choose horizontal bars for longer names

### 4. Responsible interpretation
describe what the chart shows and alternative explanations.

## Why this skill matters
Why this skill matters: A product owner needs a first look at sales variation before deciding which region to investigate. The method is not only about producing an attractive figure. Category comparison: choose horizontal bars for longer names Responsible interpretation: describe what the chart shows and alternative explanations. When preparing an output for another person, specify the reporting period, units, selection rules and known limitations. An analyst should be able to explain why a calculation or chart answers the actual business question and reproduce the result.

## Guided practice · follow all four steps
1. Open the correct workspace and identify the controls before entering commands. In Jupyter run describe() and plot time trends and category comparisons with clear axes. Keep an untouched source or backup version so a mistake is reversible.
2. Apply the first two concepts on a small example: EDA — explore range, central tendency and missingness before selecting a chart Then test time series with at least two contrasting inputs.
3. Reproduce the worked example below exactly, then change one input or filter. Explain which value changes and why. After that, apply category comparison and inspect the output for errors.
4. Complete the independent challenge: Create revenue distribution and monthly trend charts and write two observations backed by numbers. Before moving on, check the result against the acceptance criteria: The plotted monthly sums should reconcile with the filtered dataframe; axis labels and units are explicit.

## Study this worked example
```text
import pandas as pd
import matplotlib.pyplot as plt
df=pd.read_csv('learning_statistics_sample.csv')
print(df[['basket_value_ngn','delivery_minutes']].describe())
df['basket_value_ngn'].plot(kind='hist',bins=10,title='Basket value distribution')
plt.xlabel('Basket value (₦)')
plt.show()
```

**How to interpret the output:** Exploratory data analysis and charts begins with a practical objective: Use descriptive statistics and matplotlib visuals to expose patterns without implying causation. In Python and pandas, begin by understanding the workspace and the data rather than memorising a command. EDA: explore range, central tendency and missingness before selecting a chart Time series: aggregate by actual period in chronological order Practice these ideas on a small synthetic sample first. Notice where the tool shows inputs, intermediate results and errors; then describe in plain language what each operation does and what it does not prove. Keep original records separate from working calculations so you can trace any surprising result back to its source.

## Business case study
Business case: A product owner needs a first look at sales variation before deciding which region to investigate. Your role is to deliver a result that a manager can trust and act upon, not merely a screenshot. First describe what records are included and excluded. Next perform the method described in this week, and record any changes to the source. Use the worked example as a starting point but test it with different values; finally communicate one relevant observation, one limitation and a follow-up.

## Independent practical challenge
Create revenue distribution and monthly trend charts and write two observations backed by numbers.

**What you should hand in:** The plotted monthly sums should reconcile with the filtered dataframe; axis labels and units are explicit.

## Check your result (after attempting)
Expected evidence: The plotted monthly sums should reconcile with the filtered dataframe; axis labels and units are explicit. To validate it, compare a small hand-checked sample with the final output, test an alternative filter or a changed input, and record any unmatched, missing or suspicious data. If results differ, review the original data, formula or query, aggregation grain and selected filters before sharing the report. Avoid this common error: Using a plot that includes cancelled transactions while claiming it shows paid revenue.

**Common failure:** Using a plot that includes cancelled transactions while claiming it shows paid revenue.

## Reflect and explain the result
- Which menu, editor or pane did you use, and why?
- What is the data grain, metric definition or calculated rule?
- Can a second learner reproduce your output using the dataset and your instructions?
- Which number, chart or limitation must be mentioned when presenting your result?

---
**Progress note:** Completing this worksheet is practice. Marking a week complete, passing an assessment and submitting an instructor-reviewed capstone are separate actions in DataLearning.
