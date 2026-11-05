"""Build v34 from an extracted v33 website (one-time upgrade).
Adds author-edited, week-specific beginner explanations and actual Python week practice.
Does not replace challenge engines or course progress logic.
"""
from pathlib import Path
from html import escape
from datetime import date
import json,re
from expand_lessons_v34 import LESSONS,validate
validate()
root=Path(__file__).parent.parent
content=json.loads((root/'curriculum/mastery_content.json').read_text())

PYTHON_QUIZZES=[
 [('What does DataFrame.shape describe?','Number of rows and columns','Names of the Python packages','Last three lines of the CSV'),('Which action helps diagnose FileNotFoundError?','Inspect the working directory and path','Divide prices by quantities','Change all column names'),('What should happen before calculating sales KPIs?','Check data types and business grain','Delete any unusual order','Start with chart colours')],
 [('What data type should quantity usually use?','Integer number','Arbitrary string','A file path'),('What does if status == "Completed" do?','Checks whether an order qualifies','Changes the original CSV','Counts all orders automatically'),('How should exact currency calculations be handled when decimals matter?','Use Decimal or a defined smallest currency unit','Always round after each addition randomly','Convert all amounts to text')],
 [('What does return do in a Python function?','Supplies a result back to the caller','Always prints to the screen','Changes the function name'),('What is the benefit of a single reusable revenue function?','It applies one consistent business rule','It makes tests unnecessary','It changes all sales to profit'),('What test should profit(2,150000,120000) pass?','Return 60000','Return 300000','Return 240000')],
 [('What does df[df["status"] == "Completed"] do?','Keeps only Completed rows','Deletes matching source CSV lines','Changes status labels'),('Why use .copy() before adding calculated columns to a filtered DataFrame?','To make assignment intent unambiguous','To remove return orders from disk','To get all 12 columns as strings'),('What is the correct training revenue after filtering Completed?','578000','602000','24000')],
 [('Which check identifies repeated order keys?','duplicated on order_id','Count only missing prices','Sort by region'),('When may a pandas merge accidentally multiply rows?','When matching keys are duplicated on the lookup side','Whenever dates are parsed','When using print'),('What is the safest response to unexpected missing prices?','Report and investigate under an explicit rule','Fill everything with zero without checking','Drop all data without logging')],
 [('What does groupby("region") produce?','Groups that can be aggregated by region','One giant string of all region names','A new file automatically'),('Which calculation produces gross order revenue?','quantity × unit_price','quantity ÷ unit_price','unit_price − product_id'),('What is the expected East Completed total?','316000','340000','190000')],
 [('What is the mean completed revenue per order in the sample?','115600','578000','135000'),('Why compare mean and median?','Outliers may pull the mean away from the typical middle value','They always give the same result','Median only works with strings'),('Can five invented order values prove a causal trend?','No, they are too limited','Yes, because Python ran','Yes, because the total matches')],
 [('What does NumPy elementwise multiplication do?','Multiplies matching positions in arrays','Changes all elements into a string','Joins two CSV files'),('What is the result of 2 × 150000 in an array calculation?','300000','150002','75000'),('Why inspect an array shape?','Dimensions determine whether operations are compatible','Shape only changes chart color','Shape indicates file encoding only')],
 [('Why convert order_date to a date-like type?','So grouping and sorting follow calendar order','To make sales double automatically','To remove all January orders'),('Which month has 340000 completed revenue in the sample?','January 2026','February 2026','March 2026'),('Why is a forecasting claim risky with only two invented monthly totals?','It cannot establish reliable seasonality or test performance','Every model performs perfectly','Python always predicts zero')],
 [('What makes a Python report reproducible?','Versioned inputs, code, dependencies and tests','A screenshot without data','Running random notebook cells'),('What completed revenue must the pipeline reconcile to?','578000','135000','602000'),('What should duplicate order IDs trigger?','A validation failure or investigation','Automatic publication','A colour change')],
]

def teaching_block(course, ix, fields):
 mental,actions,meaning,mission=fields
 return f'''<section class="mastery-deep-dive" aria-label="Beginner explanation and walkthrough for week {ix}">
  <h5>Learn it step by step — simple explanation</h5>
  <p class="v34-mental-model"><strong>Picture it this way:</strong> {escape(mental)}</p>
  <h6>Follow the logic in three small steps</h6>
  <ol class="v34-action-steps">{''.join('<li>'+escape(x)+'</li>' for x in actions.split('|'))}</ol>
  <div class="v34-interpretation"><strong>Read the expected result:</strong> {escape(meaning)}</div>
  <div class="v34-independence"><strong>Now try it without copying:</strong> {escape(mission)}</div>
 </section>'''

def quiz_markup(week):
 rows=PYTHON_QUIZZES[week-1]
 r=[f'<div class="quiz v34-python-quiz" aria-label="Week {week} quiz"><h4>Week {week} knowledge check — 3 questions</h4><p>Choose one answer per question, then check your score. Revisit the explanation if needed.</p>']
 for j,(q,right,w1,w2) in enumerate(rows,1):
  # rotate answer placement so not every first choice is correct
  choices=[right,w1,w2]; idx=(week+j)%3
  choices[0],choices[idx]=choices[idx],choices[0]
  key='abc'[idx]
  r.append(f'<div class="question" data-answer="{key}"><p>{j}. {escape(q)}</p>')
  for k,answer in zip('abc',choices):
   r.append(f'<label class="option"><input type="radio" name="p{week}q{j}" value="{k}"/> {escape(answer)}</label>')
  r.append(f'<div class="answer-note">Correct answer: {escape(right)}.</div></div>')
 r.append('<div class="quiz-actions"><button type="button" class="btn primary gradeBtn">Check Score</button><button type="button" class="btn revealBtn">Show Answers</button><span class="score" role="status" aria-live="polite"></span></div></div>')
 return ''.join(r)

