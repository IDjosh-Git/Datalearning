import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const courses=['intro','excel','sql','powerbi','ai'];
for(const course of courses){
 const svg=read(`assets/icon-${course}.svg`);
 if(!svg.startsWith('<svg ') || !svg.includes('</svg>') || !svg.includes('<title>') || !svg.includes('viewBox="0 0 64 64"')) throw Error(`Invalid visual mark: ${course}`);
 if(svg.match(/https?:\/\//g)?.filter(x=>x!=='http://')?.length) throw Error(`Remote reference in ${course}`);
 if(!read('index.html').includes(`assets/icon-${course}.svg?v=20261022.19`)) throw Error(`Home does not use updated ${course} image`);
}
const pages=[...fs.readdirSync(root).filter(n=>n.endsWith('.html')).map(n=>n),...fs.readdirSync(path.join(root,'courses')).filter(n=>n.endsWith('.html')).map(n=>'courses/'+n)];
for(const page of pages){
 const html=read(page);
 if((html.match(/course-branding-v19\.css/g)||[]).length!==1) throw Error(`Missing or duplicate branding stylesheet on ${page}`);
 const srcs=[...html.matchAll(/(?:\.\.\/)?assets\/icon-(intro|excel|sql|powerbi|ai)\.svg(\?v=[^"']+)?/g)];
 if(srcs.some(m=>m[2]!=='?v=20261022.19')) throw Error(`Old logo asset on ${page}`);
}
for(const course of ['introduction','ai']){
 const html=read(`courses/${course}.html`);
 if((html.match(/class="course-identity-mark"/g)||[]).length!==1) throw Error(`Missing course hero identity ${course}`);
}
for(const course of ['excel','sql','powerbi']){
 const html=read(`courses/${course}.html`);
 if((html.match(new RegExp(`icon-${course}\\.svg\\?v=20261022\\.19`,'g'))||[]).length!==1) throw Error(`Repeated product logo ${course}`);
}
console.log(`PASS v19 course identity: five distinct local course marks, no duplicate course-header marks, all ${pages.length} pages versioned`);
