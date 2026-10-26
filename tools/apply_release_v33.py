"""Finalize v33 frontend links and Python track navigation after building curricula."""
from pathlib import Path
from bs4 import BeautifulSoup
import re
root=Path(__file__).resolve().parent.parent
practice=root/'practice.html'
s=BeautifulSoup(practice.read_text(),'html.parser')
# Token css must be after previous Arena 32 style rules.
for href in ['assets/mastery-accessibility-v33.css?v=33','assets/theme-editor-v33.css?v=33']:
    n=s.new_tag('link',rel='stylesheet',href=href);s.head.append(n)
s.body.append(s.new_tag('script',src='assets/theme-editor-v33.js?v=33',defer=True))
practice.write_text(str(s),encoding='utf-8')
# Catalog course card and footer link.
f=root/'index.html';s=BeautifulSoup(f.read_text(),'html.parser')
course=s.select_one('.lp-course[data-track="powerbi"]') or s.select_one('.lp-course[data-track="ai"]')
assert course
python_html='''<article class="lp-course" data-level="intermediate" data-search="python pandas numpy data cleaning automation statistics data analysis portfolio notebooks" data-track="python"><div class="lp-course-top"><img alt="Python icon" class="lp-icon" src="assets/icon-python.svg"/><span class="lp-course-tag">PYTHON · 10 MODULES</span></div><h3>Python for Data Analytics</h3><p>Learn Python, pandas, NumPy, data quality, statistics and reproducible business reporting.</p><ul><li>DataFrames, filters and joins</li><li>Statistics, matrix intuition and forecasts</li><li>Audited Python portfolio capstone</li></ul><div class="lp-course-footer"><div class="lp-progress-meta"><span>Course progress</span><b id="python-progress-text">0%</b></div><div class="lp-progress-line"><div id="python-progress" style="width:0%"></div></div><a class="lp-course-cta" href="courses/python.html">Explore Python <span aria-hidden="true">↗</span></a><a class="lp-studio-cta" href="courses/python.html#week1">See practice lessons ↗</a></div></article>'''
course.insert_after(BeautifulSoup(python_html,'html.parser'))
footer=s.select_one('footer .footer-grid');
if footer:
  link=footer.find('a',href='courses/powerbi.html')
  if link:link.insert_after(BeautifulSoup('<a href="courses/python.html">Python</a>','html.parser'))
f.write_text(str(s),encoding='utf-8')
# Other common navigation uses dynamic JS.
p=root/'assets'/'modern.js';txt=p.read_text();txt=txt.replace("['excel','sql','powerbi','ai'].map(","['excel','sql','powerbi','python','ai'].map(")
txt=txt.replace("s==='ai'?'AI Integration':'Power BI'","s==='ai'?'AI Integration':s==='python'?'Python':'Power BI'")
p.write_text(txt)
# Progress is only claimable in cloud after Python migration applied.
p=root/'assets'/'progress-cloud.js';txt=p.read_text();needle="    ai:           { key:'aiRoadmapProgress', title:'AI Integration in Data Analysis', units:10, unitLabel:'weeks' }"
assert needle in txt
txt=txt.replace(needle,"    python:       { key:'pythonRoadmapProgress', title:'Python for Data Analytics', units:10, unitLabel:'weeks' },\n"+needle)
p.write_text(txt)
p=root/'assets'/'auth-gate.js';txt=p.read_text().replace("'introduction','excel','sql','powerbi','ai'","'introduction','excel','sql','powerbi','python','ai'")
p.write_text(txt)
# Python icon: in-project vector only, used as normal course navigation image.
p=root/'assets'/'icon-python.svg'
p.write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="t"><title id="t">Python programming</title><rect width="64" height="64" rx="14" fill="#203b64"/><path d="M30 10h10q7 0 7 7v13H26q-7 0-7 7v3H9V31q0-9 9-9h17v-4H25v-3q0-5 5-5Z" fill="#a5d7fc"/><path d="M34 54H24q-7 0-7-7V34h21q7 0 7-7v-3h10v9q0 9-9 9H29v4h10v3q0 5-5 5Z" fill="#ffd166"/><circle cx="38" cy="17" r="2" fill="#172b47"/><circle cx="26" cy="47" r="2" fill="#172b47"/></svg>''')
# Learner landing summary: keep local Python progress visible without changing other courses.
p=root/'assets'/'learner-home.js';txt=p.read_text();needle="['powerbi','Power BI"
if needle in txt and "['python','Python" not in txt:
  ix=txt.find(needle)
  txt=txt[:ix]+"['python','Python','pandas, statistics and reporting','pythonRoadmapProgress',10],"+txt[ix:]
  p.write_text(txt)
# Cosmetic: make body page title and topbar consistent.
s=BeautifulSoup((root/'courses/python.html').read_text(),'html.parser')
for n in s.select('meta[name="description"]'):n['content']='An applied ten-module Python analytics course with pandas, SQL-reconciled examples, statistics and capstone practice.'
for tag in s.select('a[href="../capstone.html?course=sql"]'): tag['href']='../capstone.html?course=python'
# no capstone link until certificate integration; existing global sidebars may link to capstone anyway.
(root/'courses/python.html').write_text(str(s),encoding='utf-8')
print('Linked curriculum, theme resources, Python catalog and navigation.')
