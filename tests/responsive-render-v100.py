#!/usr/bin/env python3
"""Rendered layout regression using installed Chromium and the project's real CSS.
This is CSS-inlined DOM testing, not authenticated/hosted end-to-end testing.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import argparse,re,shutil,sys,json,base64
p=argparse.ArgumentParser()
p.add_argument('--widths',default='320,360,375,390,430,600,768,900,1024,1365,1440,2560')
p.add_argument('--themes',default='light,dark')
p.add_argument('--routes',default='')
p.add_argument('--height',type=int,default=844)
p.add_argument('--zoom-text',action='store_true')
p.add_argument('--output',default='')
a=p.parse_args()
root=Path(__file__).resolve().parents[1]
routes=sorted(str(f.relative_to(root)) for f in root.rglob('*.html') if 'node_modules' not in f.parts)
if a.routes:
 requested=set(a.routes.split(','))
 assert requested.issubset(routes),f'Unknown pages: {requested-set(routes)}'
 routes=[r for r in routes if r in requested]
cache={}
def inline(route,theme):
 s=(root/route).read_text()
 s=re.sub(r'<script\b[^>]*>.*?</script\s*>','',s,flags=re.I|re.S)
 def asset(m):
  tag=m.group(0)
  if 'stylesheet' not in tag.lower():return tag
  h=re.search(r'href=["\']([^"\']+)',tag,re.I)
  if not h:return tag
  f=((root/route).parent/h.group(1).split('?')[0]).resolve()
  if f.is_relative_to(root) and f.is_file():
   if f not in cache:cache[f]=f.read_text()
   return '<style>'+cache[f].replace('</style>','<\\/style>')+'</style>'
  return ''
 s=re.sub(r'<link\b[^>]*>',asset,s,flags=re.I)
 def img(m):
  tag=m.group(0);h=re.search(r'src=["\']([^"\']+)',tag,re.I)
  if h:
   f=((root/route).parent/h.group(1).split('?')[0]).resolve()
   if f.is_relative_to(root) and f.is_file() and f.suffix.lower()=='.svg':
    tag=tag.replace(h.group(1),'data:image/svg+xml;base64,'+base64.b64encode(f.read_bytes()).decode())
  return tag
 s=re.sub(r'<img\b[^>]*>',img,s,flags=re.I)
 s=re.sub(r'<html\b',f'<html data-theme="{theme}" class="{theme}"',s,count=1,flags=re.I)
 return s
JS='''() => {
 const w=innerWidth,doc=document.documentElement.scrollWidth;
 const r=el=>el&&el.getBoundingClientRect();
 const heading=r(document.querySelector('body[data-responsive-page="practice"] .pc-hero h1'));
 const strip=r(document.querySelector('body[data-responsive-page="practice"] .pc-hero .pc-brand-strip'));
 const filter=document.querySelector('.dlp97-catalog-page .dlp97-search-row');
 const input=r(filter?.querySelector('input'));const label=r(filter?.querySelector('label'));
 const heroStack=!(heading&&strip)||w>700||strip.top>=heading.bottom-2;
 const filterStack=!(input&&label)||w>600||label.top>=input.bottom-2;
 return {doc,w,overflow:doc>w+3,heroStack,filterStack};
}'''
widths=[int(w) for w in a.widths.split(',')];themes=a.themes.split(',')
fail=[];done=0;results=[]
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path=shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':390,'height':a.height},reduced_motion='reduce')
 for route in routes:
  for theme in themes:
   page.set_viewport_size({'width':390,'height':a.height})
   page.emulate_media(color_scheme=theme,reduced_motion='reduce')
   try:
    page.set_content(inline(route,theme),wait_until='domcontentloaded',timeout=30000)
    if a.zoom_text:page.evaluate("document.documentElement.style.fontSize='200%'")
    for w in widths:
     page.set_viewport_size({'width':w,'height':a.height})
     d=page.evaluate(JS);done+=1
     if d['overflow'] or not d['heroStack'] or not d['filterStack']:
      fail.append({'page':route,'theme':theme,'width':w,**d})
      print('FAIL',route,theme,w,d,flush=True)
   except Exception as exc:
    fail.append({'page':route,'theme':theme,'error':str(exc)[:160]})
  print('PAGE',route,'checked',done,'issues',len(fail),flush=True)
 b.close()
if a.output:Path(a.output).write_text(json.dumps({'pages':len(routes),'samples':done,'failures':fail},indent=2))
print('TOTAL',done,'EXPECTED',len(routes)*len(widths)*len(themes),'FAILURES',len(fail),flush=True)
if done!=len(routes)*len(widths)*len(themes) or fail:sys.exit(1)
