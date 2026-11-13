import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
let src=await fs.readFile(new URL('../middleware.js',import.meta.url),'utf8');
const modPath=pathToFileURL(new URL('../lib/server-auth.js',import.meta.url).pathname).href;
src=src.replace("import { next } from '@vercel/functions';","const next=({headers}={})=>new Response(null,{status:204,headers:{...headers,'x-middleware-next':'true'}});").replace("from './lib/server-auth.js'","from '"+modPath+"'");
const {default:middleware,config}=await import('data:text/javascript;base64,'+Buffer.from(src).toString('base64'));
const {sessionCookie}=await import('../lib/server-auth.js');
const id='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
const originalFetch=global.fetch;
const token=label=>{const payload=Buffer.from(JSON.stringify({exp:Math.floor(Date.now()/1000)+3600,jti:label})).toString('base64url');return 'x.'+payload+'.'+('z'.repeat(64))};
const req=(route,cookie='')=>new Request('https://learning.example'+route,{headers:cookie?{cookie}:undefined});
const mock=(admin=false,unavailable=false,invalid=false,anonymous=false)=>async url=>{
 if(unavailable)throw new Error('Network offline');
 if(String(url).includes('/auth/v1/user'))return new Response(JSON.stringify(invalid?{error:'Invalid JWT'}:{id,is_anonymous:anonymous}),{status:invalid?401:200});
 if(String(url).includes('/site_admins'))return new Response(JSON.stringify(admin?[{user_id:id}]:[]),{status:200});
 throw new Error('Unexpected '+url);
};
try{
 assert(config.matcher.includes('/:path*'),'Middleware must cover all app paths');
 for(const route of ['/index.html','/catalog.html','/courses/excel.html','/practice.html','/tutor.html','/preview.html','/verify.html','/dashboard']){
  const r=await middleware(req(route));assert.equal(r.status,302,route);const url=new URL(r.headers.get('location'));assert.equal(url.pathname,'/auth.html');
 }
 for(const route of ['/assets/scripts/academy-app.js','/assets/styles/practice.css','/downloads/learning_sales_2026.csv','/assets/images/lesson-interfaces/excel-week-1.png'])assert.equal((await middleware(req(route))).status,403,route);
 for(const route of ['/','/start-here','/courses','/courses/excel','/public-course-guide.css','/auth.html','/auth','/assets/scripts/auth-flow.js','/assets/styles/auth-entry-premium.css','/assets/icons/da-logo.svg','/api/auth/session'])assert.equal((await middleware(req(route))).status,204,route);
 assert.equal((await middleware(req('/api/tutor'))).status,401);
 assert.equal((await middleware(req('/lib/server-auth.js'))).status,404);
 global.fetch=mock(false);
 let cookie=sessionCookie(token('learner'),300);
 for(const route of ['/index.html','/courses/python.html','/assets/scripts/academy-app.js','/practice.html','/api/tutor']){
  const r=await middleware(req(route,cookie));assert.equal(r.status,204,route);assert.match(r.headers.get('cache-control'),/no-store/);
 }
 for(const route of ['/admin.html','/assets/scripts/admin-dashboard.js'])assert.equal((await middleware(req(route,cookie))).status,403,route);
 global.fetch=mock(true);
 cookie=sessionCookie(token('admin'),300);
 for(const route of ['/admin.html','/progress.html','/assets/scripts/admin-dashboard.js'])assert.equal((await middleware(req(route,cookie))).status,204,route);
 global.fetch=mock(false,true);
 assert.equal((await middleware(req('/index.html',sessionCookie(token('offline'),300)))).status,503);
 global.fetch=mock(false,false,true);
 assert.equal((await middleware(req('/catalog.html',sessionCookie(token('invalid'),300)))).status,302);
 global.fetch=mock(false,false,false,true);
 assert.equal((await middleware(req('/catalog.html',sessionCookie(token('anon'),300)))).status,302);
 // Signed-in visitors renew their server session without a second login.
 const expired='x.'+Buffer.from(JSON.stringify({exp:Math.floor(Date.now()/1000)-10})).toString('base64url')+'.'+('z'.repeat(64));
 const renewable=sessionCookie(expired,300)+'; __Host-dalp_refresh=valid-refresh-token';
 const renewed=await middleware(req('/account.html?tab=courses',renewable));
 assert.equal(renewed.status,303);
 const renewalUrl=new URL(renewed.headers.get('location'));
 assert.equal(renewalUrl.pathname,'/api/auth/session');
 assert.equal(renewalUrl.searchParams.get('continue'),'/account.html?tab=courses');
 assert.equal((await middleware(req('/assets/scripts/academy-app.js',renewable))).status,403,'assets remain private until renewal');
}finally{global.fetch=originalFetch}
console.log('PASS app-wide server gate: homepage, courses, API and assets protected; login public; admin role isolated; fail-closed');
