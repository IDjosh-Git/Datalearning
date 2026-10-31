"""Independent curriculum/asset regression audit; no external API calls."""
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse,unquote,parse_qs
from collections import Counter
from tempfile import TemporaryDirectory
import csv,json,sqlite3,subprocess,sys,shutil,re,math
root=Path(__file__).resolve().parents[1];data=json.loads((root/'curriculum/mastery_content_v34.json').read_text())
tracks=['excel','sql','powerbi','python','ai'];course_count=0;quiz_count=0;broken=[]
for name in ['introduction']+tracks:
 p=root/'courses'/f'{name}.html';soup=BeautifulSoup(p.read_text(),'html.parser')
 assert len(soup.select('.cv88-map'))==1,name
 assert 'curriculum-v88.css' in p.read_text(),name
 if name=='introduction':
  assert len(soup.select('section.intro-lesson[data-lesson]'))==8
  assert len(soup.select('.cv88-intro-contract'))==8
 else:
  course_count+=len(soup.select('.cv88-lesson-contract'))
  assert len(soup.select('.cv88-lesson-contract'))==10,name
  assert len(soup.select('.cv88-roadmap li'))==10,name
  assert len(soup.select('.cv88-capstone-criteria'))==1,name
  qs=soup.select('.quiz .question');quiz_count+=len(qs)
  assert len(qs)==(30 if name=='python' else 50),name
  for j,q in enumerate(qs,1):
   opts={o.get('value'):o.parent.get_text(' ',strip=True).rstrip('. ').lower() for o in q.select('input[type=radio]')}
   correct=q.get('data-answer');assert correct in opts,(name,j,'invalid key')
   note=q.select_one('.answer-note')
   assert note,(name,j,'missing answer explanation')
   msg=note.get_text(' ',strip=True)
   if 'Correct answer:' in msg:
    expected=msg.split('Correct answer:')[-1].strip().rstrip('. ').lower()
    assert opts[correct]==expected,(name,j,expected,opts[correct])
  assert len(data[name])==10
 for a in soup.select('a[href]'):
  link=a.get('href','');parsed=urlparse(link)
  if parsed.scheme or parsed.netloc or link.startswith(('mailto:','tel:','javascript:')):continue
  if parsed.path:
   dest=(p.parent/unquote(parsed.path)).resolve()
   if not dest.exists():broken.append((name,link,'missing file'));continue
   if parsed.fragment and dest.suffix=='.html':
    targets=BeautifulSoup(dest.read_text(),'html.parser')
    if not targets.find(id=parsed.fragment):broken.append((name,link,'missing target'))
  elif parsed.fragment and not soup.find(id=parsed.fragment):broken.append((name,link,'missing fragment'))
assert not broken,broken
assert (course_count,quiz_count)==(50,230),(course_count,quiz_count)
# Dataset controls: six-row sales and kiosk, independently calculated.
with (root/'downloads/mastery_orders.csv').open(newline='') as f:orders=list(csv.DictReader(f))
assert len(orders)==6 and len(set(o['order_id'] for o in orders))==6
completed=[o for o in orders if o['status']=='Completed']
assert len(completed)==5
rev=lambda o:int(o['quantity'])*int(o['unit_price'])
prof=lambda o:int(o['quantity'])*(int(o['unit_price'])-int(o['unit_cost']))
assert sum(map(rev,orders))==602000
assert sum(map(rev,completed))==578000
assert sum(map(prof,completed))==135000
calcrows=list(csv.DictReader(open(root/'downloads/mastery_orders_validation_v88.csv')))
assert len(calcrows)==6
for o,c in zip(orders,calcrows):
 assert int(c['gross_order_value'])==rev(o)
 assert int(c['completed_revenue'])==(rev(o) if o['status']=='Completed' else 0)
 assert int(c['completed_profit'])==(prof(o) if o['status']=='Completed' else 0)
conn=sqlite3.connect(root/'downloads/mastery_orders.sqlite')
assert conn.execute("select count(*) from orders").fetchone()[0]==6
for i,e in enumerate(data['sql'],1):
 rows=conn.execute(e['example']).fetchall()
 assert rows,(i,'SQL empty')
 if i==3:assert len(rows)==3 and sum(r[-1] for r in rows)==578000
 if i==7:assert len(rows[0])==4 and rows[-1][-1]==2
# Original teaching SQL uses SQLite, not Practice Arena's challenge database.
assert 'grand total 578000' in data['sql'][2]['result']
assert 'order_date | recency_rank' in data['sql'][6]['result']
# Execute all Python snippets in isolated working dirs and check stable outputs.
for i,e in enumerate(data['python'],1):
 with TemporaryDirectory() as tmp:
  shutil.copy(root/'downloads/mastery_orders.csv',Path(tmp)/'mastery_orders.csv')
  result=subprocess.run([sys.executable,'-c',e['example']],cwd=tmp,text=True,capture_output=True,timeout=30)
  assert result.returncode==0,(i,result.stderr[-200:])
  assert result.stdout.strip(),(i,'no output')
with (root/'downloads/kiosk_week.csv').open() as f:kiosk=list(csv.DictReader(f))
computed=list(csv.DictReader(open(root/'downloads/kiosk_worked_controls_v88.csv')))
assert len(kiosk)==len(computed)==5
for o,r in zip(kiosk,computed):
 u=int(o['units_sold']);sell=int(o['price_per_meal']);cost=int(o['unit_cost_per_meal']);fixed=int(o['daily_fixed_cost'])
 assert int(r['revenue_ngn'])==u*sell
 assert int(r['profit_ngn'])==u*(sell-cost)-fixed
print('PASS v88: six complete course maps; 58 lesson checkpoints; 230 scored specialist quiz keys; 10 runnable SQLite examples; 10 runnable Python examples; validation CSVs; all course-page local links.')
