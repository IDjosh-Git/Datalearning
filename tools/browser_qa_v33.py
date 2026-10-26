"""Offline Playwright layout check using actual project CSS and static course bodies.
Network navigation is prohibited in this execution environment, so use page.set_content.
This validates layout/theme and editor typing but does not cover live Auth/Supabase/CDN.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
import json,re
ROOT=Path(__file__).resolve().parent.parent
QA=ROOT/'qa-v33';QA.mkdir(exist_ok=True)

def inline_page(course):
 soup=BeautifulSoup((ROOT/'courses'/f'{course}.html').read_text(),'html.parser')
 styles=[]
 for tag in soup.head.find_all(['style','link']):
  if tag.name=='style':styles.append(tag.get_text())
  elif tag.get('rel')==['stylesheet']:
   src=tag.get('href','').split('?')[0]
   target=(ROOT/'courses'/src).resolve()
   if target.is_file() and target.suffix=='.css': styles.append(target.read_text())
 for s in soup.find_all('script'):s.decompose()
 for e in soup.head.find_all('link'):e.decompose()
 for e in soup.head.find_all('style'):e.decompose()
 node=soup.new_tag('style');node.string='\n'.join(styles);soup.head.append(node)
 return str(soup)

def inline_editor():
 files=['assets/site.css','assets/modern.css','assets/practice.css','assets/arena-upgrade.css','assets/arena-layout.css','assets/arena-ide.css','assets/arena-consistency.css','assets/sql-editor-accessibility-v32.css','assets/mastery-accessibility-v33.css','assets/theme-editor-v33.css']
 css='\n'.join((ROOT/f).read_text() for f in files)
 markup='''<!doctype html><html data-theme="light"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'''+css+'''</style></head><body data-responsive-page="practice"><div class="ide-shell"><section class="ide-primary"><div id="practiceDetail"><textarea id="practiceAnswer"></textarea><button id="practiceCheck" type="button">Run query</button></div></section></div></body></html>'''
 return markup

results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 for course in ['sql','excel','powerbi','ai','python']:
  content=inline_page(course)
  for mode in ['light','dark']:
   for width in [320,390,820,1280]:
    page=browser.new_page(viewport={'width':width,'height':850},device_scale_factor=1)
    page.set_content(content,wait_until='domcontentloaded');page.evaluate('m=>document.documentElement.dataset.theme=m',mode)
    data=page.evaluate('''() => {const m=document.querySelector('.course-mastery');const s=getComputedStyle(m);return {count:document.querySelectorAll('.course-mastery').length,width:innerWidth,scroll:document.documentElement.scrollWidth,background:s.backgroundColor,color:s.color,visible:m.getBoundingClientRect().height>100,checks:document.querySelectorAll('.mastery-check').length}}''')
    assert data['count']==10 and data['checks']==20 and data['visible'],(course,mode,width,data)
    # Some existing course decoration overflows on 320px; new mastery card should never be the culprit.
    bad=page.evaluate('''() => {const m=document.querySelector('.course-mastery'),r=m.getBoundingClientRect();return {right:r.right,width:r.width,win:innerWidth}}''')
    assert bad['right']<=width+1,(course,mode,width,'mastery card overflows',bad)
    results.append({'course':course,'mode':mode,'width':width,'pass':True,'colors':[data['color'],data['background']],'documentScrollWidth':data['scroll']})
    if course in ('sql','python') and width in (390,1280):page.screenshot(path=str(QA/f'{course}-{mode}-{width}.png'))
    page.close()
 for width in [320,390,1280]:
  page=browser.new_page(viewport={'width':width,'height':850},device_scale_factor=1,has_touch=width<=390)
  page.set_content(inline_editor())
  page.add_script_tag(content=(ROOT/'assets/arena-upgrade.js').read_text())
  page.add_script_tag(content=(ROOT/'assets/theme-editor-v33.js').read_text())
  page.evaluate("window.DALP_ARENA_UPGRADE.decorate({kind:'SQL'})")
  input=page.locator('#practiceAnswer');input.fill('');input.focus()
  page.keyboard.type('SELECT amount FROM orders',delay=5)
  val=input.input_value();assert val=='SELECT amount FROM orders',repr(val)
  detail=page.evaluate('''() => {const e=document.getElementById('practiceAnswer'),s=getComputedStyle(e),p=document.getElementById('arenaHighlight');return {attrs:['spellcheck','autocorrect','autocapitalize','autocomplete'].map(n=>e.getAttribute(n)),wrap:e.getAttribute('wrap'),scroll:document.documentElement.scrollWidth,color:s.color,paint:p?.textContent,preDisplay:p?getComputedStyle(p).display:''}}''')
  assert detail['attrs']==['false','off','off','off'] and detail['wrap']=='soft',detail
  for mode in ['light','dark']:
   page.evaluate('m=>document.documentElement.dataset.theme=m',mode)
   page.screenshot(path=str(QA/f'editor-{mode}-{width}.png'))
  results.append({'course':'practice','mode':'both','width':width,'pass':True,'detail':detail})
  page.close()
 browser.close()
(QA/'results.json').write_text(json.dumps(results,indent=2))
print('OFFLINE BROWSER QA PASS:',len(results),'course layout/theme/editor cases')
