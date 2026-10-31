from playwright.sync_api import sync_playwright
from pathlib import Path
import re
import json
import argparse
import shutil
import sys
parser=argparse.ArgumentParser(description='Audit visible non-gradient text contrast in the local HTML/CSS snapshot')
parser.add_argument('--width',type=int,default=1365,help='viewport width in CSS pixels (e.g. 390)')
parser.add_argument('--output',type=Path,help='optional path to detailed JSON results')
parser.add_argument('--routes',type=str,help='optional comma-separated subset of discovered HTML routes for focused regression runs')
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
routes=[x.name for x in root.glob('*.html')]+['courses/'+x.name for x in (root/'courses').glob('*.html')]
if args.routes:
    requested=[r.strip() for r in args.routes.split(',') if r.strip()]
    unknown=set(requested)-set(routes)
    if unknown:sys.exit('Unknown routes: '+', '.join(sorted(unknown)))
    routes=requested
js=r'''() => {
function parse(s){let m=(s||'').match(/rgba?\(([^)]+)\)/);if(!m)return null;let v=m[1].replace(/\//g,',').split(/[ ,]+/).filter(Boolean).map(Number);if(v.length<3)return null;return [v[0],v[1],v[2],v.length>3?v[3]:1]}
function over(c,b){let a=c[3];return [c[0]*a+b[0]*(1-a),c[1]*a+b[1]*(1-a),c[2]*a+b[2]*(1-a),1]}
function lumi(c){let v=c.slice(0,3).map(z=>z/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722}
function contrast(a,b){let x=lumi(a),y=lumi(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function cssPath(el){let parts=[];for(let i=0;i<3&&el&&el.tagName;i++,el=el.parentElement)parts.push(el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+[...el.classList].filter(c=>c.length<35).slice(0,2).map(c=>'.'+c).join(''));return parts.join(' < ')}
let total=0,skipped=0,issues=[],foundGradients=0;
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
while((n=walker.nextNode())) {
let text=n.nodeValue.trim().replace(/\s+/g,' ');if(!text)continue;let el=n.parentElement;if(!el||['SCRIPT','STYLE','NOSCRIPT','SVG','TITLE'].includes(el.tagName))continue;
let s=getComputedStyle(el),r=el.getBoundingClientRect();if(s.display==='none'||s.visibility!=='visible'||+s.opacity<.1||r.width<1||r.height<1||r.bottom<0||r.right<0||r.left>=innerWidth)continue;
let color=parse(s.color);if(!color)continue;
let bg=[255,255,255,1],grad=false;
let chain=[];for(let a=el;a;a=a.parentElement)chain.push(a);
for(let i=chain.length-1;i>=0;i--){let q=getComputedStyle(chain[i]);if(q.backgroundImage!=='none'){grad=true}let v=parse(q.backgroundColor);if(v)bg=over(v,bg)}
if(grad){foundGradients++;continue}
let real=over(color,bg);let c=contrast(real,bg);let size=parseFloat(s.fontSize),weight=Number(s.fontWeight)||400;let min=(size>=24||(size>=18.66&&weight>=700))?3:4.5;
total++;if(c+1e-6<min){issues.push({path:cssPath(el),text:text.slice(0,55),ratio:Math.round(c*100)/100,min,color:s.color,bg:bg.slice(0,3).map(v=>Math.round(v)),size:Math.round(size*10)/10,weight});}
}
return {total,issues:issues.sort((a,b)=>a.ratio-b.ratio).slice(0,65),issueCount:issues.length,gradCount:foundGradients,theme:document.documentElement.dataset.theme};
}'''
css_cache={}
def make_static(route,theme):
    content=(root/route).read_text(errors='replace')
    content=re.sub(r'<script\b[^>]*>.*?</script\s*>','',content,flags=re.I|re.S)
    def css_tag(m):
        raw=m.group(0)
        p=re.search(r'href=["\']([^"\']+)["\']',raw,re.I)
        if not p:return raw
        target=(root/route).parent / p.group(1).split('?')[0]
        if target.is_file() and target.resolve().is_relative_to(root):
            if target not in css_cache:css_cache[target]=target.read_text(errors='replace')
            return '<style>'+css_cache[target].replace('</style>','<\\/style>')+'</style>'
        return ''
    content=re.sub(r'<link\b[^>]*>',lambda m:css_tag(m) if '.css' in m.group(0) else m.group(0),content,flags=re.I)
    content=re.sub(r'<html\b',f'<html data-theme="{theme}" class="{theme}"',content,count=1,flags=re.I)
    return content

results=[]
with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,executable_path=shutil.which('chromium') or shutil.which('chromium-browser'),args=['--no-sandbox','--disable-dev-shm-usage'])
  for route in routes:
    for theme in ['light','dark']:
      page=browser.new_page(viewport={'width':args.width,'height':844},reduced_motion='reduce')
      page.route('**/cdn.jsdelivr.net/**',lambda r:r.fulfill(status=200,body=''))
      try:
        page.set_content(make_static(route,theme),wait_until='domcontentloaded',timeout=30000)

        page.wait_for_timeout(50)
        d=page.evaluate(js)
        d.update(route=route,requested=theme)
        results.append(d)
        if d['issueCount']>0: print(f'{route:34} {theme:5} {d["issueCount"]:4}/{d["total"]:4} grad {d["gradCount"]:3} worst: {d["issues"][0]["ratio"]} {d["issues"][0]["path"]} {d["issues"][0]["text"][:28]}',flush=True)
      except Exception as e: print('ERROR',route,theme,str(e)[:150],flush=True)
      finally:page.close()
  browser.close()
if args.output: args.output.write_text(json.dumps(results,indent=2))
fail=sum(r['issueCount'] for r in results)
print('TOTAL',fail,'/',sum(r['total'] for r in results),'ROUTES',len(routes),'SAMPLES',len(results))
if len(results)!=len(routes)*2:sys.exit('ERROR: Some route/theme combinations could not be evaluated')
if fail:sys.exit(f'FAIL: {fail} contrast findings detected')
