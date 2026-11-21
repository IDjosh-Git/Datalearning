/* Admin-only, stateless assessment dry run. No database writes, no certificate issuance. */
import {readServerToken,verifyAccount,verifyAdmin} from '../lib/server-auth.js';
import {grade} from './assessment-grade.js';
const RULES={problem_and_objectives:25,data_preparation_and_quality:20,technical_execution:20,analysis_and_insights:20,communication_and_evidence:15};
function send(res,code,body){res.statusCode=code;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(body));}
function sameOrigin(req){try{const u=new URL(req.headers.origin);return u.host===req.headers.host&&(u.protocol==='https:'||u.hostname==='localhost')}catch{return false}}
export default async function handler(req,res){
 if(req.method!=='POST')return send(res,405,{error:'Method not allowed'});
 if(!sameOrigin(req))return send(res,403,{error:'Origin rejected'});
 const token=readServerToken(req.headers.cookie||'');const user=await verifyAccount(token);
 if(!user.ok)return send(res,user.status||401,{error:'Sign in required'});
 const admin=await verifyAdmin(token,user.userId);if(!admin.ok)return send(res,admin.status||403,{error:'Administrator access required'});
 const body=typeof req.body==='string'?(()=>{try{return JSON.parse(req.body)}catch{return {}}})():req.body||{};
 const course=String(body.course||'').trim().toLowerCase();
 const title=String(body.title||'').trim();const summary=String(body.summary||'').trim();const evidence=String(body.evidence||'');
 if(!['introduction','excel','sql','powerbi','tableau','powerquery','statistics','python','ai'].includes(course)||title.length<5||title.length>150||summary.length<20||summary.length>2000||evidence.length<80||evidence.length>20000)return send(res,400,{error:'Provide a valid course, title, summary (20–2000 characters) and synthetic evidence (80–20000 characters).'});
 const extension=String(body.extension||'').toLowerCase();
 if(!['csv','sql','py','json','txt','xlsx','pbix','pdf'].includes(extension))return send(res,400,{error:'Choose a supported evidence type.'});
 const simulated={testMode:true,persisted:false,certificateIssued:false,certificateId:null,course};
 if(!['csv','sql','py','json'].includes(extension))return send(res,200,{...simulated,status:'needs_manual_review',reason:'Unsupported or non-machine-readable technical evidence; instructor fallback required.'});
 if(!process.env.OPENAI_API_KEY)return send(res,200,{...simulated,status:'needs_manual_review',reason:'AI provider unavailable; instructor fallback required.'});
 try{
  const result=await grade({course_slug:course,project_title:title,project_summary:summary},{content:[{type:'input_text',text:`Synthetic test evidence (${extension}):\n${evidence}`}],technical:true,unsupported:false});
  const scores=result.scores;const total=Object.values(RULES).reduce((n,k)=>n+scores[k],0);
  const fallback=!!result.requires_manual_review||scores.technical_execution<14;
  const status=fallback?'needs_manual_review':total>=70?'approved':'revision_requested';
  return send(res,200,{...simulated,status,score:total,scores,summary:result.summary,strengths:result.strengths,improvements:result.improvements,nextSteps:result.next_steps,reason:fallback?'Evidence requires instructor verification.':null,certificateWouldIssue:status==='approved',gradingModel:process.env.ASSESSMENT_MODEL||'gpt-4.1-mini'});
 }catch(e){console.error('Assessment test failed:',e?.message);return send(res,200,{...simulated,status:'needs_manual_review',reason:'AI assessment unavailable; instructor fallback required.'});}
}
