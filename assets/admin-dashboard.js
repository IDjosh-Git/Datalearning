/* Administrator-only learner directory. Database RLS enforces these permissions. */
(function(){'use strict';
 const $=id=>document.getElementById(id);
 const COURSE={introduction:['Introduction',8],excel:['Excel',10],sql:['SQL',10],powerbi:['Power BI',10],ai:['AI Integration',10]};
 let profiles=[],progress=[],quizzes=[],submissions=[],certificates=[],filtered=[];
 const db=()=>window.ZAH_DB?.client;
 const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const shortDate=v=>v?new Date(v).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
 const notice=(message,isError=false)=>{const n=$('adminNotice');n.textContent=message;n.style.background=isError?'#fff0eb':'#f0f9f5';n.style.color=isError?'#9e3323':'#1d624c';n.hidden=false};
 const stamp=r=>r?.updated_at||r?.completed_at||r?.submitted_at||r?.created_at||null;
 const latest=dates=>dates.filter(Boolean).sort().at(-1)||null;
 function rowsFor(uid){return progress.filter(r=>r.user_id===uid);}
 function profileStats(user){
  const rows=rowsFor(user.user_id),done=rows.filter(r=>r.completed),paths=new Set(rows.map(r=>r.course_slug)),last=latest([...rows.map(stamp),...quizzes.filter(r=>r.user_id===user.user_id).map(stamp),...submissions.filter(r=>r.user_id===user.user_id).map(stamp)]);
  return {paths:paths.size,completed:done.length,last,active:paths.size>0||quizzes.some(r=>r.user_id===user.user_id)||submissions.some(r=>r.user_id===user.user_id)};
 }
 async function fetchAll(table,fields){
  const all=[],pageSize=500;
  for(let start=0;start<10000;start+=pageSize){
   const {data,error}=await db().from(table).select(fields).range(start,start+pageSize-1);
   if(error)throw new Error(table+': '+error.message);
   all.push(...(data||[]));if(!data||data.length<pageSize)return all;
  }
  throw new Error('More than 10,000 '+table+' records. Narrow this export or increase server pagination before continuing.');
 }
 function paintStats(){
  const myId=window.DALP_AUTH_USER?.id;
  const learners=profiles.filter(p=>p.user_id!==myId),active=learners.filter(p=>profileStats(p).active).length;
  $('adminTotal').textContent=learners.length;
  $('adminActive').textContent=active;
  $('adminCompleted').textContent=progress.filter(r=>r.completed).length;
  $('adminPending').textContent=submissions.filter(s=>['submitted','processing','review_error','needs_manual_review'].includes(s.status)).length;
 }
 function render(){
  const q=$('adminSearch').value.trim().toLowerCase(),status=$('adminStatus').value;
  filtered=profiles.filter(p=>{if(p.user_id===window.DALP_AUTH_USER?.id)return false;const stats=profileStats(p);return (!q||[p.full_name,p.email].some(v=>String(v||'').toLowerCase().includes(q)))&&(status==='all'||(status==='active'?stats.active:!stats.active))});
  const body=$('adminLearnerRows');body.replaceChildren();
  if(!filtered.length){const tr=document.createElement('tr');tr.innerHTML='<td colspan="5">No learners match your filters.</td>';body.append(tr);}
  filtered.forEach(p=>{const s=profileStats(p),tr=document.createElement('tr');const label=(p.full_name||p.email?.split('@')[0]||'Unnamed learner');tr.innerHTML='<td><strong>'+esc(label)+'</strong><small>'+esc(p.email)+'</small></td><td>'+s.paths+'</td><td>'+s.completed+'</td><td>'+esc(shortDate(s.last))+'</td><td><button type="button" class="dalp-learner-view">View record →</button></td>';tr.querySelector('button').addEventListener('click',()=>showLearner(p));body.append(tr)});
  $('adminRowCount').textContent='Showing '+filtered.length+' of '+(profiles.length-(window.DALP_AUTH_USER?.id?1:0))+' learners. All learners are stored as individual profiles.';
 }
 function showLearner(p){
  $('adminDetailName').textContent=p.full_name||'Learner';$('adminDetailEmail').textContent=p.email||'';
  const rows=rowsFor(p.user_id),details=$('adminDetailContent');details.replaceChildren();
  const tracks=document.createElement('div');tracks.className='dalp-admin-track-list';
  for(const [slug,[title,total]] of Object.entries(COURSE)){
   const count=rows.filter(r=>r.course_slug===slug&&r.completed).length,pct=Math.round(100*count/total),qs=quizzes.filter(q=>q.user_id===p.user_id&&q.course_slug===slug),submission=submissions.filter(s=>s.user_id===p.user_id&&s.course_slug===slug).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)))[0],certificate=certificates.some(c=>c.user_id===p.user_id&&c.course_slug===slug);
   const card=document.createElement('article');card.className='dalp-admin-track';
   const avg=qs.length?Math.round(qs.reduce((sum,q)=>sum+Number(q.percentage||0),0)/qs.length)+'%':'Not yet taken';
   card.innerHTML='<h3>'+esc(title)+'</h3><strong>'+count+' / '+total+' units</strong><div class="dalp-admin-meter"><span style="width:'+pct+'%"></span></div><p>Quiz results: '+qs.length+' · Average: '+avg+'</p><p>Capstone: '+esc(submission?.status||'Not submitted')+'</p><p>Certificate: '+(certificate?'Issued':'Not issued')+'</p>';
   tracks.append(card);
  }
  details.append(tracks);$('adminLearnerDetail').hidden=false;$('adminLearnerDetail').scrollIntoView({behavior:'smooth',block:'start'});
 }
 function exportCSV(){
  const head=['Learner name','Email','Profile created','Tracks started','Lessons completed','Last activity'];
  const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
  const lines=[head,...filtered.map(p=>{const s=profileStats(p);return [p.full_name,p.email,p.joined_at,s.paths,s.completed,s.last||'']})];
  const csv='\ufeff'+lines.map(row=>row.map(cell).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='learner-directory-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 let busy=false;
 async function load(){
  if(busy)return;busy=true;notice('Loading learner directory…');$('adminReload').disabled=true;
  try{
   const [p,c,q,s,cert]=await Promise.all([fetchAll('learner_profiles','user_id,full_name,email,joined_at,last_seen_at'),fetchAll('course_progress','user_id,course_slug,week_no,completed,updated_at,completed_at'),fetchAll('quiz_results','user_id,course_slug,week_no,percentage,submitted_at'),fetchAll('capstone_submissions','user_id,course_slug,status,created_at'),fetchAll('certificates','user_id,course_slug,certificate_id')]);
   profiles=p;progress=c;quizzes=q;submissions=s;certificates=cert;
   paintStats();render();$('adminNotice').hidden=true;
  }catch(e){console.error('Admin dashboard data failed',e);notice('Unable to load the administrator workspace: '+e.message,true)}
  finally{busy=false;$('adminReload').disabled=false;}
 }
 async function init(){
  if(window.DALP_ROLE!=='admin')return;
  if(!db()){notice('Supabase is unavailable. Connect the application before opening the admin dashboard.',true);return;}
  const {data,error}=await db().auth.getUser();if(error||!data?.user){notice('Administrator session could not be verified. Please sign in again.',true);return;}
  const {data:admin,error:roleError}=await db().from('site_admins').select('user_id').eq('user_id',data.user.id).maybeSingle();
  if(roleError||!admin){notice('Administrator authorisation failed. Learner details will not be shown.',true);return;}
  $('adminWorkspace').hidden=false;
  $('adminSearch').addEventListener('input',render);$('adminStatus').addEventListener('change',render);
  $('adminReload').addEventListener('click',load);$('adminExport').addEventListener('click',exportCSV);
  $('adminCloseDetail').addEventListener('click',()=>{$('adminLearnerDetail').hidden=true});
  await load();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{if(window.DALP_ROLE==='admin')init();else window.addEventListener('dalp:auth-ready',init,{once:true})},{once:true});else if(window.DALP_ROLE==='admin')init();else window.addEventListener('dalp:auth-ready',init,{once:true});
})();
