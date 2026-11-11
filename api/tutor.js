/* Data Learning Path tutor. Only this serverless function sees AI credentials. */
import { instructionFor, allowedTopics, resourcesFor } from '../lib/tutor-context.js';
import {appContextFor, appResourceFor} from '../lib/tutor-app-knowledge.js';
import {readServerToken, verifyAccount} from '../lib/server-auth.js';

const buckets = new Map();
const MINUTE_MS=60_000, DAY_MS=86_400_000;
const MAX_QUESTION=2000, MAX_HISTORY_ITEMS=6, MAX_HISTORY_CHARS=900, MAX_BODY_BYTES=14_000;
const LIMIT_MINUTE=8, LIMIT_DAY=75;

function reply(res,code,payload,extra={}){
 res.statusCode=code;
 for(const [k,v] of Object.entries({'Content-Type':'application/json; charset=utf-8','Cache-Control':'private, no-store, max-age=0','X-Content-Type-Options':'nosniff','Vary':'Cookie, Origin',...extra}))res.setHeader(k,v);
 res.end(JSON.stringify(payload));
}
function provider(){
 const choice=(process.env.TUTOR_PROVIDER||'').toLowerCase();
 // Never silently switch an existing OpenAI installation when both keys are present.
 const name=choice?(['groq','openai'].includes(choice)?choice:'invalid'):(process.env.OPENAI_API_KEY?'openai':'groq');
 const model=name==='groq'?(process.env.GROQ_MODEL||'openai/gpt-oss-20b'):(process.env.OPENAI_MODEL||'gpt-4.1-mini');
 const key=name==='groq'?process.env.GROQ_API_KEY:process.env.OPENAI_API_KEY;
 return {name,model,configured:Boolean(key),key};
}
function validOrigin(req){
 const origin=req.headers?.origin,host=req.headers?.host;
 if(!origin||!host)return false;
 try{const url=new URL(origin);return url.host===host&&(url.protocol==='https:'||url.hostname==='localhost'||url.hostname==='127.0.0.1');}catch{return false}
}
function parsePayload(req){
 if(Number(req.headers?.['content-length']||0)>MAX_BODY_BYTES)return null;
 try{const raw=typeof req.body==='string'?req.body:JSON.stringify(req.body??{});if(Buffer.byteLength(raw,'utf8')>MAX_BODY_BYTES)return null;const obj=JSON.parse(raw);return obj&&!Array.isArray(obj)&&typeof obj==='object'?obj:null;}catch{return null;}
}
function cleanHistory(raw){
 if(raw!==undefined&&!Array.isArray(raw))return null;
 if((raw||[]).length>MAX_HISTORY_ITEMS)return null;
 if((raw||[]).some(m=>!m||typeof m!=='object'||!['user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>MAX_HISTORY_CHARS))return null;
 return (raw||[]).map(m=>({role:m.role,content:m.content.trim()})).filter(m=>m.content);
}
function allow(userId){
 const now=Date.now();let entries=(buckets.get(userId)||[]).filter(t=>now-t<DAY_MS);
 if(entries.length>=LIMIT_DAY||entries.filter(t=>now-t<MINUTE_MS).length>=LIMIT_MINUTE)return false;
 entries.push(now);buckets.set(userId,entries);
 if(buckets.size>1500){for(const [id,ts] of buckets){if(!ts.length||now-ts.at(-1)>DAY_MS)buckets.delete(id)} if(buckets.size>1500)buckets.clear()}
 return true;
}
async function requestModel(config,question,history,topic){
 const headers={'Content-Type':'application/json','Authorization':`Bearer ${config.key}`};
 const instructions=instructionFor(topic)+appContextFor(question,topic);
 const input=[...history,{role:'user',content:question}];
 const groq=config.name==='groq';
 const url=groq?'https://api.groq.com/openai/v1/chat/completions':'https://api.openai.com/v1/responses';
 const payload=groq?
  {model:config.model,messages:[{role:'system',content:instructions},...input],max_completion_tokens:1200}:
  {model:config.model,instructions,input,max_output_tokens:1000,store:false};
 const response=await fetch(url,{method:'POST',headers,body:JSON.stringify(payload),signal:AbortSignal.timeout(25000)});
 if(!response.ok){
  if(response.status===429){const err=new Error('PROVIDER_RATE_LIMIT');err.kind='rate_limit';throw err}
  if([401,403,404].includes(response.status)){const err=new Error('PROVIDER_SETUP');err.kind='setup';throw err}
  const err=new Error('PROVIDER_UNAVAILABLE');err.kind='provider';throw err;
 }
 const data=await response.json().catch(()=>null);
 const answer=groq?data?.choices?.[0]?.message?.content:(data?.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n');
 if(typeof answer!=='string'||!answer.trim()){const err=new Error('EMPTY_ANSWER');err.kind='empty';throw err}
 return answer.trim().slice(0,10000);
}
export default async function handler(req,res){
 const config=provider();
 if(req.method==='GET')return reply(res,200,{aiEnabled:config.configured,mode:config.configured?'live':'reference',provider:config.name,model:config.configured?config.model:null,requiresSignIn:true,privacy:config.name==='groq'?'Questions sent to Groq when live AI is used.':'Questions sent to OpenAI when live AI is used.'});
 if(req.method!=='POST')return reply(res,405,{error:'Method not allowed.',code:'method_not_allowed'},{Allow:'GET, POST'});
 if(!validOrigin(req))return reply(res,403,{error:'This request was not permitted.',code:'origin'});
 if(!config.configured)return reply(res,503,{error:'Live AI is not configured. You can still use the offline tutor and reference library.',code:'not_configured'});
 const token=readServerToken(req.headers.cookie||'');
 const verified=await verifyAccount(token);
 if(!verified.ok)return reply(res,verified.status===503?503:401,{error:verified.status===503?'Sign-in verification is temporarily unavailable. Try again.':'Please sign in again to use live AI.',code:verified.status===503?'auth_unavailable':'not_authenticated'});
 const body=parsePayload(req);if(!body)return reply(res,413,{error:'The request is too large or invalid.',code:'invalid_body'});
 const question=body.question;
 if(typeof question!=='string'||!question.trim()||question.length>MAX_QUESTION)return reply(res,400,{error:'Enter a question of up to 2,000 characters.',code:'invalid_question'});
 const history=cleanHistory(body.history);
 if(!history)return reply(res,400,{error:'Conversation context is too long. Start a new conversation and try again.',code:'invalid_history'});
 const topic=allowedTopics.includes(body.topic)?body.topic:'general';
 if(!allow(verified.userId))return reply(res,429,{error:'Tutor request limit reached. Try again later or use the offline guide.',code:'app_limit'},{'Retry-After':'60'});
 try{
  const answer=await requestModel(config,question.trim(),history,topic);
  const appResource=appResourceFor(question,topic);
  const resources=[...resourcesFor(topic).map(x=>({title:x.title,href:x.href}))];
  if(appResource&&!resources.some(x=>x.href===appResource.href))resources.push(appResource);
  return reply(res,200,{answer,provider:config.name,model:config.model,topic,resources,disclaimer:'AI assistance is not a course grade or capstone review.'});
 }catch(e){
  if(e?.kind==='rate_limit')return reply(res,429,{error:'The AI provider has reached its current usage limit. Try later or switch to the offline guide.',code:'provider_limit'},{'Retry-After':'60'});
  if(e?.kind==='setup')return reply(res,503,{error:'The AI provider configuration needs attention. Please use the offline guide for now.',code:'provider_setup'});
  if(e?.kind==='empty')return reply(res,502,{error:'The AI did not return a readable answer. Try again.',code:'empty_response'});
  if(e?.name==='TimeoutError'||e?.name==='AbortError')return reply(res,504,{error:'The AI request timed out. Your draft is still available; please try again.',code:'timeout'});
  return reply(res,502,{error:'The AI service is temporarily unavailable. Your draft is still available.',code:'provider_unavailable'});
 }
}
