import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {restrictedKind} from '../lib/server-auth.js';
const read=p=>fs.readFileSync(p,'utf8');
const pages=[...fs.readdirSync('.').filter(x=>x.endsWith('.html')),...fs.readdirSync('courses').filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
let checked=0,links=0;
for(const file of pages){const html=read(file);if(!html.includes('class="dlu-header"'))continue;
 const header=html.match(/<header\b[^>]*class="dlu-header"[\s\S]*?<\/header>/)[0];
 const courseLink=[...header.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find(x=>x[2].trim()==='Courses');
 assert(courseLink,`${file}: course navigation exists`);
 const courseURL=new URL(courseLink[1],`https://example.test/${file}`);
 assert.equal(courseURL.pathname,'/index.html',`${file}: Courses stays in authenticated Discover`);
 assert.equal(courseURL.hash,'#zaDiscoverCards');
 const drawer=html.slice(html.indexOf('id="dluNavPanel"'),html.indexOf('<main'));
 const drawerCourse=[...drawer.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find(x=>x[2].trim().startsWith('Courses '));
 assert(drawerCourse,`${file}: mobile Courses link exists`);
 assert.equal(new URL(drawerCourse[1],`https://example.test/${file}`).href,courseURL.href,`${file}: desktop and mobile course navigation agree`);
 for(const match of drawer.matchAll(/href="([^"]+)"/g)){
  const url=new URL(match[1],`https://example.test/${file}`);
  assert(fs.existsSync('.'+url.pathname),`${file}: missing mobile destination ${url.pathname}`);
  assert.notEqual(restrictedKind(url.pathname),'public',`${file}: mobile nav stays authenticated`);
 }
 for(const match of header.matchAll(/href="([^"]+)"/g)){
  const url=new URL(match[1],`https://example.test/${file}`);
  assert.equal(url.origin,'https://example.test');
  assert(fs.existsSync('.'+url.pathname),`${file}: missing ${url.pathname}`);
  assert.notEqual(restrictedKind(url.pathname),'public',`${file}: signed-in nav must not drop into public catalogue`);
  if(url.hash)assert(read('.'+url.pathname).includes(`id="${url.hash.slice(1)}"`),`missing anchor ${url.href}`);
  links++;
 }
 checked++;
}
assert.equal(checked,28);
for(const file of ['assets/scripts/private-navigation.js','assets/scripts/premium-search.js','assets/scripts/public-footer.js','assets/scripts/academy-app.js']){
 assert(!read(file).includes("'catalog.html'"),`${file}: no legacy public catalogue navigation`);
 assert(read(file).includes('index.html#zaDiscoverCards'));
}
const redirect=JSON.parse(read('vercel.json')).redirects.find(x=>x.source==='/catalog.html');
assert.equal(redirect.destination,'/courses');
assert.equal(redirect.permanent,true,'obsolete public catalogue must redirect permanently');
// Execute the real shared controller: menu state, keyboard focus and current link.
const classes=new Set(),events={},windowEvents={};let mediaChange;
const make=href=>({href,attrs:{},handlers:{},isConnected:true,hidden:false,
 setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},
 addEventListener(k,fn){(this.handlers[k]??=[]).push(fn);},
 focus(){document.activeElement=this;},getClientRects(){return [{}];}});
const open=make(),close=make(),discover=make('https://example.test/index.html'),courses=make('https://example.test/index.html#zaDiscoverCards');
const drawerLink=make(courses.href),last=make('https://example.test/account.html');
const panel=make();panel.hidden=true;panel.querySelectorAll=selector=>selector==='a[href]'?[drawerLink,last]:[close,drawerLink,last];
const document={readyState:'complete',activeElement:open,body:{classList:{toggle(c,v){v?classes.add(c):classes.delete(c);},remove(c){classes.delete(c);}}},
 getElementById:id=>({dluNavOpen:open,dluNavClose:close,dluNavPanel:panel})[id],
 querySelectorAll:()=>[discover,courses,drawerLink,last],addEventListener:(k,fn)=>{events[k]=fn;}};
const location=new URL('https://example.test/index.html#zaDiscoverCards');
vm.runInNewContext(read('assets/scripts/public-header-unified.js'),{document,location,URL,window:{addEventListener:(k,fn)=>windowEvents[k]=fn},matchMedia:()=>({addEventListener:(k,fn)=>mediaChange=fn})});
const click=node=>node.handlers.click.forEach(fn=>fn({target:node}));
assert.equal(courses.attrs['aria-current'],'location');assert(!discover.attrs['aria-current']);
click(open);assert.equal(panel.hidden,false);assert.equal(open.attrs['aria-expanded'],'true');assert.equal(document.activeElement,close);
document.activeElement=last;let prevented=false;events.keydown({key:'Tab',preventDefault(){prevented=true;}});assert(prevented);assert.equal(document.activeElement,close);
click(drawerLink);assert.equal(panel.hidden,true);assert.equal(open.attrs['aria-expanded'],'false');assert(!classes.has('dlu-nav-open'));assert.equal(document.activeElement,open);
click(open);events.keydown({key:'Escape',preventDefault(){}});assert.equal(panel.hidden,true);
click(open);mediaChange({matches:true});assert.equal(panel.hidden,true);assert.equal(open.attrs['aria-expanded'],'false');
location.hash='';windowEvents.hashchange();assert.equal(discover.attrs['aria-current'],'page');assert(!courses.attrs['aria-current']);
location.pathname='/dashboard';windowEvents.hashchange();assert.equal(discover.attrs['aria-current'],'page','dashboard alias highlights Discover');
console.log(`PASS ${checked} authenticated headers / ${links} local destinations, Discover course routing, mobile menu selection, Escape, focus trap, resize, and current-page state`);
