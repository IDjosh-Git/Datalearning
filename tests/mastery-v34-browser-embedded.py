"""Offline Chromium smoke: UI is embedded because browser navigation is sandbox-blocked.
Exercises the real course inline controller and real shared weekly-workspace JS.
It does not test login/cloud services or network loading.
"""
from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'courses/python.html').read_text()
soup=BeautifulSoup(source,'html.parser')
course_script=next(s.text for s in soup.find_all('script') if 'const sidebar=document.getElementById' in s.text)
for script in soup.find_all('script'):script.decompose()
for link in soup.find_all('link'):link.decompose()
html=str(soup)
css='\n'.join((root/'assets'/f).read_text() for f in ['mastery-accessibility-v33.css','weekly-workspace.css','weekly-mastery-v34.css','course-mobile-v21.css'])
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [320,390,768,1280]:
  page=browser.new_page(viewport={'width':width,'height':840},color_scheme='light')
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(html,wait_until='domcontentloaded',timeout=25000)
  page.evaluate("Object.defineProperty(window,'localStorage',{configurable:true,value:{items:{},getItem(k){return this.items[k]??null},setItem(k,v){this.items[k]=String(v)},removeItem(k){delete this.items[k]}}})")
  page.evaluate("history.replaceState = () => {}") # in-memory document has null origin; no-op only for offline test
  page.add_style_tag(content=css)
  page.add_script_tag(content=course_script)
  page.add_script_tag(content=(root/'assets/weekly-workspace.js').read_text())
  page.wait_for_function("document.body.classList.contains('cw-workspace-ready')",timeout=12000)
  assert page.locator('.cw-module.cw-current').count()==1
  assert page.locator('#cw-week-select option').count()==10
  assert page.locator('#week1.cw-current').count()==1
  assert page.locator('#week10.cw-current').count()==0
  for name in ['learn','practise','quiz']:assert page.locator(f'#week1 [data-cw-tab="{name}"]').count()==1
  page.locator('#cw-week-select').select_option('4')
  assert page.locator('#week4.cw-current').count()==1
  assert page.locator('.cw-module.cw-current').count()==1
  page.locator('#week4 [data-cw-tab="practise"]').click()
  assert page.locator('#week4 .v34-guided-lab:visible').count()==1
  page.locator('#week4 [data-cw-tab="quiz"]').click()
  assert page.locator('#week4 .v34-python-quiz:visible').count()==1
  quiz=page.locator('#week4 .v34-python-quiz')
  for question in quiz.locator('.question').all():
   right=question.get_attribute('data-answer')
   question.locator(f'input[value="{right}"]').check()
  quiz.locator('.gradeBtn').click()
  assert 'Score: 3/3 (100%)' in quiz.locator('.score').inner_text()
  page.locator('#week4 .completeBox[data-week="4"]').evaluate('(e)=>{e.checked=true;e.dispatchEvent(new Event("change",{bubbles:true}))}')
  assert page.locator('#progressText').inner_text()=='10%'
  for theme in ['dark','light']:
   page.evaluate('(t)=>{document.documentElement.dataset.theme=t}',theme)
   bg=page.locator('#week4 .v34-guided-lab').evaluate('(e)=>getComputedStyle(e).backgroundColor')
   fg=page.locator('#week4 .v34-guided-lab').evaluate('(e)=>getComputedStyle(e).color')
   assert bg!=fg
  page.locator('#week4 [data-cw-tab="learn"]').click()
  assert page.locator('#week4 .mastery-deep-dive:visible').count()==1
  doc_width=page.evaluate('document.documentElement.scrollWidth')
  assert doc_width<=width+2, ('horizontal overflow',width,doc_width)
  if width==390:page.screenshot(path='/mnt/data/course_v34/python-week4-mobile.png',full_page=True)
  if width==1280:page.screenshot(path='/mnt/data/course_v34/python-week4-desktop.png',full_page=True)
  assert not errors,errors[:5]
  print(f'PASS embedded browser test {width}px: week selector, Learn/Practise/Quiz, 100% quiz, progress, both themes, no overflow')
  page.close()
 browser.close()
