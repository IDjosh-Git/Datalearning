import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=import.meta.dirname;
const excluded=new Set(['dist','node_modules','.git','.vercel']);
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(excluded.has(entry.name)&&entry.isDirectory())continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.isFile())files.push(path.relative(root,full).replaceAll('\\','/'));}}
walk(root);
const groups=new Map();
for(const f of files){const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex');const list=groups.get(hash)||[];list.push(f);groups.set(hash,list);}
const duplicates=[...groups.values()].filter(g=>g.length>1).sort((a,b)=>b.length-a.length);
const ext={};for(const f of files){const e=path.extname(f)||'(none)';ext[e]=(ext[e]||0)+1;}
const report={generatedAt:new Date().toISOString(),scope:'source tree excluding generated dist and dependencies',totalFiles:files.length,extensions:ext,exactDuplicateGroups:duplicates.length,exactDuplicateFiles:duplicates.reduce((n,g)=>n+g.length-1,0),duplicatePaths:duplicates,policy:'Audit only: never remove a file based on matching hashes without checking runtime references and dynamic imports.'};
fs.mkdirSync(path.join(root,'docs','audits'),{recursive:true});
fs.writeFileSync(path.join(root,'docs','audits','SOURCE_DUPLICATES.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Audited ${files.length} source files; ${duplicates.length} exact duplicate groups (${report.exactDuplicateFiles} extra copies).`);
