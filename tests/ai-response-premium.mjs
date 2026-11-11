import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
class Node {
 constructor(tag,text=''){this.tag=tag;this.textContent=text;this.children=[];this.attributes={};this.className='';this.classList={add:(name)=>{this.className+=' '+name}};this.tabIndex=-1}
 append(...elements){this.children.push(...elements)}
 setAttribute(name,value){this.attributes[name]=value}
 addEventListener(){}
 get descendants(){return [this,...this.children.flatMap(x=>x.descendants)]}
}
const ctx={window:{},document:{createElement:(tag)=>new Node(tag),createTextNode:(text)=>new Node('#text',text)},URL};
vm.createContext(ctx);
vm.runInContext(read('assets/scripts/ai-response-format.js'),ctx);
const display=new Node('section');
const text=`## Sales by region\n\nThe table shows **verified revenue**, before taxes.\n\n| Region | Revenue | Commentary |\n|:---|---:|---|\n| North | ₦1,500 | Best performer |\n| South | ₦1,100 | Needs review |\n\n1. Check source\n2. Validate totals\n\n\`\`\`sql\nSELECT region, SUM(amount) FROM sales GROUP BY region;\n\`\`\`\n\nCheck [docs](https://example.com/help). <script>alert(1)</script>`;
ctx.window.DALP_AI_RESPONSE.render(display,text);
const nodes=display.descendants;
for(const tag of ['h3','p','strong','table','thead','tbody','th','td','ol','li','pre','code','a'])assert(nodes.some(n=>n.tag===tag),`Missing real Markdown structure: ${tag}`);
assert.equal(nodes.filter(n=>n.tag==='tr').length,3,'One header and two table rows');
assert(nodes.some(n=>n.className.includes('dl-ai-table-region')),'Table must be in scrollable region');
assert.equal(nodes.filter(n=>n.tag==='script').length,0,'AI-provided HTML must not execute');
assert(nodes.some(n=>n.tag==='#text'&&n.textContent.includes('<script>')),'Untrusted markup must remain text');
assert.equal(nodes.find(n=>n.tag==='a').attributes.rel,undefined); // rel property set, not injected as HTML
assert(nodes.find(n=>n.tag==='a').href.startsWith('https://'),'Links restricted to safe schemes');
const float=read('assets/scripts/floating-learning-ai.js'),live=read('assets/scripts/tutor-ai.js'),offline=read('assets/scripts/tutor.js');
for(const source of [float,live,offline])assert(source.includes('DALP_AI_RESPONSE.render'),'All AI modes use the shared formatter');
const css=read('assets/styles/ai-response-premium.css');
for(const token of ['dl-ai-table-region','overflow-x:auto','max-width:100%','dl-ai-code','white-space:normal','max-width:100%'])assert(css.includes(token),`Missing responsive style: ${token}`);
const htmls=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')).map(x=>x),...fs.readdirSync(path.join(root,'courses')).filter(x=>x.endsWith('.html')).map(x=>'courses/'+x)];
let count=0;
for(const page of htmls){const html=read(page);if(!html.includes('floating-learning-ai.js')&&page!=='tutor.html')continue;
 const shared=html.indexOf('ai-response-format.js'),client=html.indexOf(page==='tutor.html'?'assets/scripts/tutor.js':'floating-learning-ai.js');
 assert(shared>=0&&shared<client,`${page}: load formatter before chat controller`);
 assert(html.includes('ai-response-premium.css'),`${page}: include safe responsive chat styles`);
 count++;
}
console.log(`PASS shared markdown and safe real tables, 3 AI experiences, source sanitization, responsive styles, ${count} wired pages`);
