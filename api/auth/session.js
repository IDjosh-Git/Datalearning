/* Exchange an existing verified login access token for a first-party HttpOnly session cookie. */
import {verifyAccount,tokenSecondsLeft,sessionCookie,clearSessionCookies,readServerToken,parseCookie,PUBLIC_KEY,AUTH_URL} from '../../lib/server-auth.js';
const REFRESH_COOKIE='__Host-dalp_refresh';
const LOCAL_REFRESH_COOKIE='dalp_refresh_local';
const cookieRefresh=req=>parseCookie(req.headers.cookie,REFRESH_COOKIE)||parseCookie(req.headers.cookie,LOCAL_REFRESH_COOKIE);
const refreshCookie=(token,secure)=> (secure?REFRESH_COOKIE:LOCAL_REFRESH_COOKIE)+'='+encodeURIComponent(token)+'; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800'+(secure?'; Secure':'');
const isSecure=req=>!/^localhost(?::\d+)?$|^127\.0\.0\.1(?::\d+)?$/.test(req.headers.host||'');
function reply(res,status,json,extra={}){
 res.statusCode=status;
 for(const [k,v] of Object.entries({'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Origin',...extra}))res.setHeader(k,v);
 res.end(JSON.stringify(json));
}
function sameOrigin(req){
 const origin=req.headers.origin,host=req.headers.host;
 if(!host||!origin)return false;
 try{const u=new URL(origin);return (u.protocol==='https:'||u.hostname==='localhost'||u.hostname==='127.0.0.1')&&u.host===host;}catch{return false}
}
export default async function handler(req,res){
 if(!['POST','GET','DELETE'].includes(req.method))return reply(res,405,{error:'Method not allowed'},{Allow:'GET, POST, DELETE'});
 if(req.method!=='GET'&&!sameOrigin(req))return reply(res,403,{error:'Request not permitted'});
 if(req.method==='GET'){
  const refresh=cookieRefresh(req); const token=readServerToken(req.headers.cookie||'');
  if(!refresh)return reply(res,401,{error:'No server session'});
  // Reuse a still-live access token; only refresh when it approaches expiration.
  if(tokenSecondsLeft(token)>120){const verified=await verifyAccount(token); if(verified.ok)return reply(res,200,{access_token:token,refresh_token:refresh});}
  try {
   const r=await fetch(AUTH_URL+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:PUBLIC_KEY,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:refresh}),signal:AbortSignal.timeout(7000),cache:'no-store'});
   const data=await r.json(); if(!r.ok||!data?.access_token||!data?.refresh_token)return reply(res,401,{error:'Session expired'});
   const verified=await verifyAccount(data.access_token);if(!verified.ok)return reply(res,401,{error:'Session invalid'});
   res.setHeader('Set-Cookie',[sessionCookie(data.access_token,Math.max(1,tokenSecondsLeft(data.access_token)),isSecure(req)),refreshCookie(data.refresh_token,isSecure(req))]);
   return reply(res,200,{access_token:data.access_token,refresh_token:data.refresh_token});
  }catch{return reply(res,503,{error:'Session restoration unavailable'});}
 }
 if(req.method==='DELETE'){
  res.setHeader('Set-Cookie',[...clearSessionCookies(),REFRESH_COOKIE+'=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0',LOCAL_REFRESH_COOKIE+'=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0']);
  return reply(res,200,{ok:true});
 }
 const auth=req.headers.authorization||'';
 if(!/^Bearer [A-Za-z0-9._-]{50,6000}$/.test(auth))return reply(res,401,{error:'Sign in to continue'});
 const token=auth.slice(7);
 const ttl=tokenSecondsLeft(token);
 if(ttl<1)return reply(res,401,{error:'Your session has expired. Please sign in again.'});
 let user;
 try { user=await verifyAccount(token); } catch { return reply(res,503,{error:'Session verification is temporarily unavailable. Please try again.'}); }
 if(!user.ok)return reply(res,user.status===503?503:401,{error:'Unable to verify your session. Please try again.'});
 const secure=isSecure(req);
 const refresh=String(req.body?.refresh_token||'');
 if(!refresh||refresh.length>6000)return reply(res,400,{error:'Refresh token required'});
 res.setHeader('Set-Cookie',[sessionCookie(token,ttl,secure),refreshCookie(refresh,secure)]);
 return reply(res,200,{ok:true});
}
