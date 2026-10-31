#!/usr/bin/env python3
"""Isolated Chromium keyboard/geometry test of the current workspace navigation.
The theme control's HTML is a geometry fixture; this is not a deployed-app test.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import base64,re,shutil,sys,argparse
root=Path(__file__).resolve().parents[1]
# Isolate the real navigation module and its actual style layers instead of
# loading 60+ unrelated page styles and project code through a local data URL.
nav_styles=['workspace-shell.css','mobile-experience-v13.css','mobile-finish-v14.css',
            'responsive-system-v15.css','theme-navigation-v16.css',
            'learning-experience-v84.css','premium-design-v99.css','text-contrast-v98.css']
raw='<html data-theme="light"><head>'+''.join('<style>'+(root/'assets'/f).read_text()+'</style>' for f in nav_styles)+'</head><body class="lp-home"><main id="main-content"><h1>Learning dashboard</h1></main></body></html>'
nav=(root/'assets/workspace-shell.js').read_text()
parser=argparse.ArgumentParser()
parser.add_argument('--widths',default='320,360,390,430,600,768,900,1024')
a=parser.parse_args()
fail=[];checked=0
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=shutil.which('chromium'),headless=True,args=['--no-sandbox'])
 for width,height in [(320,640),(360,780),(390,844),(430,900),(600,400),(768,500),(900,700),(1024,768)]:
  if width not in [int(x) for x in a.widths.split(',')]:continue
  for theme in ['light','dark']:
   page=b.new_page(viewport={'width':width,'height':height},color_scheme=theme,reduced_motion='reduce')
   checked+=1
   try:
    page.set_content(raw.replace('<html','<html data-theme="'+theme+'"',1))
    page.add_script_tag(content=nav)
    page.evaluate('''() => {let e=document.createElement('div');e.className='dlp-theme-wrap';e.innerHTML='<label class="dlp-theme-label" for="dalpThemeSelect">Theme</label><select id="dalpThemeSelect" class="dlp-theme-select" aria-label="Theme"><option>System</option><option>Light</option><option>Dark</option></select>';let h=document.querySelector('.dl-shell-actions');h.insertBefore(e,h.querySelector('.dl-shell-avatar'))}''')
    d=page.evaluate('''() => {let els=[...document.querySelectorAll('.dl-shell-actions>*')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.getBoundingClientRect());return {doc:document.documentElement.scrollWidth, right:Math.max(...els.map(e=>e.right)),noOverlap:els.every((e,i)=>!i||e.left>=els[i-1].right-1)}}''')
    assert d['doc']<=width+3 and d['right']<=width+2 and d['noOverlap'],f'header controls overlap {d}'
    if width<=950:
     trigger='.dl-mobile-tabs button.dl-tab' if width<=760 else '#dlMenuBtn'
     page.locator(trigger).focus();page.keyboard.press('Enter')
     assert page.locator('#dlPrimaryNav').evaluate("e=>e.classList.contains('is-open')"),'drawer not open'
     assert page.locator('#dlPrimaryNav a').count()>10,'drawer missing navigation links'
     assert page.locator('#dlPrimaryNav').evaluate("e=>{let r=e.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1}"),'drawer outside viewport'
     page.keyboard.press('Escape')
     assert not page.locator('#dlPrimaryNav').evaluate("e=>e.classList.contains('is-open')"),'Escape did not close drawer'
   except Exception as e:fail.append(f'{width}x{height} {theme}: {e}')
   page.close()
 b.close()
print('Navigation keyboard/layout',checked-len(fail),'/',checked,'passed')
for f in fail:print('FAIL',f)
if fail:sys.exit(1)
