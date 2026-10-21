import { tutorInstructions } from '../lib/tutor-context.js';
const attempts=new Map();
function json(res,code,obj){res.statusCode=code;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(obj));}
export default async function handler(req,res){
 if(req.method==='GET')return json(res,200,{aiEnabled:Boolean(process.env.OPENAI_API_KEY),mode:process.env.OPENAI_API_KEY?'live':'reference'});
 if(req.method!=='POST')return json(res,405,{error:'Method not allowed'});
 if(!process.env.OPENAI_API_KEY)return json(res,503,{error:'Live AI is not configured. Use the built-in reference guide or ask the site owner to configure OPENAI_API_KEY in Vercel.'});
 const origin=req.headers.origin,host=req.headers.host;
 if(origin&&host){try{if(new URL(origin).host!==host)return json(res,403,{error:'Cross-site requests are not allowed.'});}catch{return json(res,403,{error:'Invalid origin.'})}}
 const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].slice(0,72);let bucket=attempts.get(ip)||[];const now=Date.now();bucket=bucket.filter(n=>now-n<10*60*1000);if(bucket.length>=12)return json(res,429,{error:'Question limit reached for now. Please try again later.'});bucket.push(now);attempts.set(ip,bucket);if(attempts.size>1500)attempts.clear();
 let body=req.body;try{if(typeof body==='string')body=JSON.parse(body);if(!body||typeof body!=='object')throw Error('bad body')}catch{return json(res,400,{error:'Send a JSON question.'})}
 const question=body.question;if(typeof question!=='string'||!question.trim()||question.length>2000)return json(res,400,{error:'Enter a question of up to 2,000 characters.'});
 const prior=Array.isArray(body.history)?body.history.slice(-8):[];const history=prior.filter(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string').map(m=>({role:m.role,content:m.content.slice(0,1200)}));
 const input=[...history,{role:'user',content:question.trim()}];
 try{
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',instructions:tutorInstructions,input,max_output_tokens:650,store:false}),signal:AbortSignal.timeout(25000)});
  const data=await response.json().catch(()=>({}));if(!response.ok)return json(res,502,{error:response.status===429?'AI request limit reached. Try again shortly.':'Live AI request failed. Check the configured API key, model, and API billing.'});
  const answer=(data.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n').trim();if(!answer)return json(res,502,{error:'The AI returned no readable answer. Please try again.'});return json(res,200,{answer:answer.slice(0,8500)});
 }catch(e){return json(res,502,{error:'The live AI service could not be reached. Try again or use reference mode.'})}
}
