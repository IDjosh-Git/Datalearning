/* Account-owned conversation transcript; authenticated via the existing secure session cookie. */
import {AUTH_URL,PUBLIC_KEY,readServerToken,verifyAccount} from '../lib/server-auth.js';
const headers=token=>({apikey:PUBLIC_KEY,Authorization:`Bearer ${token}`,'Content-Type':'application/json','Cache-Control':'no-store'});
function reply(res,code,payload){res.statusCode=code;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');res.end(JSON.stringify(payload))}
export default async function handler(req,res){
 if(!['GET','PUT','DELETE'].includes(req.method))return reply(res,405,{error:'Method not allowed'});
 if(req.method!=='GET'){
  const origin=req.headers.origin,host=req.headers.host;
  try{const u=new URL(origin);if(u.host!==host||!['https:','http:'].includes(u.protocol)||(u.protocol==='http:'&&!['localhost','127.0.0.1'].includes(u.hostname)))return reply(res,403,{error:'Origin not allowed'})}catch{return reply(res,403,{error:'Origin required'})}
 }
 const token=readServerToken(req.headers.cookie||'');const account=await verifyAccount(token);
 if(!account.ok)return reply(res,account.status===503?503:401,{error:'Sign-in required'});
 const url=AUTH_URL+'/rest/v1/ai_conversation_history?user_id=eq.'+encodeURIComponent(account.userId);
 try{
  if(req.method==='GET'){
   const r=await fetch(url+'&select=messages,updated_at',{headers:headers(token),cache:'no-store'});
   if(!r.ok)return reply(res,503,{error:'Conversation history is unavailable. Apply the database migration.'});
   const rows=await r.json();return reply(res,200,{messages:rows[0]?.messages||[]});
  }
  if(req.method==='DELETE'){
   const r=await fetch(url,{method:'DELETE',headers:headers(token)});
   return reply(res,r.ok?200:503,r.ok?{messages:[]}:{error:'Could not clear history'});
  }
  const raw=typeof req.body==='string'?req.body:JSON.stringify(req.body||{});
  if(Buffer.byteLength(raw)>100000)return reply(res,413,{error:'History too large'});
  let data;try{data=JSON.parse(raw)}catch{return reply(res,400,{error:'Invalid JSON'})}
  const messages=data?.messages;
  if(!Array.isArray(messages)||messages.length>40||messages.some(m=>!m||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>5000))return reply(res,400,{error:'Invalid history'});
  const r=await fetch(AUTH_URL+'/rest/v1/ai_conversation_history?on_conflict=user_id',{method:'POST',headers:{...headers(token),Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({user_id:account.userId,messages})});
  return reply(res,r.ok?200:503,r.ok?{saved:true}:{error:'Could not save history'});
 }catch{return reply(res,503,{error:'History service temporarily unavailable'})}
}
