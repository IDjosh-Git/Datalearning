"""Build the static v33 mastery curriculum and local demonstration dataset.
Run from repository root: python tools/build_mastery_v33.py
Static generation means lessons are indexed, readable without JS, and print-friendly.
"""
import sys,csv,sqlite3,html,json,re
from pathlib import Path
from bs4 import BeautifulSoup
sys.path.insert(0,str(Path(__file__).resolve().parent.parent))
from curriculum.mastery_content import TRACKS, TRACK_NAMES
ROOT=Path(__file__).resolve().parent.parent
D=ROOT/'downloads'
D.mkdir(exist_ok=True)
columns=['order_id','order_date','customer_id','customer','region','product_id','product','quantity','unit_price','unit_cost','status','channel']
rows=[
 [1001,'2026-01-05','C001','Amina','East','P01','Laptop',2,150000,120000,'Completed','Web'],
 [1002,'2026-01-08','C002','Kola','West','P02','Mouse',5,8000,5000,'Completed','Store'],
 [1003,'2026-02-02','C001','Amina','East','P02','Mouse',3,8000,5000,'Returned','Web'],
 [1004,'2026-02-09','C003','Ngozi','North','P03','Keyboard',4,18000,12000,'Completed','Store'],
 [1005,'2026-02-11','C004','Idris','West','P01','Laptop',1,150000,120000,'Completed','Web'],
 [1006,'2026-02-18','C003','Ngozi','East','P02','Mouse',2,8000,5000,'Completed','Web'],
]
with (D/'mastery_orders.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.writer(f);w.writerow(columns);w.writerows(rows)
conn=sqlite3.connect(D/'mastery_orders.sqlite')
conn.executescript('''DROP TABLE IF EXISTS orders; DROP TABLE IF EXISTS customers;
CREATE TABLE customers(customer_id TEXT PRIMARY KEY,customer TEXT NOT NULL,segment TEXT NOT NULL);
CREATE TABLE orders(order_id INTEGER PRIMARY KEY,order_date TEXT NOT NULL,customer_id TEXT NOT NULL,
 customer TEXT NOT NULL,region TEXT NOT NULL,product_id TEXT NOT NULL,product TEXT NOT NULL,
 quantity INTEGER NOT NULL,unit_price INTEGER NOT NULL,unit_cost INTEGER NOT NULL,
 status TEXT NOT NULL,channel TEXT NOT NULL,FOREIGN KEY(customer_id) REFERENCES customers(customer_id));''')
conn.executemany('INSERT INTO customers VALUES(?,?,?)',[('C001','Amina','Consumer'),('C002','Kola','Business'),('C003','Ngozi','Business'),('C004','Idris','Consumer')]);conn.executemany('INSERT INTO orders VALUES('+','.join('?'*12)+')',rows)
assert conn.execute("SELECT SUM(quantity*unit_price),SUM(quantity*(unit_price-unit_cost)) FROM orders WHERE status='Completed'").fetchone()==(578000,135000)
conn.commit();conn.close()
(D/'MASTERY_DATA_DICTIONARY.md').write_text('''# Mastery course dataset — fictional training data

`mastery_orders.csv` contains 6 intentionally synthetic retail orders. All five course tracks use this exact demonstration dataset. It is **not** the larger Practice Arena SQL dataset: the Arena has a separate schema and exercise engine.

- **Grain:** 1 row = 1 order (simplified: one product per order).
- **Keys:** `order_id` is unique; `customer_id` identifies a customer; `product_id` identifies a product.
- **Columns:** `order_id` INTEGER, `order_date` ISO date, `customer_id` TEXT, `customer` TEXT, `region` TEXT, `product_id` TEXT, `product` TEXT, `quantity` INTEGER, `unit_price` INTEGER, `unit_cost` INTEGER, `status` TEXT, `channel` TEXT.
- **SQL database:** `mastery_orders.sqlite` contains `orders` and `customers` tables. The `customers` table adds `segment`.
- **Metrics:** `Revenue = quantity × unit_price`, `Profit = quantity × (unit_price − unit_cost)`, filtered where `status = 'Completed'`. All example amounts are *hypothetical training currency units*; no tax/discount modelling is implied.
- **Control totals:** 6 source rows, 5 completed, 1 returned, completed revenue = 578000, completed profit = 135000. January = 340000, February = 238000. Region East = 316000, West = 190000, North = 72000.
- **Tools:** SQLite examples target SQLite 3.25+ for window functions; Python examples require pandas and optionally numpy; Excel examples show Excel 2016-compatible alternatives where applicable; Power BI uses DAX and Power Query M examples requiring a model imported from this sample.
- **Important:** This file is illustrative for practice and not a production business dataset or statistically representative sample.
''',encoding='utf-8')

def esc(x):return html.escape(str(x),quote=True)
def mastery_html(lesson, index, track):
    code_class='is-table' if lesson['kind']=='table' else 'is-code'
    lines=''.join('<li>'+esc(piece.strip())+'</li>' for piece in re.split(r';\s*',lesson['recap']) if piece.strip())
    checks=''.join(f'''<details class="mastery-check"><summary>Challenge {j}: {esc(check['question'])}</summary><div class="mastery-check-answer"><strong>Worked solution</strong><p>{esc(check['solution'])}</p></div></details>''' for j,check in enumerate(lesson['checks'],1))
    return f'''<div class="course-mastery" data-mastered-course="{esc(track)}" data-lesson="{index}" aria-label="Mastery lesson {index}">
    <div class="mastery-eyebrow">MASTERCLASS / MODULE {index:02d} · {esc(TRACK_NAMES[track])}</div>
    <h4 class="mastery-title">{esc(lesson['title'])}</h4>
    <p class="mastery-objective"><strong>By the end, you can:</strong> {esc(lesson['objective'])}</p>
    <div class="mastery-body">
      <section class="mastery-section"><h5>01 · The business reason — why this matters</h5><p>{esc(lesson['why'])}</p></section>
      <section class="mastery-section"><h5>02 · How it actually works</h5><p>{esc(lesson['how'])}</p></section>
      <section class="mastery-section"><h5>03 · Worked example</h5><pre class="mastery-code {code_class}" tabindex="0"><code>{esc(lesson['example'])}</code></pre>
        <div class="mastery-output"><h6>Expected result / verification</h6><pre tabindex="0">{esc(lesson['result'])}</pre></div></section>
      <div class="mastery-callout mastery-tip"><strong>💡 Industry pro tip</strong><p>{esc(lesson['tip'])}</p></div>
      <div class="mastery-callout mastery-trap"><strong>⚠️ Common beginner trap</strong><p>{esc(lesson['trap'])}</p></div>
      <section class="mastery-section"><h5>04 · 🚀 Hands-on knowledge check</h5><p class="mastery-helper">Try each question before opening the worked solution.</p>{checks}</section>
      <section class="mastery-summary"><h5>📌 Key takeaways / cheat sheet</h5><ul>{lines}</ul></section>
    </div></div>'''

def dataset_box(track):
    return f'''<section class="mastery-data-guide" id="mastery-data-{track}" aria-label="Course exercise data">
    <div><span class="mastery-eyebrow">REAL-WORLD WORKFLOW · PRACTICE RESOURCES</span><h3>One dataset, five analytical perspectives</h3><p>Lessons use a clearly labelled fictional six-order retail dataset. Compare SQL, Excel, DAX, Python and AI outputs against the same independent checks. The SQL Practice Arena uses its own separate challenge database.</p></div>
    <div class="mastery-data-links"><a href="../downloads/mastery_orders.csv" download>Download retail CSV</a><a href="../downloads/mastery_orders.sqlite" download>Download SQLite database</a><a href="../downloads/MASTERY_DATA_DICTIONARY.md" target="_blank" rel="noopener">Schema &amp; expected totals</a></div>
    <div class="mastery-controls"><span><b>6</b> orders</span><span><b>5</b> completed</span><span><b>578,000</b> completed revenue</span><span><b>135,000</b> completed profit</span></div></section>'''

def html_block(soup,text):
    frag=BeautifulSoup(text,'html.parser')
    return frag

# Replace verbose existing course sessions with intentional self-contained lessons.
for track in ['sql','excel','powerbi','ai']:
    f=ROOT/'courses'/f'{track}.html';soup=BeautifulSoup(f.read_text(encoding='utf-8'),'html.parser')
    for i,lesson in enumerate(TRACKS[track],1):
        wk=soup.select_one(f'#week{i}'); assert wk,f'{track} week {i} not found'
        host=wk.select_one('.expanded-lessons') if track=='ai' else wk.select_one('.session-guide')
        assert host,f'{track} week {i} lesson host not found'
        host.clear();host.append(html_block(soup,mastery_html(lesson,i,track)))
    if track=='ai':
        anchor=soup.select_one('#week1')
    else: anchor=soup.select_one('#week1')
    assert anchor
    anchor.insert_before(html_block(soup,dataset_box(track)))
    stylesheet=soup.new_tag('link',rel='stylesheet',href='../assets/mastery-accessibility-v33.css?v=33')
    soup.head.append(stylesheet)
    f.write_text(str(soup),encoding='utf-8')

# Python track uses existing course shell and completion logic, but its own lessons.
f=ROOT/'courses'/'sql.html'
soup=BeautifulSoup(f.read_text(encoding='utf-8'),'html.parser')
soup.title.string='Python for Data Analytics | 10-Module Mastery Course'
soup.body['data-course']='python';soup.body['data-responsive-page']='courses/python'
soup.select_one('.brand-company-name span').string='Python for Data Analytics'
# Change the sidebar unit navigation in the same visual system.
sidebar=soup.select_one('#sidebar'); course_nav=sidebar.select('.nav-link[href^="#week"]')
for i,a in enumerate(course_nav,1):
    a.clear();n=soup.new_tag('span');n['class']='nav-num';n.string=str(i);a.append(n);a.append(' '+TRACKS['python'][i-1]['title'])
# Update shell topbar and leave menu/theme controller intact.
for node in soup.select('.topbar-title strong, .topbar-title small'):
    node.string='Python for Data Analytics' if node.name=='strong' else 'Ten-module applied Python pathway'
content=soup.select_one('.content');assert content
content.clear()
hero=html_block(soup,'''<section class="hero searchable" id="overview"><span class="eyebrow">PYTHON · 10 MODULES · BEGINNER TO JOB-READY</span><h2>Python for Data Analytics</h2><p>From Python fundamentals and pandas through statistics, NumPy, forecasting discipline and an auditable portfolio project.</p><div class="stats"><div class="stat"><strong>10</strong><span>Mastery modules</span></div><div class="stat"><strong>20</strong><span>Solved knowledge checks</span></div><div class="stat"><strong>1</strong><span>Shared retail dataset</span></div><div class="stat"><strong>1</strong><span>End-to-end capstone</span></div></div></section>''')
content.append(hero)
content.append(html_block(soup,dataset_box('python')))
for i,lesson in enumerate(TRACKS['python'],1):
    unit_html=f'''<section class="week searchable" id="week{i}"><div class="week-header"><div class="week-num">{i}</div><div class="week-title"><h3>{esc(lesson['title'])}</h3><p>{esc(lesson['objective'])}</p></div><span class="badge">Python mastery</span></div><div class="week-body">{mastery_html(lesson,i,'python')}<div class="mastery-completion"><label class="complete-label"><input class="completeBox" data-week="{i}" type="checkbox"/> Mark module {i} complete after attempting both knowledge checks</label></div></div></section>'''
    content.append(html_block(soup,unit_html))
content.append(html_block(soup,'''<section class="capstone searchable" id="certificate"><h3>Python learning milestone</h3><p>Complete all ten lessons, reproduce the dataset control totals, and submit your independently tested source code and README to your instructor. The built-in Practice Arena currently executes SQL and Excel only; Python snippets run in your local Python environment or an approved notebook.</p><a class="btn primary" href="../downloads/mastery_orders.csv" download>Download practice CSV</a></section>'''))
# Do not expose SQL-specific visuals/quizzes or claim unimplemented Python certificate issuance.
for sc in soup.find_all('script'):
    if sc.string and 'window.ZAH_COURSE_SLUG=' in sc.string:
        sc.string="window.ZAH_COURSE_SLUG='python';window.ZAH_COURSE_TITLE='Python for Data Analytics';window.ZAH_PROGRESS_KEY='pythonRoadmapProgress';"
# Generic SQL quiz script remains harmless with no .quiz elements; all needed IDs retained.
footer_theme=html_block(soup,'<link rel="stylesheet" href="../assets/mastery-accessibility-v33.css?v=33"/>');soup.head.append(footer_theme)
# Avoid stale course-only SQL-specific script content by keeping the shared generic files.
(ROOT/'courses'/'python.html').write_text(str(soup),encoding='utf-8')

# Markdown source for offline lessons, content review and translation.
lines=['# Data Analysis Learning Path — Mastery Curriculum (Version 33)','',
 '## Learning design standard','',
 'Every module follows: **Business why → mechanism → worked example → expected output → professional tip → common trap → 2 hands-on knowledge checks with worked solutions → key takeaways**.','',
 'All examples refer to the fictional six-order retail training dataset described in `downloads/MASTERY_DATA_DICTIONARY.md` unless labelled otherwise. This is an editorial learning resource, not a claim of externally accredited courses.','']
for track,lessons in TRACKS.items():
    lines += [f'\n# {TRACK_NAMES[track]} — 10 modules\n']
    for i,m in enumerate(lessons,1):
        lines.extend([f'## Module {i:02d}: {m["title"]}','',f'**Learning outcome:** {m["objective"]}','','### Why it matters',m['why'],'','### How it works',m['how'],'','### Worked example','',f'```{"sql" if track=="sql" else "python" if track=="python" else "text"}\n{m["example"]}\n```','', '**Expected output / verification**','',f'```text\n{m["result"]}\n```','',f'**💡 Pro tip:** {m["tip"]}','',f'**⚠️ Common trap:** {m["trap"]}','','### 🚀 Knowledge checks'])
        for j,check in enumerate(m['checks'],1):lines += [f'{j}. {check["question"]}',f'   - **Worked solution:** {check["solution"]}']
        lines += ['','**📌 Key takeaways:** '+m['recap'],'']
(ROOT/'curriculum'/'MASTER_CURRICULUM_V33.md').write_text('\n'.join(lines),encoding='utf-8')
(ROOT/'curriculum'/'mastery_content.json').write_text(json.dumps(TRACKS,indent=2,ensure_ascii=False),encoding='utf-8')
print('Generated 50 static lessons across five tracks; dataset and markdown rendered.')
