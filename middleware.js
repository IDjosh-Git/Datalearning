/* Server-side protection for hosted administrator HTML and supporting scripts. */
import { next } from '@vercel/functions';
import { restrictedKind, readServerToken, verifyAccount, verifyAdmin, PRIVATE_HEADERS } from './lib/server-auth.js';

export const config = {
 matcher: [
  '/admin.html','/admin','/progress.html','/progress','/reviewer.html','/reviewer',
  '/connection-test.html','/connection-test','/sync-test.html','/sync-test',
  '/assets/admin-dashboard.js','/assets/admin-console.js','/assets/progress-admin.js','/assets/reviewer.js',
  '/assets/admin-dashboard.css','/assets/admin-console.css','/assets/progress-admin.css','/assets/reviewer.css',
  '/OWNER_SETUP.sql','/ADMIN_LEARNER_MIGRATION.sql','/supabase_setup.sql',
  '/AI_COURSE_DATABASE_MIGRATION.sql','/SUPABASE_SETUP.txt','/tests/:path*','/lib/:path*'
 ]
};
function fail(status,message){return new Response(message,{status,headers:{...PRIVATE_HEADERS,'Content-Type':'text/plain; charset=utf-8'}})}
export default async function middleware(request){
 const url=new URL(request.url);
 const kind=restrictedKind(url.pathname);
 if(!kind)return next();
 if(kind==='deny')return fail(404,'Not found');
 const token=readServerToken(request.headers.get('cookie'));
 if(!token){
  if(kind==='adminAsset')return fail(403,'Access denied');
  const login=new URL('/auth.html',url);
  login.searchParams.set('return',url.pathname+url.search+url.hash);
  return Response.redirect(login,302);
 }
 const user=await verifyAccount(token);
 if(!user.ok)return user.status===401?(kind==='adminPage'?Response.redirect(new URL('/auth.html?return='+encodeURIComponent(url.pathname+url.search),url),302):fail(403,'Access denied')):fail(503,'Unable to verify access. Please try again.');
 const admin=await verifyAdmin(token,user.userId);
 if(!admin.ok)return fail(admin.status===503?503:403,admin.status===503?'Unable to verify access. Please try again.':'This area is for administrators.');
 return next({headers:PRIVATE_HEADERS});
}
