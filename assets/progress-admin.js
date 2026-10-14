(()=>{'use strict';
 const db=()=>window.ZAH_DB?.client;
 const el=id=>document.getElementById(id);
 const TRACKS={introduction:'Introduction',excel:'Excel',sql:'SQL',powerbi:'Power BI',ai:'AI Integration'};
 const UNITS={introduction:8,excel:10,sql:10,powerbi:10,ai:10};
 const PENDING=['submitted','processing','review_error','needs_manual_review'];
 let rows=[],filtered=[],selected=null;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const date=s=>s?new Date(s).toLocaleString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
 function gate(message,kind='warning'){el('progressGate').className='cap-notice '+kind;el('progressGate').textContent=message}
 function rowStatus(r){
   if(r.certificate_id)return 'completed';
   if(PENDING.includes(r.capstone_status))return 'awaiting_review';
   if(r.capstone_status==='needs_revision')return 'revision';
   if(r.course_slug!=='introduction'&&Number(r.completed_weeks)>=10)return 'ready';
   if(r.course_slug==='introduction'&&Number(r.completed_weeks)>=8)return 'completed';
   if(!r.last_activity&&Number(r.completed_weeks||0)===0&&Number(r.quizzes_taken||0)===0&&!r.capstone_status&&!r.certificate_id)return 'not_started';
   if(r.last_activity&&Date.now()-new Date(r.last_activity).getTime()>=14*86400000)return 'inactive';
   return 'in_progress';
 }
 const statusLabel=s=>({completed:'Completed',awaiting_review:'Awaiting review',revision:'Revision requested',ready:'Ready for capstone',inactive:'Inactive 14+ days',not_started:'Not started',in_progress:'In progress'}[s]||s);
 const capstoneLabel=s=>({submitted:'Awaiting review',processing:'Awaiting review',review_error:'Awaiting review',needs_manual_review:'Awaiting review',approved:'Passed',needs_revision:'Revision requested'}[s]||'Not submitted');
 async function init(){
   if(!window.ZAH_DB?.configured||!db()){gate('This site is not connected to Supabase. Configure the project and run the latest supabase_setup.sql.','error');return}
   try{
     const {data,error}=await db().auth.getUser();if(error)throw error;
     if(!data?.user){el('progressGate').innerHTML='Instructor sign-in required. <a href="auth.html?return='+encodeURIComponent(location.href)+'">Sign in to continue ↗</a>';return}
     const {data:owner,error:ownerError}=await db().from('capstone_reviewers').select('user_id').eq('user_id',data.user.id).maybeSingle();if(ownerError)throw ownerError;
     if(!owner){gate('Access restricted. This account is not on the instructor allowlist.','warning');return}
     el('progressGate').hidden=true;el('progressApp').hidden=false;
     el('progressLearner').addEventListener('change',applyFilters);
     el('progressCourse').addEventListener('change',applyFilters);el('progressStatus').addEventListener('change',applyFilters);
     el('refreshProgress').onclick=loadOverview;el('closeDetail').onclick=()=>{el('learnerDetail').hidden=true;selected=null};
     await loadOverview();
   }catch(err){console.error(err);gate('Cannot load the instructor progress dashboard: '+err.message,'error')}
 }
 async function loadOverview(){
   el('progressBody').innerHTML='<tr><td colspan="10" class="ip-empty">Loading learner progress…</td></tr>';
   const {data,error}=await db().rpc('instructor_progress_overview');
   if(error){el('progressBody').innerHTML='<tr><td colspan="10" class="ip-empty"><strong>Progress report unavailable.</strong><br>'+esc(error.message)+'</td></tr>';return}
   rows=(data||[]).map(r=>({...r,completed_weeks:Number(r.completed_weeks||0),progress_percent:Number(r.progress_percent||0),quizzes_taken:Number(r.quizzes_taken||0),quiz_average:r.quizzes_taken?Number(r.quiz_average||0):null}));
   populateLearners();paintStats();applyFilters();
 }
 function paintStats(){
   el('statLearners').textContent=new Set(rows.map(r=>r.learner_user_id)).size;
   el('statTracks').textContent=rows.filter(r=>!['completed','not_started'].includes(rowStatus(r))).length;
   el('statCompleted').textContent=rows.filter(r=>rowStatus(r)==='completed').length;
   el('statReview').textContent=rows.filter(r=>PENDING.includes(r.capstone_status)).length;
 }
 function populateLearners(){
   const select=el('progressLearner'),current=select.value;
   const learners=[...new Map(rows.map(r=>[r.learner_user_id,{id:r.learner_user_id,name:r.learner_name||'Learner'}])).values()]
     .sort((a,b)=>a.name.localeCompare(b.name,undefined,{sensitivity:'base'}));
   select.replaceChildren(new Option('All learners',''));
   for(const learner of learners) select.add(new Option(learner.name,learner.id));
   if(learners.some(l=>l.id===current)) select.value=current;
 }
 function applyFilters(){
   const learner=el('progressLearner').value,course=el('progressCourse').value,status=el('progressStatus').value;
   filtered=rows.filter(r=>(!learner||r.learner_user_id===learner)&&(!course||r.course_slug===course)&&(status==='all'||rowStatus(r)===status));
   render();
 }
 function render(){
   const body=el('progressBody');body.replaceChildren();el('progressCount').textContent=filtered.length+' course record'+(filtered.length===1?'':'s');
   if(!filtered.length){body.innerHTML='<tr><td colspan="10" class="ip-empty">No learner progress matches these filters.</td></tr>';return}
   for(const r of filtered){
     const tr=document.createElement('tr'),st=rowStatus(r);
     const total=UNITS[r.course_slug]||10;
     const capstone=r.course_slug==='introduction'?'Not required':capstoneLabel(r.capstone_status);
     const cert=r.course_slug==='introduction'?'Not required':(r.certificate_id?'Issued':'—');
     tr.innerHTML='<td><strong>'+esc(r.learner_name||'Learner')+'</strong><small>'+esc(r.learner_email||'')+'</small></td><td><strong>'+esc(TRACKS[r.course_slug]||r.course_slug)+'</strong></td><td>'+r.completed_weeks+'/'+total+'</td><td><div class="ip-progress" title="'+r.progress_percent+'%"><span style="width:'+Math.max(0,Math.min(100,r.progress_percent))+'%"></span></div><small>'+r.progress_percent+'%</small></td><td>'+(r.course_slug==='introduction'?'—':r.quizzes_taken+'/10')+'</td><td>'+(r.course_slug==='introduction'?'—':(r.quiz_average==null?'—':r.quiz_average+'%'))+'</td><td><span class="ip-status '+st+'">'+esc(capstone)+'</span>'+(r.course_slug!=='introduction'&&r.capstone_score!=null?'<small>'+Number(r.capstone_score)+'/100</small>':'')+'</td><td>'+cert+'</td><td>'+esc(date(r.last_activity))+'<small>'+esc(statusLabel(st))+'</small></td><td><button type="button" class="ip-view">View details →</button></td>';
     tr.querySelector('.ip-view').onclick=()=>openDetail(r);body.append(tr);
   }
 }
 async function openDetail(r){
   selected=r;el('learnerDetail').hidden=false;el('detailCourse').textContent=(TRACKS[r.course_slug]||r.course_slug).toUpperCase();el('detailCourse').className='review-track '+r.course_slug;el('detailLearner').textContent=r.learner_name||'Learner';el('detailEmail').textContent=r.learner_email||'';const total=UNITS[r.course_slug]||10;el('detailWeeks').textContent=r.completed_weeks+'/'+total;el('detailQuizAvg').textContent=r.course_slug==='introduction'?'Not tracked':(r.quiz_average==null?'—':r.quiz_average+'%');el('detailCapstone').textContent=r.course_slug==='introduction'?'Not required':capstoneLabel(r.capstone_status);el('detailCertificate').textContent=r.course_slug==='introduction'?'Not required':(r.certificate_id?'Issued':'Not issued');
   const review=el('detailReviewLink');review.hidden=r.course_slug==='introduction'||!PENDING.includes(r.capstone_status);review.href='reviewer.html';
   const grid=el('weekGrid');grid.innerHTML='<div class="ip-empty">Loading weekly detail…</div>';el('learnerDetail').scrollIntoView({behavior:'smooth',block:'start'});
   const {data,error}=await db().rpc('instructor_progress_detail',{p_user_id:r.learner_user_id,p_course_slug:r.course_slug});
   if(selected!==r)return;if(error){grid.innerHTML='<div class="ip-empty">Could not load weekly detail: '+esc(error.message)+'</div>';return}
   grid.replaceChildren();for(const w of data||[]){const card=document.createElement('article');card.className='ip-week'+(w.completed?' done':'');card.innerHTML='<strong>'+(r.course_slug==='introduction'?'Lesson ':'Week ')+Number(w.week_no)+'</strong><span class="week-state">'+(w.completed?'✓ Completed':'○ Not complete')+'</span><small>'+(r.course_slug==='introduction'?'Foundation lesson':('Quiz: '+(w.quiz_percentage==null?'Not submitted':Number(w.quiz_percentage)+'%')))+'</small>'+(w.completed_at?'<small>Completed '+esc(date(w.completed_at))+'</small>':'');grid.append(card)}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