def lab_markup(week,entry,fields):
 actions=fields[1].split('|'); mission=fields[3]
 return f'''<div class="guided-lab v34-guided-lab" aria-label="Week {week} guided practice">
  <div class="lab-kicker">✦ Guided practice · Python Week {week}</div>
  <h4>Work through the example yourself</h4>
  <p class="lab-goal">{escape(entry['objective'])} Run the sample code in your own Python notebook or script.</p>
  <ol>{''.join('<li>'+escape(a)+'</li>' for a in actions)}</ol>
  <div class="lab-task"><b>Independent task</b><p>{escape(mission)}</p></div>
  <div class="lab-task"><b>What success looks like</b><p>{escape(fields[2])}</p></div>
  <p>Need the sample file? <a href="../downloads/mastery_orders.csv" download>Download the retail orders CSV</a> · <a href="../downloads/PYTHON_GETTING_STARTED.md" download>Python setup instructions</a>.</p>
  </div>'''

for course, rows in LESSONS.items():
 path=root/f'courses/{course}.html'; s=path.read_text()
 tag='<section class="mastery-section"><h5>03 · Worked example</h5>'
 assert s.count(tag)==10,(course,s.count(tag))
 blocks=iter([teaching_block(course,i,fields) for i,fields in enumerate(rows,1)])
 s=s.replace(tag,lambda_placeholder:='__V34_RESERVED__') if False else s
 s=re.sub(re.escape(tag), lambda m: next(blocks)+'\n'+tag, s)
 # ensure all modules have dedicated beginner guidance; preserve existing solutions and code intact
 if course=='python':
  anchors=list(re.finditer(r'<section class="week searchable" id="week(?:10|[1-9])">',s))
  assert len(anchors)==10,len(anchors)
  for i in reversed(range(10)):
   start=anchors[i].start(); end=anchors[i+1].start() if i<9 else s.find('<section class="capstone',start)
   assert end>start
   block=s[start:end]; close=block.rfind('</section>')
   assert close>=0,(i,block[-100:])
   injection=lab_markup(i+1,content['python'][i],rows[i])+'\n'+quiz_markup(i+1)+'\n'
   s=s[:start]+block[:close]+injection+block[close:]+s[end:]
  s=s.replace('Ten-module applied Python pathway','10 weeks · one week at a time')
  s=s.replace('PYTHON · 10 MODULES · BEGINNER TO JOB-READY','PYTHON · 10 WEEKS · BEGINNER TO PRACTICAL PROJECTS')
  s=s.replace('<span>Mastery modules</span>','<span>Weekly modules</span>')
  s=s.replace('<span>Solved knowledge checks</span>','<span>Worked knowledge checks</span>')
 # register new style after existing v33 CSS for higher precedence
 needle='<link href="../assets/styles/mastery-accessibility-v33.css?v=33" rel="stylesheet"/>'
 assert needle in s,course
 s=s.replace(needle,needle+'<link href="../assets/styles/weekly-mastery-v34.css?v=34" rel="stylesheet"/>')
 path.write_text(s)
 print(course, 'new deep dives',s.count('class="mastery-deep-dive"'),'length',len(s))

# Write complete master course content in readable markdown, matching the UI text verbatim.
lines=['# Data Learning Path — Mastery v34 · Complete 50-week Teaching Curriculum','','This curriculum is reproduced in the live course HTML pages. Each course uses 10 separately navigable weeks, with worked examples against the **fictional** included retail orders CSV.','','> Learning workflow: **Understand the why → learn the mechanics → follow 3 steps → run an example → verify output → attempt challenges → review takeaways.**','','## The training dataset and controls','','| Control | Expected value |','|---|---:|','| Raw order records | 6 |','| Completed orders | 5 |','| Completed gross revenue | 578,000 |','| Completed gross profit | 135,000 |','| Completed East revenue | 316,000 |','| Completed West revenue | 190,000 |','| Completed North revenue | 72,000 |','','All currency figures are unitless illustrative local-currency amounts. No actual customer information is used.','']
for c,items in content.items():
 lines.append(f'## {dict(sql="SQL",excel="Excel",powerbi="Power BI",python="Python",ai="AI Data Analytics")[c]} — 10 weeks\n')
 for i,entry in enumerate(items,1):
  mental,actions,meaning,mission=LESSONS[c][i-1]
  lines += [f'### Week {i}: {entry["title"]}','',f'**Learning objective:** {entry["objective"]}','',f'**Why this matters:** {entry["why"]}','',f'**How it works:** {entry["how"]}','',f'**Think of it this way:** {mental}','','**Walkthrough:**']
  lines += [f'{k}. {a}' for k,a in enumerate(actions.split('|'),1)]
  lang={'sql':'sql','python':'python','powerbi':'text','excel':'text','ai':'text'}[c]
  lines += ['',f'**Worked example ({c}):**','',f'```{lang}',entry['example'],'```','','**Expected output or verification:**','','```text',entry['result'],'```','',f'**Interpretation:** {meaning}','',f'**💡 Pro tip:** {entry["tip"]}','',f'**⚠️ Beginner trap:** {entry["trap"]}','',f'**🚀 Independent exercise:** {mission}','','**Solved checks:**']
  for ix,(q,a) in enumerate(entry['checks'],1):lines += [f'{ix}. {q}  ','   **Solution:** '+a]
  lines += ['',f'**📌 Takeaways:** {entry["recap"]}','','---','']
(root/'curriculum/MASTER_CURRICULUM.md').write_text('\n'.join(lines))
(root/'MASTER_CURRICULUM.md').write_text('\n'.join(lines))
print('Curriculum words',len(' '.join(lines).split()))
