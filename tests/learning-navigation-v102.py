#!/usr/bin/env python3
"""Rendered regression for competing learning navigation (v102).

Chromium loads actual page markup and CSS plus the real navigation scripts in a
controlled DOM. Replaces location.path only in the test fixture because hosted
and file:// navigation is restricted in this environment. No live auth tested.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import re,base64,shutil,sys,argparse,json
root=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser()
ap.add_argument('--widths',default='320,360,390,430,600,768,1024,1440')
ap.add_argument('--themes',default='light,dark')
ap.add_argument('--screenshots',default='')
ap.add_argument('--routes',default='')
args=ap.parse_args()
routes=['index.html','catalog.html',*[f'courses/{x}.html' for x in ['introduction','excel','sql','powerbi','python','ai']]]
if args.routes:
 requested=set(args.routes.split(','));assert requested<=set(routes),requested-set(routes)
 routes=[r for r in routes if r in requested]
css_cache={}
def render_markup(route,theme):
 s=(root/route).read_text()
 s=re.sub(r'<script\b[^>]*>.*?</script\s*>','',s,flags=re.I|re.S)
 def link(m):
  tag=m.group(0)
  if 'stylesheet' not in tag.lower():return tag
  h=re.search(r'href=["\']([^"\']+)',tag,re.I)
  if not h:return tag
  file=((root/route).parent/h.group(1).split('?')[0]).resolve()
  if file.is_relative_to(root) and file.is_file():
   if file not in css_cache:css_cache[file]=file.read_text()
   return '<style>'+css_cache[file].replace('</style>','<\\/style>')+'</style>'
  return ''
 s=re.sub(r'<link\b[^>]*>',link,s,flags=re.I)
 def img(m):
  tag=m.group(0);h=re.search(r'src=["\']([^"\']+)',tag,re.I)
  if h:
   file=((root/route).parent/h.group(1).split('?')[0]).resolve()
   if file.is_relative_to(root) and file.is_file() and file.suffix.lower()=='.svg':
    tag=tag.replace(h.group(1),'data:image/svg+xml;base64,'+base64.b64encode(file.read_bytes()).decode())
  return tag
 s=re.sub(r'<img\b[^>]*>',img,s,flags=re.I)
 s=re.sub(r'<html\b',f'<html data-theme="{theme}" class="{theme}"',s,count=1,flags=re.I)
 return s

def add_script(page,name,route):
 code=(root/'assets'/name).read_text()
 # `set_content` has about:blank URL, so supply only pathname/href in fixture.
 code=code.replace('location.pathname',json.dumps('/'+route)).replace('location.href','window.__qa_href')
 page.add_script_tag(content=code)

def box(page,sel):
 return page.eval_on_selector(sel,"e=>({display:getComputedStyle(e).display,visible:e.getClientRects().length>0 && getComputedStyle(e).visibility!=='hidden',r:(()=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height}})()})") if page.locator(sel).count() else None

errors=[];count=0
with sync_playwright() as pw:
 browser=pw.chromium.launch(executable_path=shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 for route in routes:
  for theme in args.themes.split(','):
   page=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce',color_scheme=theme)
   page.on('pageerror',lambda err: print('PAGEERROR',route, str(err)[:260],flush=True))
   page.set_content(render_markup(route,theme),wait_until='domcontentloaded',timeout=30000)
   page.evaluate('(href)=>window.__qa_href=href', 'https://qa.invalid/'+route)
   if route != 'catalog.html':
    add_script(page,'workspace-shell.js',route)
    if not page.locator('.dl-shell').count():print('WARN workspace script did not render',route,flush=True)
   if route != '__never__':
    page.add_script_tag(content=(root/'assets/catalog-data-v97.js').read_text())
    add_script(page,'learning-catalog-v97.js',route)
   page.wait_for_timeout(15)
   if page.locator('.dl-shell-brand img').count():
    page.eval_on_selector('.dl-shell-brand img', '(el,uri)=>el.src=uri', 'data:image/svg+xml;base64,'+base64.b64encode((root/'assets/da-logo.svg').read_bytes()).decode())
   for width in map(int,args.widths.split(',')):
    page.set_viewport_size({'width':width,'height':844})
    page.wait_for_timeout(5)
    count+=1
    top_selector=('.dlp97-mobile-bar' if width<=1100 else '.dlp97-side') if route=='catalog.html' else '.dl-shell'
    top=box(page,top_selector)
    classic=box(page,'.nav-shell')
    learner=box(page,'.dlp97-mobile-bar')
    aside=box(page,'.dlp97-side')
    bottom=box(page,'.dl-mobile-tabs')
    overflow=page.evaluate('document.documentElement.scrollWidth > innerWidth+3')
    is_small=width<=1100
    if not top or not top['visible'] or (top['r']['right']>width+3 and top_selector!='.dlp97-side'):
     errors.append(f'{route} {width} {theme}: primary header not visible/fits: {top}')
    if classic and classic['visible']:
     errors.append(f'{route} {width} {theme}: duplicate legacy header remains visible')
    if route=='index.html' and ((learner and learner['visible']) or (aside and aside['visible']) or box(page,'.dlp97-navigation')['visible']):
     errors.append(f'{route} {width} {theme}: redundant learning sidebar visible on homepage')
    if route.startswith('courses/') and is_small and ((learner and learner['visible']) or (aside and aside['visible'])):
     errors.append(f'{route} {width} {theme}: duplicate course learning navigation visible')
    if route.startswith('courses/') and not is_small and (not aside or not aside['visible']):
     errors.append(f'{route} {width} {theme}: desktop learning sidebar missing')
    if route=='catalog.html' and is_small and (not learner or not learner['visible']):
     errors.append(f'{route} {width} {theme}: catalog standalone menu missing')
    if route=='catalog.html' and bottom and bottom['visible']:
     errors.append(f'{route} {width} {theme}: unexpected second mobile tabs on standalone catalog')
    if overflow:errors.append(f'{route} {width} {theme}: document overflow')
    # There must be exactly one usable navigation entry point on phone.
    if width in (320,390,600):
     if route=='catalog.html':
      trigger=page.locator('.dlp97-menu-toggle');opened=page.locator('body.dlp97-nav-open')
     else:
      trigger=page.locator('.dl-mobile-tabs button.dl-tab');opened=page.locator('.dl-shell-nav.is-open')
     if trigger.count()!=1 or not trigger.is_visible():errors.append(f'{route} {width} {theme}: no usable menu trigger')
     else:
      trigger.click(timeout=3000)
      if opened.count()!=1:errors.append(f'{route} {width} {theme}: drawer did not open')
      if route!='catalog.html' and page.locator('.dl-shell-nav.is-open a[href*="courses/"]').count()!=6:
       errors.append(f'{route} {width} {theme}: workspace menu lacks subject links')
      page.keyboard.press('Escape')
      if opened.count():errors.append(f'{route} {width} {theme}: Escape did not close menu')
    if args.screenshots and width in (390,1440):
     out=Path(args.screenshots);out.mkdir(parents=True,exist_ok=True)
     page.evaluate('document.activeElement?.blur()')
     page.screenshot(path=str(out/f'{route.replace("/","-").replace(".html","")}-{theme}-{width}.png'))
   page.close()
   print('CHECKED',route,theme,'cases',count,'failures',len(errors),flush=True)
 browser.close()
print('TOTAL',count,'FAILURES',len(errors))
for err in errors[:45]:print('FAIL',err)
if errors:sys.exit(1)
