// Shared source-of-truth for static HTML route and stylesheet coverage.
// No hard-coded page count, query-string version, or route list is required.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignored = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.vercel']);
const slash = value => value.split(path.sep).join('/');

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    if(entry.isDirectory())return ignored.has(entry.name)?[]:walk(path.join(dir,entry.name));
    return entry.isFile() && entry.name.toLowerCase().endsWith('.html')?[path.join(dir,entry.name)]:[];
  });
}

// Parse attributes independently of their order and quote style. Ignore HTML comments.
function attrs(tag){
  const result={};
  const body=tag.replace(/^<\s*\/?[\w:-]+\b/i,'').replace(/\/?\s*>$/,'');
  const regex=/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for(const match of body.matchAll(regex))result[match[1].toLowerCase()]=match[2]??match[3]??match[4]??'';
  return result;
}
function tags(html,name){
  const clean=html.replace(/<!--[\s\S]*?-->/g,'');
  return [...clean.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match=>attrs(match[0]));
}
function resolveAsset(route,href){
  const url = new URL(href,`https://example.invalid/${route}`);
  if(url.origin!=='https://example.invalid')return {href,local:false,path:null,exists:null};
  const pathname=decodeURIComponent(url.pathname);
  const resolved=path.resolve(root,`.${pathname}`);
  const inside=resolved.startsWith(root+path.sep);
  return {href,local:true,path:inside?slash(path.relative(root,resolved)):pathname,
    exists:inside && fs.existsSync(resolved) && fs.statSync(resolved).isFile()};
}
export function discoverPages(){
  return walk(root).sort().map(file=>{
    const route=slash(path.relative(root,file));
    const html=fs.readFileSync(file,'utf8');
    const links=tags(html,'link').filter(a=>(a.rel??'').toLowerCase().split(/\s+/).includes('stylesheet'))
      .map(a=>({...resolveAsset(route,a.href??''),attrs:a}));
    const scripts=tags(html,'script').filter(a=>a.src).map(a=>({...resolveAsset(route,a.src),attrs:a}));
    const viewport=tags(html,'meta').some(a=>a.name?.toLowerCase()==='viewport' && !!a.content);
    const body=tags(html,'body')[0]??{};
    return {route,file,html,links,scripts,viewport,body};
  });
}
export function occurrences(page,asset,kind='links'){
  return page[kind].filter(ref=>ref.local && ref.path===`assets/${asset}`);
}
export function has(page,asset,kind='links'){
  return occurrences(page,asset,kind).length>0;
}
export function requireAsset(assert,page,asset,kind='links'){
  assert.equal(occurrences(page,asset,kind).length,1,
    `${page.route}: expected exactly one ${kind==='links'?'stylesheet':'script'} for assets/${asset}`);
}
export function requireOrder(assert,page,before,after){
  const a=page.links.findIndex(ref=>ref.path===`assets/${before}`);
  const b=page.links.findIndex(ref=>ref.path===`assets/${after}`);
  assert(a!==-1 && b!==-1 && a<b,
    `${page.route}: assets/${before} must be loaded before assets/${after}`);
}
export function assertReferences(assert,pages){
  for(const page of pages){
    assert(page.viewport,`${page.route}: missing nonempty mobile viewport meta`);
    for(const link of page.links){
      if(link.local)assert(link.exists,`${page.route}: missing local stylesheet: ${link.href} (resolved ${link.path})`);
    }
    const seen=new Set();
    for(const link of page.links.filter(ref=>ref.local)){
      assert(!seen.has(link.path),`${page.route}: duplicate local stylesheet: ${link.href} (${link.path})`);
      seen.add(link.path);
    }
  }
}
// Only these known standalone/compact layouts intentionally omit the later shared
// v14-v16 styles. All other discovered routes must use the full shared stack.
export function pageLayout(page){
  if(page.route==='catalog.html')return 'catalog';
  if(['capstone-guide.html','preview.html'].includes(page.route))return 'compact';
  return 'full';
}
