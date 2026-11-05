import assert from 'node:assert/strict';
import fs from 'node:fs';
import handler from '../api/tutor.js';
const base=process.cwd();
const html=fs.readFileSync(base+'/tutor.html','utf8');
const client=fs.readFileSync(base+'/assets/scripts/tutor-ai.js','utf8');
const css=fs.readFileSync(base+'/assets/styles/tutor.css','utf8');
assert(html.includes('tutorModeOffline')&&html.includes('tutorModeAi')&&html.includes('tutorTopic')&&html.includes('tutorPrivacy'));
assert(html.includes('tutor-ai.js')&&html.includes('assets/styles/tutor.css'));
assert(client.includes('stopImmediatePropagation')&&client.includes('AbortController')&&client.includes('document.createTextNode'));
assert(!client.includes('.innerHTML=')&&!client.includes('GROQ_API_KEY')&&!client.includes('OPENAI_API_KEY'));
assert(css.includes('--background')&&css.includes('--focus-ring')&&css.includes('prefers-reduced-motion'));
const env={...process.env}, savedFetch=globalThis.fetch;
const uid='11111111-1111-4111-8111-111111111111';
const req=(body,opts={})=>({method:opts.method||'POST',body,headers:{host:'example.vercel.app',origin:'https://example.vercel.app',cookie:'__Host-dalp_session=example-for-tests',...opts.headers}});
const invoke=async(request)=>new Promise((resolve,reject)=>{let statusCode=200,headers={};Promise.resolve(handler(request,{set statusCode(x){statusCode=x},get statusCode(){return statusCode},setHeader(k,v){headers[k.toLowerCase()]=v},end(s){resolve({statusCode,headers,body:JSON.parse(s)})}})).catch(reject)});
let providerCalls=0, providerPayload=null,providerUrl='';
const goodFetch=async(url,opts)=>{
 if(String(url).includes('/auth/v1/user'))return {ok:true,status:200,json:async()=>({id:uid})};
 providerCalls++;providerUrl=String(url);providerPayload=JSON.parse(opts.body);
 return {ok:true,status:200,json:async()=>({choices:[{message:{content:'**SUMIFS** uses multiple criteria.\n```excel\n=SUMIFS(C:C,A:A,"East")\n```'}}]})};
};
try{
 delete process.env.OPENAI_API_KEY;delete process.env.GROQ_API_KEY;delete process.env.TUTOR_PROVIDER;
 let result=await invoke(req(null,{method:'GET'}));assert.equal(result.body.aiEnabled,false);assert.equal(result.body.provider,'groq');
 result=await invoke(req({question:'SUMIFS'}));assert.equal(result.statusCode,503);assert.equal(result.body.code,'not_configured');
 process.env.GROQ_API_KEY='mock-secret-should-never-appear';
 globalThis.fetch=goodFetch;
 result=await invoke(req(null,{method:'GET'}));assert.equal(result.body.aiEnabled,true);assert.equal(result.body.model,'openai/gpt-oss-20b');assert(!JSON.stringify(result).includes('mock-secret'));
 result=await invoke(req({question:' Explain SUMIFS ',topic:'excel',history:[{role:'user',content:'A simple example'}]}));assert.equal(result.statusCode,200);assert.match(result.body.answer,/SUMIFS/);assert.equal(result.body.provider,'groq');assert.deepEqual(result.body.resources[0],{title:'Excel learning path',href:'/courses/excel.html'});assert.equal(providerPayload.messages.at(-1).content,'Explain SUMIFS');assert.match(providerPayload.messages[0].content,/SQL/);assert.match(providerUrl,/api\.groq\.com/);
 const initialCalls=providerCalls;
 result=await invoke(req({question:'   '}));assert.equal(result.statusCode,400);assert.equal(providerCalls,initialCalls);
 result=await invoke(req({question:'x'.repeat(2001)}));assert.equal(result.statusCode,400);
 result=await invoke(req({question:'hello',history:'invalid'}));assert.equal(result.statusCode,400);
 result=await invoke(req({question:'hello',history:[{role:'user',content:'x'.repeat(901)}]}));assert.equal(result.statusCode,400);
 result=await invoke(req({question:'hello'},{headers:{origin:'https://not-site.example'}}));assert.equal(result.statusCode,403);
 result=await invoke(req({question:'hello'},{headers:{cookie:''}}));assert.equal(result.statusCode,401);
 result=await invoke(req({question:'hello'},{headers:{'content-length':'20000'}}));assert.equal(result.statusCode,413);
 // Provider failures and retry affordances.
 for(const [code,expectedStatus,expectedCode] of [[429,429,'provider_limit'],[401,503,'provider_setup'],[500,502,'provider_unavailable']]){
  globalThis.fetch=async(url,opts)=>String(url).includes('/auth/v1/user')?{ok:true,status:200,json:async()=>({id:uid})}:{ok:false,status:code,json:async()=>({error:{message:'mock-secret-should-never-appear'}})};
  result=await invoke(req({question:'Check result'}));assert.equal(result.statusCode,expectedStatus);assert.equal(result.body.code,expectedCode);assert(!JSON.stringify(result).includes('mock-secret'));
 }
 // Simulated timeout, not a real upstream API invocation.
 globalThis.fetch=async(url)=>{if(String(url).includes('/auth/v1/user'))return {ok:true,status:200,json:async()=>({id:uid})};throw Object.assign(new Error('timeout'),{name:'TimeoutError'})};
 result=await invoke(req({question:'Query fails'}));assert.equal(result.statusCode,504);assert.equal(result.body.code,'timeout');
 // Repeated requests hit in-memory defence in a single instance (not a distributed/global guarantee).
 globalThis.fetch=goodFetch;
 for(let i=0;i<5;i++)result=await invoke(req({question:'Repeat '+i}));
 assert.equal(result.statusCode,429);assert.equal(result.body.code,'app_limit');
 // Verify OpenAI remains configurable without exposing provider keys.
 process.env.TUTOR_PROVIDER='openai';process.env.OPENAI_API_KEY='test-openai-secret';
 globalThis.fetch=async(url,opts)=>String(url).includes('/auth/v1/user')?{ok:true,status:200,json:async()=>({id:'22222222-2222-4222-8222-222222222222'})}:{ok:true,status:200,json:async()=>({output:[{content:[{type:'output_text',text:'SQL example'}]}]})};
 result=await invoke(req({question:'Explain SQL'}));assert.equal(result.statusCode,200);assert.equal(result.body.provider,'openai');
 console.log('PASS Tutor Studio v87: source, provider selection, sanitisation, account authentication, limits, missing setup, Groq/OpenAI mocks, errors, timeouts, no credential leaks');
}finally{globalThis.fetch=savedFetch;for(const key of ['GROQ_API_KEY','OPENAI_API_KEY','TUTOR_PROVIDER'])if(env[key]===undefined)delete process.env[key];else process.env[key]=env[key]}
