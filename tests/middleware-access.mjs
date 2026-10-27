import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const base=new URL('../',import.meta.url);
let source=await fs.readFile(new URL('../middleware.js',import.meta.url),'utf8');
const modPath=new URL('../lib/server-auth.js',import.meta.url).href;
source=source.replace("import { next } from '@vercel/functions';", "const next=({headers}={}) => new Response(null,{status:204,headers:{...headers,'x-middleware-next':'true'}});")
 .replace("from './lib/server-auth.js'","from '"+modPath+"'");
const {default:middleware,config}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const {sessionCookie}=await import('../lib/server-auth.js');
const userId='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
const token='part.signature.token';
const originalFetch=global.fetch;
function mock(admin,unavailable=false,invalid=false){return async url=>{
 if(unavailable)throw Error('Network offline');
 if(String(url).includes('/auth/v1/user'))return new Response(JSON.stringify(invalid?{error:'Invalid JWT'}:{id:userId,is_anonymous:false}),{status:invalid?401:200});
 if(String(url).includes('/site_admins'))return new Response(JSON.stringify(admin?[{user_id:userId}]:[]),{status:200});
 throw Error('Unexpected remote call: '+url);
}}
function req(path,cookie=''){return new Request('https://learning.example'+path,{headers:cookie?{cookie}:undefined})}
try{
 const routes=['/admin.html','/progress.html','/reviewer.html','/sync-test.html','/connection-test.html'];
 for(const route of routes)assert.ok(config.matcher.includes(route));
 let r=await middleware(req('/admin.html?view=learners'));assert.equal(r.status,302);assert.equal(new URL(r.headers.get('location')).pathname,'/auth.html');assert.ok(r.headers.get('location').includes('return='));
 r=await middleware(req('/assets/admin-dashboard.js'));assert.equal(r.status,403);
 r=await middleware(req('/OWNER_SETUP.sql'));assert.equal(r.status,404);
 global.fetch=mock(false);
 r=await middleware(req('/admin.html',sessionCookie(token,300)));assert.equal(r.status,403);assert.equal(await r.text(),'This area is for administrators.');
 r=await middleware(req('/assets/admin-dashboard.js',sessionCookie(token,300)));assert.equal(r.status,403);
 global.fetch=mock(true);
 r=await middleware(req('/admin.html',sessionCookie(token,300)));assert.equal(r.status,204);assert.equal(r.headers.get('x-middleware-next'),'true');assert.match(r.headers.get('Cache-Control'),/no-store/);
 r=await middleware(req('/progress.html',sessionCookie(token,300)));assert.equal(r.status,204);
 r=await middleware(req('/assets/reviewer.js',sessionCookie(token,300)));assert.equal(r.status,204);
 global.fetch=mock(true,true);
 r=await middleware(req('/admin.html',sessionCookie(token,300)));assert.equal(r.status,503);
 global.fetch=mock(true,false,true);
 r=await middleware(req('/admin.html',sessionCookie(token,300)));assert.equal(r.status,302);
}finally{global.fetch=originalFetch}
console.log('Server middleware: guest redirected, learner blocked, admin allowed, assets gated, outage fails closed.');
