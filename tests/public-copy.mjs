import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const files=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else if(item.name.endsWith('.html'))files.push(p)}}
walk(root);
const vendor=/\b(supabase|vercel|netlify|firebase|cloudflare)\b/i;
const oldLabels=/\b(cloud sync|cloud progress|database configuration|run the updated sql setup|service role key)\b/i;
for(const file of files){
 const source=fs.readFileSync(file,'utf8');
 const userText=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<!--[^]*?-->/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 assert.doesNotMatch(userText,vendor,`${path.relative(root,file)} exposes a technical service name`);
 assert.doesNotMatch(userText,oldLabels,`${path.relative(root,file)} exposes an outdated technical phrase`);
}
for(const [file,expected] of [
 ['assets/auth-flow.js','We can’t open sign-in right now'],
 ['assets/course-sync.js','Progress saved'],
 ['assets/admin-dashboard.js','We couldn’t load your dashboard'],
 ['assets/reviewer.js','We couldn’t confirm your instructor access'],
 ['assets/capstone.js','Project submissions are temporarily unavailable'],
 ['assets/progress-admin.js','Progress reports are temporarily unavailable']
]) assert.ok(fs.readFileSync(path.join(root,file),'utf8').includes(expected),file+' missing friendly feedback');
assert.doesNotMatch(fs.readFileSync(path.join(root,'README.md'),'utf8'),vendor);
console.log(`PASS public-facing copy: ${files.length} HTML pages and key status messages use learner-friendly wording`);
