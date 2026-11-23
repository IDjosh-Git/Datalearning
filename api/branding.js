import {AUTH_URL,readServerToken,verifyAccount,verifyAdmin} from '../lib/server-auth.js';
const DEFAULT={name:'DataLearning',primary:'#123B4A',secondary:'#183047',accent:'#B66B42',background:'#F8FAFC',logo:null,version:0};
const hex=v=>typeof v==='string'&&/^#[0-9a-fA-F]{6}$/.test(v);
const luminance=hex=>{const x=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*x[0]+.7152*x[1]+.0722*x[2]};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const reply=(res,status,obj)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(obj))};
const key=()=>process.env.SUPABASE_SERVICE_ROLE_KEY;
const db=async(method,body)=>{const k=key();if(!k)throw Error('Branding database is not configured');const r=await fetch(AUTH_URL+'/rest/v1/app_branding?id=eq.1'+(method==='GET'?'&select=*':''),{method,headers:{apikey:k,Authorization:'Bearer '+k,'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,cache:'no-store',signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('Branding database unavailable ('+r.status+')');return r.json()};
const clean=x=>({name:x.name,primary:x.primary,secondary:x.secondary,accent:x.accent,background:x.background,logo:x.logo||null,version:x.version||0});
const originOk=req=>{try{const u=new URL(req.headers.origin);return u.host===req.headers.host&&(u.protocol==='https:'||u.hostname==='localhost'||u.hostname==='127.0.0.1')}catch{return false}};
export default async function handler(req,res){
 if(req.method==='GET'){
  try{const rows=await db('GET');return reply(res,200,{...DEFAULT,...(rows[0]?clean(rows[0]):{}),configured:true})}
  catch{return reply(res,503,{error:'Published branding is temporarily unavailable',defaults:DEFAULT})}
 }
 if(req.method!=='POST')return reply(res,405,{error:'Method not allowed'});
 if(!originOk(req))return reply(res,403,{error:'Invalid request origin'});
 const token=readServerToken(req.headers.cookie||'');const auth=await verifyAccount(token);
 if(!auth.ok)return reply(res,auth.status||401,{error:'Sign in required'});
 const admin=await verifyAdmin(token,auth.userId);if(!admin.ok)return reply(res,admin.status||403,{error:'Administrator permission required'});
 const data=req.body||{};
 if(data.reset===true){try{const rows=await db('PATCH',{...DEFAULT,version:Date.now()});return reply(res,200,clean(rows[0]||DEFAULT))}catch{return reply(res,503,{error:'Unable to save branding; check database setup'})}}
 const name=String(data.name||'').trim();if(name.length<2||name.length>48||/[<>\x00-\x1f]/.test(name))return reply(res,400,{error:'Name must contain 2–48 safe characters'});
 for(const k of ['primary','secondary','accent','background'])if(!hex(data[k]))return reply(res,400,{error:'Invalid '+k+' colour'});
 if(contrast(data.primary,'#FFFFFF')<4.5||contrast(data.secondary,'#FFFFFF')<4.5)return reply(res,400,{error:'Primary and secondary colours must meet 4.5:1 contrast with white'});
 if(contrast(data.background,data.secondary)<4.5)return reply(res,400,{error:'Background and secondary text colours need 4.5:1 contrast'});
 const logo=data.logo===null?null:String(data.logo||'');
 if(logo&&!/^data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(logo))return reply(res,400,{error:'Logo must be PNG, JPEG or WebP'});
 if(logo.length>190000)return reply(res,413,{error:'Logo exceeds 140 KB; resize it before uploading'});
 try{const rows=await db('PATCH',{name,primary:data.primary,secondary:data.secondary,accent:data.accent,background:data.background,logo,version:Date.now()});if(!rows.length)throw Error('Missing row');return reply(res,200,clean(rows[0]))}catch{return reply(res,503,{error:'Unable to publish branding. Apply database migration and configure server key.'})}
}
