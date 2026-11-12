/* Admin Console v6 — owner-only data, scoped directory, insights and exports.
   No privileged credentials or mutation operations appear in the browser. */
(function(){'use strict';
 const $=id=>document.getElementById(id);
 const COURSE={introduction:['Introduction',10,'DA'],excel:['Excel',10,'XL'],sql:['SQL',10,'SQL'],powerbi:['Power BI',10,'BI'],tableau:['Tableau',10,'TB'],powerquery:['Power Query',10,'PQ'],statistics:['Statistics',10,'ST'],python:['Python',10,'PY'],ai:['AI Integration',10,'AI']};
 const PENDING=new Set(['submitted','processing','review_error','needs_manual_review']);
 let profiles=[],progress=[],quizzes=[],submissions=[],certificates=[],appUsage=[],filtered=[],page=0,busy=false;
 const timeout=(promise,ms,label)=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error(label+' timed out after '+Math.round(ms/1000)+' seconds')),ms);Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value)},error=>{clearTimeout(timer);reject(error)});});
 let progressByUser=new Map(),quizByUser=new Map(),subByUser=new Map(),certByUser=new Map(),profilesById=new Map(),usageByUser=new Map();
 const isWithin=(value)=>{if(!value)return false;const v=String(value).slice(0,10),from=$('adminFrom')?.value,to=$('adminTo')?.value;return (!from||v>=from)&&(!to||v<=to)};
 const selectedPeriod=()=>!!($('adminFrom')?.value||$('adminTo')?.value);
 const courseEvents=(slug)=>{
  const ids=new Set();for(const [records,field] of [[progress,'updated_at'],[quizzes,'submitted_at'],[submissions,'created_at']]){
   for(const r of records){if(r.course_slug===slug&&profilesById.has(r.user_id)&&isWithin(r[field]))ids.add(r.user_id)}
  }return ids;
 };
 const pageSize=12,db=()=>window.ZAH_DB?.client;
 const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const date=v=>v?new Date(v).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}):'—';
 const time=v=>v?new Date(v).toLocaleString(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'—';
 const latest=dates=>dates.filter(Boolean).sort().at(-1)||null;
 function notice(message,isError=false){const n=$('adminNotice');if(!n)return;n.replaceChildren(document.createTextNode(message));n.classList.toggle('is-error',isError);n.classList.toggle('is-success',!isError);n.hidden=false;if(isError){const retry=document.createElement('button');retry.type='button';retry.textContent='Retry dashboard';retry.className='ac-button ac-button-primary';retry.style.marginInlineStart='12px';retry.addEventListener('click',()=>{if(window.DALP_ROLE==='admin')void load();});n.append(retry)}}
 const group=(items,key)=>{const map=new Map();for(const r of items){const k=r[key];if(!map.has(k))map.set(k,[]);map.get(k).push(r)}return map};
 function rowsFor(uid){return progressByUser.get(uid)||[]}
 function profileStats(user){
  const rows=rowsFor(user.user_id),qs=quizByUser.get(user.user_id)||[],subs=subByUser.get(user.user_id)||[],certs=certByUser.get(user.user_id)||[];
  const paths=new Set([...rows.map(r=>r.course_slug),...qs.map(r=>r.course_slug),...subs.map(r=>r.course_slug)]);
  const completedUnits=new Set(rows.filter(r=>r.completed&&COURSE[r.course_slug]).map(r=>r.course_slug+':'+r.week_no));
  const completed=completedUnits.size;
  const usage=usageByUser.get(user.user_id);
  const learningLast=latest([...rows.map(r=>r.updated_at||r.completed_at),...qs.map(r=>r.submitted_at),...subs.map(r=>r.created_at)]);
  const last=latest([usage?.last_used_at,learningLast]);
  const completedPath=Object.entries(COURSE).some(([slug,[,units]])=>rows.filter(r=>r.course_slug===slug&&r.completed).reduce((seen,r)=>(seen.add(Number(r.week_no)),seen),new Set()).size>=units)||certs.length>0;
  return {paths:paths.size,completed,last,learningLast,active:!!learningLast&&Date.now()-new Date(learningLast).getTime()<30*86400000,completedPath,courseSet:paths,progressPct:Math.round(completed/(9*10)*100)};
 }
 async function fetchAll(table,fields){
  const all=[],pageSize=500;
  for(let start=0;start<10000;start+=pageSize){
   const {data,error}=await timeout(db().from(table).select(fields).range(start,start+pageSize-1),12000,'Loading '+table);
   if(error)throw new Error(table+': '+error.message);
   all.push(...(data||[]));if(!data||data.length<pageSize)return all;
  }
  throw new Error('There are too many records to display at once. Please narrow your search.');
 }
 function paintStats(){
  // All verified DataLearning accounts—including an administrator who studies—
  // contribute to learning metrics. Role controls access, not engagement.
  const memberIds=new Set(profiles.map(p=>p.user_id));
  $('adminTotal').textContent=profiles.length;
  $('adminActive').textContent=profiles.filter(p=>profileStats(p).active).length;
  $('adminCompleted').textContent=new Set(progress.filter(r=>r.completed&&memberIds.has(r.user_id)).map(r=>r.user_id+':'+r.course_slug+':'+r.week_no)).size;
  const pendingCount=submissions.filter(s=>PENDING.has(s.status)&&memberIds.has(s.user_id)).length;
  if($('adminRosterTotal'))$('adminRosterTotal').textContent=profiles.length;
  if($('adminRosterAdmins'))$('adminRosterAdmins').textContent=profiles.filter(p=>p.role==='admin').length;
  if($('adminRosterLearners'))$('adminRosterLearners').textContent=profiles.filter(p=>p.role!=='admin').length;
  if($('adminRosterEngaged'))$('adminRosterEngaged').textContent=profiles.filter(p=>profileStats(p).paths>0).length;
  $('adminPending').textContent=pendingCount;
  if($('adminPendingHero'))$('adminPendingHero').textContent=pendingCount;
  $('adminUpdated').textContent='Updated '+new Date().toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});
 }
 function paintInsights(){
  const attention=$('adminAttention'),activity=$('adminActivity'),courses=$('adminCourseCards'),chart=$('adminActivityChart');
  attention.replaceChildren();activity.replaceChildren();courses.replaceChildren();chart.replaceChildren();
  const from=$('adminFrom').value,to=$('adminTo').value;
  $('adminPeriod').textContent=from||to?'Activity period: '+(from||'earliest available')+' to '+(to||'latest available'):'All recorded activity';
  const counts=Object.keys(COURSE).map(slug=>({slug,count:courseEvents(slug).size}));
  const validCourses=new Set(Object.keys(COURSE)),memberIds=new Set(profiles.map(p=>p.user_id));
  const engaged=new Set([...progress.filter(r=>validCourses.has(r.course_slug)&&isWithin(r.updated_at||r.completed_at)),...quizzes.filter(r=>validCourses.has(r.course_slug)&&isWithin(r.submitted_at)),...submissions.filter(r=>validCourses.has(r.course_slug)&&isWithin(r.created_at))].filter(r=>memberIds.has(r.user_id)).map(r=>r.user_id));
  const completedLessons=new Set(progress.filter(r=>validCourses.has(r.course_slug)&&r.completed&&memberIds.has(r.user_id)&&isWithin(r.completed_at||r.updated_at)).map(r=>r.user_id+':'+r.course_slug+':'+r.week_no)).size;
  const quizAttempts=quizzes.filter(r=>validCourses.has(r.course_slug)&&memberIds.has(r.user_id)&&isWithin(r.submitted_at)).length;
  $('adminInsightPaths').textContent=validCourses.size.toLocaleString();
  $('adminInsightLearners').textContent=engaged.size.toLocaleString();
  $('adminInsightLessons').textContent=completedLessons.toLocaleString();
  $('adminInsightQuizzes').textContent=quizAttempts.toLocaleString();
  const max=Math.max(1,...counts.map(c=>c.count));
  for(const {slug,count} of counts){const el=document.createElement('div');el.className='ac-chart-row';el.setAttribute('role','listitem');const label=COURSE[slug][0];el.innerHTML='<span class="ac-chart-label">'+esc(label)+'</span><div class="ac-chart-track" aria-hidden="true"><span style="width:'+Math.round(count/max*100)+'%"></span></div><strong class="ac-chart-count">'+count+' <span>learner'+(count===1?'':'s')+'</span></strong>';el.setAttribute('aria-label',label+': '+count+' active learners in selected period');chart.append(el)}
  const outstanding=submissions.filter(s=>PENDING.has(s.status)&&memberIds.has(s.user_id)).sort((a,b)=>String(a.created_at||'').localeCompare(String(b.created_at||'')));
  if(!outstanding.length) attention.innerHTML='<div class="ac-task"><span class="ac-task-badge">✓</span><div class="ac-task-copy"><strong>Your assessment queue is clear</strong><small>New capstone submissions will appear here when received.</small></div></div>';
  outstanding.slice(0,4).forEach(s=>{
   const p=profilesById.get(s.user_id),row=document.createElement('div');row.className='ac-task';
   const label=COURSE[s.course_slug]?.[0]||s.course_slug||'Course';
   row.innerHTML='<span class="ac-task-badge">◷</span><div class="ac-task-copy"><strong>'+esc(p?.full_name||p?.email||'Learner')+' · '+esc(label)+'</strong><small>'+esc(date(s.created_at))+' · '+esc((s.status||'submitted').replaceAll('_',' '))+'</small></div><a href="reviewer.html">Assess →</a>';attention.append(row);
  });
  if(outstanding.length>4){const more=document.createElement('a');more.className='ac-inline-link';more.href='reviewer.html';more.textContent='View all '+outstanding.length+' pending submissions →';attention.append(more)}
  const recent=[...progress.filter(r=>r.completed&&memberIds.has(r.user_id)).map(r=>({id:r.user_id,type:'Lesson completed',when:r.completed_at||r.updated_at,detail:(COURSE[r.course_slug]?.[0]||r.course_slug||'Learning path')+' · Unit '+r.week_no})),...submissions.filter(r=>memberIds.has(r.user_id)).map(r=>({id:r.user_id,type:'Capstone submitted',when:r.created_at,detail:COURSE[r.course_slug]?.[0]||r.course_slug||'Learning path'})),...quizzes.filter(r=>memberIds.has(r.user_id)).map(r=>({id:r.user_id,type:'Knowledge check completed',when:r.submitted_at,detail:COURSE[r.course_slug]?.[0]||r.course_slug||'Learning path'})),...appUsage.filter(r=>memberIds.has(r.user_id)).map(r=>({id:r.user_id,type:'Learner joined DataLearning',when:r.first_used_at,detail:'Verified app use'}))]
   .filter(r=>r.when).sort((a,b)=>String(b.when).localeCompare(String(a.when))).slice(0,4);
  if(!recent.length)activity.innerHTML='<p class="ac-empty">No activity recorded yet. New learner events will appear here.</p>';
  recent.forEach(r=>{const p=profilesById.get(r.id),el=document.createElement('div');el.className='ac-event';el.innerHTML='<span class="ac-event-icon">↗</span><div class="ac-event-copy"><strong>'+esc(r.type)+'</strong><small>'+esc(p?.full_name||p?.email||'Learner')+' · '+esc(r.detail)+' · '+esc(time(r.when))+'</small></div>';activity.append(el)});
  for(const [slug,[label,total,abbr]] of Object.entries(COURSE)){
   const owners=selectedPeriod()?courseEvents(slug):new Set([...progress.filter(r=>r.course_slug===slug).map(r=>r.user_id),...quizzes.filter(r=>r.course_slug===slug).map(r=>r.user_id),...submissions.filter(r=>r.course_slug===slug).map(r=>r.user_id)]);
   for(const id of owners){if(!memberIds.has(id))owners.delete(id)}
   const units=new Set(progress.filter(r=>r.course_slug===slug&&r.completed&&owners.has(r.user_id)&&(!selectedPeriod()||isWithin(r.completed_at||r.updated_at))).map(r=>r.user_id+':'+r.week_no)).size;
   const average=owners.size?Math.min(100,Math.round(units/(total*owners.size)*100)):0;
   const card=document.createElement('article');card.className='ac-course-card';
   card.dataset.course=slug;
   card.innerHTML='<div class="ac-course-card-top"><span class="ac-course-symbol">'+abbr+'</span><span class="ac-course-card-tag">LEARNING PATH</span></div><h3>'+esc(label)+'</h3><p class="ac-course-enrolled"><span class="ac-course-enrolled-dot" aria-hidden="true"></span>'+owners.size+' learner'+(owners.size===1?'':'s')+' with activity</p><div class="ac-course-score"><strong>'+average+'%</strong><span>Average lesson<br>completion</span></div><div class="ac-course-meter-head"><span>Learning progress</span><span>'+average+'% of units</span></div><div class="ac-course-bar" role="progressbar" aria-label="'+esc(label)+' average lesson completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+average+'"><span style="width:'+average+'%"></span></div><button type="button" data-course="'+slug+'">View learner records <span aria-hidden="true">↗</span></button>';
   card.querySelector('button').addEventListener('click',()=>{$('adminCourse').value=slug;page=0;render();location.hash='admin-learners';});courses.append(card);
  }
 }
 function filteredLearners(){
  const q=$('adminSearch').value.trim().toLowerCase(),status=$('adminStatus').value,course=$('adminCourse').value,role=$('adminRole').value;
  return profiles.filter(p=>{
   // Administrators are also registered DataLearning accounts and must appear in the directory.
   const s=profileStats(p);
   const roleMatch=role==='all'||(p.role||'learner')===role;
   const match=!q||[p.full_name,p.email,p.role].some(v=>String(v||'').toLowerCase().includes(q));
   const st=status==='all'||(status==='active'&&s.paths>0)||(status==='new'&&s.paths===0)||(status==='completed'&&s.completedPath);
   const co=course==='all'||(selectedPeriod()?courseEvents(course).has(p.user_id):s.courseSet.has(course));
   const inPeriod=!selectedPeriod()||[p.first_app_use_at,usageByUser.get(p.user_id)?.last_used_at,...rowsFor(p.user_id).map(r=>r.updated_at),...(quizByUser.get(p.user_id)||[]).map(r=>r.submitted_at),...(subByUser.get(p.user_id)||[]).map(r=>r.created_at)].some(isWithin);
   return roleMatch&&match&&st&&co&&inPeriod;
  }).sort((a,b)=>String(b.first_app_use_at||'').localeCompare(String(a.first_app_use_at||'')));
 }
 function render(){
  filtered=filteredLearners();page=Math.max(0,Math.min(page,Math.max(0,Math.ceil(filtered.length/pageSize)-1)));
  const tbody=$('adminLearnerRows');tbody.replaceChildren();
  const batch=filtered.slice(page*pageSize,(page+1)*pageSize);
  if(!batch.length){const r=document.createElement('tr');r.innerHTML='<td colspan="6">No accounts match your filters. Try another search or clear your filters.</td>';tbody.append(r)}
  for(const p of batch){const s=profileStats(p),tr=document.createElement('tr'),label=p.full_name||p.email?.split('@')[0]||'Unnamed learner';
   tr.innerHTML='<td><div class="ac-directory-account"><span class="ac-account-initial" aria-hidden="true">'+esc(label.trim().slice(0,1).toUpperCase())+'</span><span><strong>'+esc(label)+'</strong><small>'+esc(p.email)+'</small></span></div></td><td><span class="ac-account-role '+(p.role==='admin'?'is-admin':'is-learner')+'">'+(p.role==='admin'?'Administrator':'Learner')+'</span></td><td><strong class="ac-numeric">'+s.paths+' <small>of 9</small></strong></td><td><div class="ac-progress-cell"><div><strong>'+s.completed+' / 90</strong><small>'+s.progressPct+'%</small></div><div class="ac-mini-meter" role="progressbar" aria-label="'+esc(label)+' total course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+s.progressPct+'"><span style="width:'+s.progressPct+'%"></span></div></div></td><td><span class="ac-time-cell">'+esc(date(s.last))+'</span></td><td><button type="button" class="dalp-learner-view">View details <span aria-hidden="true">↗</span></button></td>';
   tr.querySelector('button').addEventListener('click',()=>showLearner(p));tbody.append(tr);
  }
  const start=filtered.length?page*pageSize+1:0,end=Math.min(filtered.length,(page+1)*pageSize);
  $('adminRowCount').textContent='Showing '+start+'–'+end+' of '+filtered.length+' matching accounts';
  $('adminPageInfo').textContent='Page '+(page+1)+' of '+Math.max(1,Math.ceil(filtered.length/pageSize));
  $('adminPrevPage').disabled=page===0;$('adminNextPage').disabled=(page+1)*pageSize>=filtered.length;
 }
 function showLearner(p){
  const name=p.full_name||p.email?.split('@')[0]||'Learner';
  $('adminDetailName').textContent=name;
  $('adminDetailEmail').textContent=p.email||'No email on record';
  $('adminDetailInitial').textContent=(name.trim().charAt(0)||'L').toUpperCase();
  const rows=rowsFor(p.user_id),details=$('adminDetailContent');details.replaceChildren();
  const s=profileStats(p),role=p.role==='admin'?'Administrator':'Learner';
  const userQuizzes=quizByUser.get(p.user_id)||[],userSubmissions=subByUser.get(p.user_id)||[],userCerts=certByUser.get(p.user_id)||[];
  const quizzesTaken=userQuizzes.length;
  const header=document.createElement('section');header.className='ac-detail-snapshot';
  header.setAttribute('aria-label','Account and learning overview');
  header.innerHTML='<div class="ac-detail-overview">'+
   '<div class="ac-detail-score" role="img" aria-label="Overall progress '+s.progressPct+' percent" style="--ac-score:'+s.progressPct+'%"><strong>'+s.progressPct+'%</strong><span>overall</span></div>'+
   '<div class="ac-detail-summary-copy"><span class="ac-account-role '+(p.role==='admin'?'is-admin':'is-learner')+'">'+role+' account</span>'+
   '<h3>'+(s.paths?s.paths+' of 9 courses started':'Ready to begin learning')+'</h3>'+
   '<p>'+(s.paths?'Learning records are based on completed lesson units and submitted assessments.':'No recorded course activity yet. Learning progress will appear here after the first lesson or assessment.')+'</p></div></div>'+
   '<div class="ac-detail-metrics">'+
   '<div><small>COURSES STARTED</small><strong>'+s.paths+' <span>of 9</span></strong></div>'+
   '<div><small>WEEKS COMPLETED</small><strong>'+s.completed+' <span>of 90</span></strong></div>'+
   '<div><small>QUIZ ATTEMPTS</small><strong>'+quizzesTaken+'</strong></div>'+
   '<div><small>LAST LEARNING ACTIVITY</small><strong class="ac-detail-date">'+esc(date(s.learningLast))+'</strong></div></div>';
  details.append(header);

  const coursesHeader=document.createElement('div');coursesHeader.className='ac-detail-courses-heading';
  coursesHeader.innerHTML='<div><span class="ac-section-eyebrow">PATHWAY RECORDS</span><h3>Course-by-course progress</h3><p>Open a course to inspect its lessons, knowledge checks, capstone and certificate.</p></div>'+
    '<div class="ac-detail-course-actions"><button type="button" data-detail-show="all" aria-pressed="true">All 9</button><button type="button" data-detail-show="started" aria-pressed="false">Started</button><button type="button" data-detail-show="complete" aria-pressed="false">Completed</button></div>';
  details.append(coursesHeader);
  const tracks=document.createElement('div');tracks.className='dalp-admin-track-list ac-detail-course-list';
  let expandedFirst=false;
  for(const [slug,[title,total,abbr]] of Object.entries(COURSE)){
   const courseRows=rows.filter(r=>r.course_slug===slug),doneWeeks=new Set(courseRows.filter(r=>r.completed).map(r=>Number(r.week_no)).filter(w=>Number.isInteger(w)&&w>=1&&w<=total));
   const count=doneWeeks.size,pct=Math.round(100*count/total);
   const qs=userQuizzes.filter(q=>q.course_slug===slug),subs=userSubmissions.filter(s=>s.course_slug===slug).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at))),certificate=userCerts.some(c=>c.course_slug===slug);
   const attempts=qs.map(q=>Number(q.percentage)).filter(Number.isFinite),avg=attempts.length?Math.round(attempts.reduce((sum,v)=>sum+v,0)/attempts.length)+'%':'Not taken';
   const started=count>0||qs.length>0||subs.length>0||certificate;
   const status=count>=total?'Completed':started?'In progress':'Not started';
   const card=document.createElement('details');card.className='dalp-admin-track ac-detail-course';card.dataset.courseStatus=count>=total?'complete':started?'started':'new';
   if(started&&!expandedFirst){card.open=true;expandedFirst=true}
   const weeks=Array.from({length:total},(_,i)=>'<span class="ac-week-pill '+(doneWeeks.has(i+1)?'is-done':'')+'" aria-label="Week '+(i+1)+': '+(doneWeeks.has(i+1)?'completed':'not completed')+'">'+(doneWeeks.has(i+1)?'✓ ':'')+'W'+String(i+1).padStart(2,'0')+'</span>').join('');
   card.innerHTML='<summary><span class="ac-detail-course-symbol" aria-hidden="true">'+esc(abbr)+'</span><span class="ac-track-title"><strong>'+esc(title)+'</strong><small>'+count+' of '+total+' lessons completed</small></span><span class="ac-track-status '+(count>=total?'is-complete':started?'is-started':'')+'">'+status+'</span><span class="ac-track-percent">'+pct+'%</span><span class="ac-track-chevron" aria-hidden="true">⌄</span></summary>'+
    '<div class="ac-detail-summary-meter" role="progressbar" aria-label="'+esc(title)+' course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+pct+'"><span style="width:'+pct+'%"></span></div>'+
    '<div class="ac-track-body"><div class="ac-track-grid"><div><small>Knowledge checks</small><strong>'+qs.length+' attempt'+(qs.length===1?'':'s')+'</strong></div><div><small>Quiz average</small><strong>'+avg+'</strong></div><div><small>Capstone</small><strong>'+esc((subs[0]?.status||'Not submitted').replaceAll('_',' '))+'</strong></div><div><small>Certificate</small><strong>'+(certificate?'Issued':'Not issued')+'</strong></div></div><p class="ac-week-label">WEEK-BY-WEEK RECORD</p><div class="ac-week-pills">'+weeks+'</div></div>';
   tracks.append(card);
  }
  details.append(tracks);
  const detailFooter=document.createElement('p');detailFooter.className='ac-detail-footer-note';detailFooter.textContent='Progress reflects verified DataLearning activity. Administrator accounts retain their administrator role while studying courses.';details.append(detailFooter);
  const filterButtons=[...coursesHeader.querySelectorAll('[data-detail-show]')];
  const applyFilter=mode=>{
   let visible=0;
   [...tracks.children].forEach(card=>{
    const show=mode==='all'||mode==='started'&&card.dataset.courseStatus!=='new'||mode==='complete'&&card.dataset.courseStatus==='complete';
    card.hidden=!show;if(show)visible++;
   });
   filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.detailShow===mode)));
   const empty=details.querySelector('.ac-detail-empty');if(empty)empty.remove();
   if(!visible){const n=document.createElement('p');n.className='ac-detail-empty';n.setAttribute('role','status');n.textContent='No courses match this view yet. Choose All 9 to see every pathway.';tracks.after(n)}
  };
  filterButtons.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.detailShow)));
  $('adminLearnerDetail').hidden=false;
 }
 function exportCSV(){
  // Export all filtered matches, not merely the currently displayed page. Prevent CSV formula injection.
  const safe=v=>{let s=String(v??'');if(/^[\s]*[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'};
  const head=['Account name','Email','Account role','First app use','Courses started','Lessons completed','Overall progress %','Last activity'];
  const lines=[head,...filtered.map(p=>{const s=profileStats(p);return [p.full_name,p.email,p.role||'learner',p.first_app_use_at||'',s.paths,s.completed,s.progressPct,s.last||'']})];
  const csv='\ufeff'+lines.map(row=>row.map(safe).join(',')).join('\r\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='academy-learners-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 async function load(){
  if(busy)return;busy=true;notice('Loading academy reports…');$('adminReload').disabled=true;
  try{
   const [p,c,q,s,cert]=await Promise.all([
    fetchAll('learner_profiles','user_id,full_name,email,role,joined_at,last_seen_at'),
    fetchAll('course_progress','user_id,course_slug,week_no,completed,updated_at,completed_at'),
    fetchAll('quiz_results','user_id,course_slug,week_no,percentage,submitted_at'),
    fetchAll('capstone_submissions','user_id,course_slug,status,created_at'),
    fetchAll('certificates','user_id,course_slug,certificate_id')]);
   progress=c;quizzes=q;submissions=s;certificates=cert;
   // The restricted learner_profiles table is the authoritative DataLearning
   // app-user directory. It is populated only after verified app usage or
   // first-party learning activity, plus administrators. Do not merge all
   // Supabase Auth accounts into this list or infer membership from Auth sign-ins.
   try { appUsage=await fetchAll('datalearning_app_users','user_id,first_used_at,last_used_at,last_signed_in_at'); }
   catch { appUsage=[]; }
   usageByUser=new Map(appUsage.map(u=>[u.user_id,u]));
   // Both the directory table in Supabase and the admin counter use exactly
   // this list; rows from other applications cannot enter via auth.users.
   profiles=p.map(person=>{
     const id=person.user_id;
     const timestamps=[usageByUser.get(id)?.first_used_at,
       ...progress.filter(row=>row.user_id===id).map(row=>row.completed_at||row.updated_at),
       ...quizzes.filter(row=>row.user_id===id).map(row=>row.submitted_at),
       ...submissions.filter(row=>row.user_id===id).map(row=>row.created_at)].filter(Boolean).sort();
     return {...person,first_app_use_at:timestamps[0]||null};
   });
   progressByUser=group(progress,'user_id');quizByUser=group(quizzes,'user_id');subByUser=group(submissions,'user_id');certByUser=group(certificates,'user_id');profilesById=new Map(profiles.map(p=>[p.user_id,p]));
   page=0;paintStats();paintInsights();render();$('adminNotice').hidden=true;
  }catch(e){console.error('Admin reports could not be loaded',e);notice('Dashboard reports could not load: '+(e?.message||'Unknown connection problem')+'. Your account and records have not been changed.',true)}
  finally{busy=false;$('adminReload').disabled=false}
 }
 async function init(){
  if(window.DALP_ROLE!=='admin')return;
  try{
  if(!db()){notice('The administrator dashboard is unavailable right now. Please refresh the page or try again later.',true);return;}
  const {data,error}=await timeout(db().auth.getUser(),12000,'Administrator session verification');if(error||!data?.user){notice('Administrator session could not be verified. Please sign in again.',true);return;}
  const {data:admin,error:roleError}=await timeout(db().from('site_admins').select('user_id').eq('user_id',data.user.id).maybeSingle(),12000,'Administrator permissions verification');
  if(roleError||!admin){notice('Administrator authorisation failed. Learner details will not be shown.',true);return;}
  $('adminWorkspace').hidden=false;
  const refreshDates=()=>{const from=$('adminFrom').value,to=$('adminTo').value;if(from&&to&&from>to){notice('Start date must be before end date.',true);return;}$('adminNotice').hidden=true;page=0;paintInsights();render()};
  $('adminFrom').addEventListener('change',refreshDates);$('adminTo').addEventListener('change',refreshDates);$('adminClearDates').addEventListener('click',()=>{$('adminFrom').value='';$('adminTo').value='';refreshDates()});
  $('adminSearch').addEventListener('input',()=>{page=0;render()});$('adminStatus').addEventListener('change',()=>{page=0;render()});$('adminRole').addEventListener('change',()=>{page=0;render()});$('adminCourse').addEventListener('change',()=>{page=0;render()});
  $('adminReload').addEventListener('click',load);$('adminExport').addEventListener('click',exportCSV);
  $('adminPrevPage').addEventListener('click',()=>{page--;render()});$('adminNextPage').addEventListener('click',()=>{page++;render()});
  $('adminCloseDetail').addEventListener('click',()=>{$('adminLearnerDetail').hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();if(document.body.dataset.adminView!=='learners')location.hash='admin-learners';requestAnimationFrame(()=>$('adminSearch').focus())}});
  await load();
  }catch(e){console.error('Administrator dashboard initialization failed',e);notice('Unable to initialise dashboard: '+(e?.message||'Connection failed')+'. Please retry or refresh.',true)}
 }
 let started=false;const once=()=>{if(started||window.DALP_ROLE!=='admin')return;started=true;init()};
 window.addEventListener('dalp:auth-ready',once);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',once,{once:true});else once();
})();
