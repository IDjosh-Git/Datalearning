import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
const root=process.cwd();const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.html')?[path.join(d,e.name)]:[]);
const pages=[...fs.readdirSync(root).filter(x=>x.endsWith('.html')),...walk('courses'),...walk('public-pages'),...walk('course-info')];
for(const f of pages){const html=fs.readFileSync(f,'utf8');if(!html.includes('</head>')||!html.includes('premium-color-system.css')&&!f.includes('public-pages')&&!f.includes('course-info'))continue;assert(html.includes('brand-runtime.js'),`${f} missing brand runtime`);assert(html.includes('brand-runtime.css'),`${f} missing brand styles`)}
const admin=fs.readFileSync('admin.html','utf8');for(const id of ['brandSettingsForm','brandReset','brand-logo','brand-name','brand-primary','brand-secondary','brand-accent','brand-background'])assert(admin.includes(id),`Admin setting missing ${id}`);
const api=fs.readFileSync('api/branding.js','utf8');for(const term of ['verifyAccount','verifyAdmin','readServerToken','originOk','SUPABASE_SERVICE_ROLE_KEY'])assert(api.includes(term),`API missing ${term}`);
assert(fs.existsSync('database/BRANDING_MIGRATION.sql'));
console.log(`PASS branding coverage on ${pages.length} HTML pages, admin settings and server-side permissions`);
