from pathlib import Path
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent.parent
html=(root/'practice.html').read_text()
soup=BeautifulSoup(html,'html.parser')
body=soup.body
for tag in list(body.select('script')):tag.decompose()
markup='<html><head><meta charset="utf-8"></head>'+str(body)+'</html>'
files=['practice-data.js','practice-extra.js','execution-engine.js','sqlite-bridge.js','formula-engine.js','python-challenges-v42.js','python-grader-v42.js','practice.js','challenge-hub.js','arena-subject-launcher-v44.js']
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 pg=b.new_page(viewport={'width':390,'height':844});errs=[]
 pg.on('pageerror',lambda e:errs.append(str(e)[:500]))
 pg.set_content(markup,timeout=8000,wait_until='domcontentloaded')
 pg.evaluate('history.pushState=()=>{};history.replaceState=()=>{};')
 for f in files:
  try:pg.add_script_tag(content=(root/'assets'/f).read_text())
  except Exception as e:print('INJECT_ERROR',f,str(e)[:200],flush=True)
 print('errors',errs[:8], 'tasks',pg.locator('#practiceList button[data-id]').count(),flush=True)
 for width in (390,1440):
  pg.set_viewport_size({'width':width,'height':844})
  for tool in ('SQL','Excel','Python'):
   try:
    pg.locator(f'[data-arena-subject="{tool}"]').evaluate('(el)=>el.click()')
    title=pg.locator('#hubActiveTitle').inner_text()
    selected=pg.locator('#practiceKind').input_value()
    assert selected==tool,(tool,selected)
    assert pg.locator('#practiceAnswer').count()==1
    print('TOOL',width,tool,'active',title,'filter',selected,'editor=1',flush=True)
   except Exception as e:print('TOOL_ERROR',width,tool,str(e)[:250],flush=True);raise
  assert pg.locator('#practiceList button[data-id]').count()==54  # currently Python selected
 # Verify actual bundled evaluator response, without claiming remote SQLite/Pyodide runtime.
 pg.locator('[data-arena-subject="Excel"]').evaluate('(el)=>el.click()')
 answer=pg.evaluate("window.DALP_PRACTICE.find(x=>x.kind==='Excel').answer")
 pg.locator('#practiceAnswer').fill(answer)
 pg.locator('#practiceCheck').evaluate('(el)=>el.click()')
 assert 'PASSED' in pg.locator('#practiceFeedback').inner_text(),pg.locator('#practiceFeedback').inner_text()
 print('EXCEL evaluator smoke PASS',flush=True)
 print('errors-end',errs[:10],flush=True)
 b.close()
