/* Exchange an existing verified login access token for a first-party HttpOnly session cookie. */
import {verifyAccount,tokenSecondsLeft,sessionCookie,clearSessionCookies} from '../../lib/server-auth.js';
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
 if(!['POST','DELETE'].includes(req.method))return reply(res,405,{error:'Method not allowed'},{Allow:'POST, DELETE'});
 if(!sameOrigin(req))return reply(res,403,{error:'Request not permitted'});
 if(req.method==='DELETE'){
  res.setHeader('Set-Cookie',clearSessionCookies());
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
 const secure=!/^localhost(?::\d+)?$|^127\.0\.0\.1(?::\d+)?$/.test(req.headers.host||'');
 res.setHeader('Set-Cookie',sessionCookie(token,ttl,secure));
 return reply(res,200,{ok:true});
}
