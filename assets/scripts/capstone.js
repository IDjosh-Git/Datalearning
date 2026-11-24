(()=>{'use strict';
 const DB=()=>window.ZAH_DB?.client;
 const COURSE={introduction:{title:'Data Analysis Foundations',code:'DAN',color:'#023048'},tableau:{title:'Tableau',code:'TBL',color:'#770101'},powerquery:{title:'Power Query',code:'PQY',color:'#770101'},statistics:{title:'Introductory Statistics',code:'STA',color:'#770101'},excel:{title:'Excel Data Analysis',code:'EXL',color:'#770101'},sql:{title:'SQL for Data Analysis',code:'SQL',color:'#770101'},powerbi:{title:'Power BI & DAX',code:'PBI',color:'#770101'},python:{title:'Python for Data Analytics',code:'PYT',color:'#023048'},ai:{title:'AI Integration in Data Analysis',code:'AIA',color:'#023048'}};
 const RULES={problem_and_objectives:25,data_preparation_and_quality:20,technical_execution:20,analysis_and_insights:20,communication_and_evidence:15};
 const LABELS={problem_and_objectives:'Problem and objectives',data_preparation_and_quality:'Data preparation & quality',technical_execution:'Technical execution',analysis_and_insights:'Analysis & insights',communication_and_evidence:'Communication & evidence'};
 const el=id=>document.getElementById(id);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const date=s=>s?new Date(s).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}):'—';
 let course=COURSE[new URLSearchParams(location.search).get('course')]?new URLSearchParams(location.search).get('course'):'excel';
 let user=null,cloudDone=0,files=[],currentReview=null,currentCertificate=null,submissionHistory=[],loading=false,previewUrls=[],reviewLoaded=false,refreshId=0;
 function notice(msg,kind='',retry=false){
  const node=el('cloudNotice');node.className='cap-notice '+kind;node.replaceChildren();
  const copy=document.createElement('span');copy.textContent=msg;node.append(copy);
  if(retry){const button=document.createElement('button');button.type='button';button.className='cap-retry';button.textContent='Retry loading';button.addEventListener('click',refresh);node.append(button)}
}
 function choose(next){if(loading){notice('Please wait until your submission finishes before switching courses.','warning');return}course=next;document.querySelectorAll('.cap-track').forEach(b=>{const active=b.dataset.course===next;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});const url=new URL(location.href);url.searchParams.set('course',course);history.replaceState(null,'',url);files=[];renderFiles();el('capstoneForm').reset();el('summaryCount').textContent='0 / 4000';user=null;cloudDone=0;reviewLoaded=false;currentReview=null;currentCertificate=null;submissionHistory=[];el('courseProgress').textContent='Checking…';el('courseProgressBar').style.width='0%';el('reviewStatus').innerHTML='<div class="cap-empty">Checking course submissions…</div>';toggleSubmit();refresh()}
 function validateFile(f){const ext=f.name.split('.').pop().toLowerCase();if(!['png','jpg','jpeg','webp','pdf','xlsx','sql','csv','txt','pbix','py','ipynb'].includes(ext))return 'Unsupported file type: '+f.name;if(f.size>12*1024*1024)return 'Each file must be 12 MB or smaller: '+f.name;if(!f.size)return 'Empty files cannot be submitted: '+f.name;return null}
 function addFiles(incoming){const next=[...files];for(const f of incoming){const problem=validateFile(f);if(problem){notice(problem,'error');return}if(next.length===4){notice('You can submit a maximum of four files.','error');return}if(next.reduce((sum,x)=>sum+x.size,0)+f.size>32*1024*1024){notice('Your files must be 32 MB or less combined.','error');return}next.push(f)}files=next;renderFiles();notice(files.some(f=>/^image\//.test(f.type))?'Photo evidence selected. Include original project files too if useful.':'Photos or screenshots help the AI assess your work; a tutor can review them if automated grading is unavailable.','success')}
 function renderFiles(){previewUrls.forEach(u=>URL.revokeObjectURL(u));previewUrls=[];const node=el('fileList');node.replaceChildren();files.forEach((f,index)=>{const row=document.createElement('div');row.className='cap-file';const left=document.createElement('div'),thumb=document.createElement('div');thumb.className='cap-file-preview';if(/^image\//.test(f.type)){const img=document.createElement('img');img.alt='Selected image preview';img.style.cssText='width:60px;height:55px;object-fit:cover;border-radius:9px';const src=URL.createObjectURL(f);previewUrls.push(src);img.src=src;thumb.append(img)}else thumb.textContent='▤';const info=document.createElement('div'),title=document.createElement('strong'),size=document.createElement('small');title.textContent=f.name;size.textContent=(f.size/1024/1024).toFixed(2)+' MB';info.append(title,size);left.append(thumb,info);const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.onclick=()=>{files.splice(index,1);renderFiles()};row.append(left,remove);node.append(row)})}
 function toggleSubmit(){const pending=['submitted','processing','review_error','needs_manual_review'].includes(currentReview?.status);const enabled=!!user&&reviewLoaded&&cloudDone===10&&!loading&&!pending&&currentReview?.status!=='approved';el('submitCapstone').disabled=!enabled;el('submitHint').textContent=!user?'Sign in to submit.':!reviewLoaded?'Checking submission history before a new upload.':cloudDone<10?'Complete all ten weeks and make sure your progress is saved first.':currentReview?.status==='approved'?'You already passed this course.':pending?'Your AI assessment is processing, or your submission is queued for tutor grading.':enabled?currentReview?.status==='needs_revision'?'Revise your project using the feedback, then resubmit your evidence.':'Upload clear project photos and submit.':'Submission unavailable.'}

 const missingSession=error=>/AuthSessionMissingError/i.test(String(error?.name||'')) || /auth session missing|session_not_found/i.test(String(error?.message||error?.code||''));
 function signedOut(){
   user=null;cloudDone=0;reviewLoaded=false;currentReview=null;currentCertificate=null;submissionHistory=[];
   el('courseProgress').textContent='Sign in required';el('courseProgressBar').style.width='0%';
   el('courseProgressHelp').textContent='Sign in to check your course completion.';
   const review=el('reviewStatus');review.replaceChildren();
   const empty=document.createElement('div');empty.className='cap-empty';empty.textContent='Your submissions and AI or tutor feedback will appear here after you sign in. ';
   const link=document.createElement('a');link.href='auth.html?return='+encodeURIComponent(location.href);link.textContent='Sign in to continue';empty.append(link);review.append(empty);
   renderCertificate();toggleSubmit();notice('Sign in to view your projects, progress and assessment.','info');
 }
 async function refresh(){
   const id=++refreshId,selectedCourse=course,db=DB();
   reviewLoaded=false;toggleSubmit();
   if(!window.ZAH_DB?.configured||!db){
     user=null;cloudDone=0;currentReview=null;currentCertificate=null;submissionHistory=[];
     el('courseProgress').textContent='Connection unavailable';el('courseProgressBar').style.width='0%';
     el('courseProgressHelp').textContent='Your records have not been changed.';
     el('reviewStatus').innerHTML='<div class="cap-empty">The project service is not connected. Please retry once the connection is restored.</div>';
     toggleSubmit();notice('Unable to connect to the learning platform. Please retry.','warning',true);return false;
   }
   try{
     // Supabase is configured with persistSession:false: its session is restored
     // asynchronously from the secure hosting cookie. Wait for that restoration
     // before deciding that an already signed-in learner is signed out.
     await Promise.resolve(window.DALP_AUTH_RESTORE).catch(error=>{
       console.warn('Capstone session restoration could not finish',error);
     });
     if(id!==refreshId||selectedCourse!==course)return false;
     const {data:sessionData,error:sessionError}=await db.auth.getSession();
     if(id!==refreshId||selectedCourse!==course)return false;
     if(sessionError&&!missingSession(sessionError))throw sessionError;
     if(!sessionData?.session){signedOut();return true}
     const {data:auth,error:authError}=await db.auth.getUser();
     if(id!==refreshId||selectedCourse!==course)return false;
     if(authError){if(missingSession(authError)){signedOut();return true}throw authError}
     if(!auth?.user){signedOut();return true}
     user=auth.user;
     const [pr,rev,cert]=await Promise.all([
       db.from('course_progress').select('week_no,completed').eq('user_id',user.id).eq('course_slug',selectedCourse),
       db.from('capstone_submissions').select('id,course_slug,project_title,status,created_at,review_due_at,reviewed_at,score,score_breakdown,review_summary,strengths,improvements,next_steps,evidence_notes,certificate_id').eq('user_id',user.id).eq('course_slug',selectedCourse).order('created_at',{ascending:false}).limit(100),
       db.from('certificates').select('certificate_id,learner_name,course_slug,course_title,completion_date,issued_at,capstone_submission_id,status').eq('user_id',user.id).eq('course_slug',selectedCourse).eq('status','active').order('issued_at',{ascending:false}).limit(1)
     ]);
     if(id!==refreshId||selectedCourse!==course)return false;
     if(!el('learnerName').value.trim())el('learnerName').value=(user.user_metadata?.full_name||user.user_metadata?.name||'').trim();
     const problems=[];
     if(pr.error){
       console.warn('Capstone progress query failed',pr.error);
       cloudDone=0;el('courseProgress').textContent='Progress unavailable';el('courseProgressBar').style.width='0%';
       el('courseProgressHelp').textContent='We could not verify your completion yet. Please retry.';problems.push('progress');
     }else{
       cloudDone=new Set((pr.data||[]).filter(row=>row.completed&&Number.isInteger(Number(row.week_no))&&Number(row.week_no)>=1&&Number(row.week_no)<=10).map(row=>Number(row.week_no))).size;
       el('courseProgress').textContent=cloudDone+'/10 weeks';el('courseProgressBar').style.width=Math.min(100,cloudDone*10)+'%';
       el('courseProgressBar').style.background=COURSE[selectedCourse].color;
       el('courseProgressHelp').textContent=cloudDone===10?'Course complete. You can submit your project.':(10-cloudDone)+' weeks remaining before submission.';
     }
     if(rev.error){
       console.warn('Capstone submission query failed',rev.error);
       currentReview=null;reviewLoaded=false;
       el('reviewStatus').innerHTML='<div class="cap-empty cap-state-error">Your submission history could not be retrieved. Please use Retry loading above; your saved project has not been deleted.</div>';
       problems.push('submissions');
     }else{submissionHistory=rev.data||[];currentReview=submissionHistory[0]||null;reviewLoaded=true;renderReview()}
     if(cert.error){
       console.warn('Capstone certificate query failed',cert.error);
       currentCertificate=null;el('certificateMessage').hidden=false;
       el('certificateMessage').textContent='Certificate details are temporarily unavailable. Please retry.';
       el('certificateContainer').hidden=true;el('certificateControls').hidden=true;problems.push('certificates');
     }else{currentCertificate=cert.data?.[0]||null;renderCertificate()}
     toggleSubmit();
     if(problems.length){
       notice('Some capstone details could not be refreshed ('+problems.join(', ')+'). Your saved work is unchanged.','warning',true);
       return false;
     }
     notice(!currentReview?(cloudDone===10?'Ready to submit your capstone.':'Your course progress is up to date.'):(currentReview.status==='submitted'?'Your project is awaiting AI assessment or tutor grading.':'Your latest assessment is available below.'),'success');
     return true;
   }catch(error){
     if(id!==refreshId||selectedCourse!==course)return false;
     console.error('Capstone account verification error',error);
     reviewLoaded=false;toggleSubmit();
     if(missingSession(error)){signedOut();return true}
     el('courseProgress').textContent='Unable to refresh';
     el('reviewStatus').innerHTML='<div class="cap-empty cap-state-error">We could not verify your account or retrieve your submissions right now. Try again using the button above.</div>';
     notice('Connection interrupted. Please retry to load your course details.','warning',true);return false;
   }
 }
 function feedbackCard(title,items){return Array.isArray(items)&&items.length?'<div class="cap-feedback-card"><h4>'+esc(title)+'</h4><ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>':''}
 function renderReview(){const node=el('reviewStatus');if(!currentReview){node.innerHTML='<div class="cap-empty">No capstone submitted yet. Finish the course, then upload your work.</div>';return}const r=currentReview;const statuses={submitted:'AI assessment starting',processing:'AI assessment in progress',review_error:'Assessment retry needed',needs_manual_review:'Awaiting tutor grading',approved:'Passed · assessment published',needs_revision:'Revision requested'};let html='<div class="cap-status-top"><div><span class="cap-pill '+esc(r.status)+'">'+esc(statuses[r.status]||'Awaiting review')+'</span><h3 style="margin:15px 0 5px">'+esc(r.project_title)+'</h3><p style="font-size:12px;color:var(--muted);margin:0">Submitted '+date(r.created_at)+'</p></div></div>';
 if(['submitted','processing','review_error','needs_manual_review'].includes(r.status))html+='<p class="lp-notice" style="margin-top:18px">AI assesses your project first and publishes feedback here. If automated assessment is unavailable or inconclusive, your submission is sent to a tutor for manual grading.</p>';
 if(['approved','needs_revision'].includes(r.status)){if(Number.isFinite(r.score)){html+='<div class="cap-review-score"><strong>'+r.score+'<span style="font-size:19px">/100</span></strong><div><b>'+(r.score>=70?'Passing score':'Below the 70-point threshold')+'</b><small>Assessment published · '+date(r.reviewed_at)+'</small></div></div><div class="cap-score-rows">';for(const [key,max] of Object.entries(RULES)){const score=Number(r.score_breakdown?.[key]||0);html+='<div class="cap-score-row"><span>'+LABELS[key]+'</span><b>'+score+' / '+max+'</b><div><span style="width:'+Math.min(100,100*score/max)+'%"></span></div></div>'}html+='</div>'}html+='<p style="line-height:1.8;font-size:13px;color:var(--muted)">'+esc(r.review_summary||'')+'</p><div class="cap-feedback-grid">'+feedbackCard('What worked well',r.strengths)+feedbackCard('What to improve',r.improvements)+'</div>'+feedbackCard('Next steps',r.next_steps);if(r.evidence_notes)html+='<p class="lp-notice"><b>Evidence notes:</b> '+esc(r.evidence_notes)+'</p>';if(r.status==='needs_revision')html+='<p class="lp-notice"><strong>Revision required.</strong> Improve your project using these remarks, then use the submission form to upload a new attempt. Previous feedback remains available below.</p>'}if(submissionHistory.length>1){html+='<section class="cap-attempt-history" aria-label="Previous assessment attempts"><h3>Submission history</h3><ol>';submissionHistory.forEach((item,i)=>{html+='<li><strong>Attempt '+(submissionHistory.length-i)+'</strong> · '+esc(date(item.created_at))+' · '+esc(item.status==='needs_revision'?'Revision required':item.status==='approved'?'Passed':'Awaiting assessment')+(Number.isFinite(item.score)?' · '+item.score+'/100':'')+(item.review_summary?'<p>'+esc(item.review_summary)+'</p>':'')+(Array.isArray(item.improvements)&&item.improvements.length?feedbackCard('Areas to improve',item.improvements):'')+'</li>'});html+='</ol></section>'}node.innerHTML=html}
 function renderCertificate(){const cert=currentCertificate,msg=el('certificateMessage'),container=el('certificateContainer'),controls=el('certificateControls');if(!cert||cert.status!=='active'||cert.course_slug!==course){msg.hidden=false;container.hidden=true;controls.hidden=true;msg.textContent=currentReview?.status==='approved'?'Your passing review was published. If your certificate does not appear, refresh this page or contact your instructor.':'Your certificate appears after a verified passing AI or instructor assessment.';return}msg.hidden=true;container.hidden=false;controls.hidden=false;const payload={...cert,score:currentReview?.status==='approved'&&currentReview?.id===cert.capstone_submission_id?currentReview.score:null};try{window.DALP_CERT.mount(el('certificatePaper'),payload)}catch(e){console.error('Certificate rendering failed',e);msg.hidden=false;container.hidden=true;controls.hidden=true;msg.textContent='We could not display your certificate. Please reload the page.';return}const verify=window.DALP_CERT.verifyUrl(cert);el('verifyCertificate').href=verify;el('openCertificate').href='certificate.html?id='+encodeURIComponent(cert.certificate_id)}

 async function submit(e){e.preventDefault();if(loading||!user||!reviewLoaded||cloudDone!==10||(['submitted','processing','review_error','needs_manual_review','approved'].includes(currentReview?.status))){notice('Sign in and wait for course completion and submission checks before sending your project.','warning');return}const fullName=el('learnerName').value.trim(),title=el('projectTitle').value.trim(),summary=el('projectSummary').value.trim();if(fullName.length<3||fullName.length>90){notice('Enter your full certificate name (3–90 characters).','error');return}if(title.length<5||title.length>110){notice('Enter a project title (5–110 characters).','error');return}if(summary.length<80){notice('Describe your project in at least 80 characters.','error');return}if(!files.length){notice('Attach at least one project photo, screenshot, document or source file.','error');return}if(files.length>4||files.reduce((sum,f)=>sum+f.size,0)>32*1024*1024||files.some(validateFile)){notice('Review your attachments: maximum four supported files, 12 MB each and 32 MB total.','error');return}if(!files.some(f=>/^image\//.test(f.type)))notice('No photo selected. Images are preferred, but you may still submit supporting files.','warning');
 loading=true;toggleSubmit();el('submitCapstone').textContent='Uploading your evidence…';const submissionId=crypto.randomUUID(),uploaded=[];let recordSaved=false;try{const check=await DB().from('course_progress').select('week_no').eq('user_id',user.id).eq('course_slug',course).eq('completed',true);if(check.error)throw check.error;if(new Set((check.data||[]).map(row=>Number(row.week_no)).filter(n=>Number.isInteger(n)&&n>=1&&n<=10)).size!==10)throw Error('All ten weeks must be completed and synced first.');for(let i=0;i<files.length;i++){const f=files[i],ext=f.name.split('.').pop().toLowerCase(),path=`${user.id}/${submissionId}/${String(i+1).padStart(2,'0')}-${crypto.randomUUID().slice(0,8)}.${ext}`;notice('Uploading file '+(i+1)+' of '+files.length+'…');const result=await DB().storage.from('capstone-evidence').upload(path,f,{cacheControl:'3600',upsert:false,contentType:f.type||'application/octet-stream'});if(result.error)throw result.error;uploaded.push({path,name:f.name,mime:f.type||'application/octet-stream',size:f.size})}
 const row={id:submissionId,user_id:user.id,course_slug:course,learner_name:fullName,project_title:title,project_summary:summary,attachments:uploaded};const result=await DB().from('capstone_submissions').insert(row);if(result.error)throw result.error;recordSaved=true;files=[];renderFiles();el('capstoneForm').reset();el('summaryCount').textContent='0 / 4000';const updated=await refresh();notice(updated?'Project submitted. AI assessment is starting; if AI is unavailable, your instructor can grade the same submission.':'Project saved. AI assessment will start first; if unavailable, a tutor can grade your submission.','success');try{const graded=await fetch('/api/assessment-grade',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({submissionId})});const outcome=await graded.json().catch(()=>({}));if(outcome.status==='approved')notice('AI assessment complete: '+outcome.score+'/100. Your certificate is available on your learning dashboard.','success');else if(outcome.status==='needs_revision')notice('AI assessment complete: '+outcome.score+'/100. Please review your feedback and revise.','warning');else if(outcome.status==='needs_manual_review')notice('Your project is saved for instructor grading because automated verification was unavailable or inconclusive.','warning');else notice('Your project is saved. Check back for your assessment result.','success');await refresh()}catch(assessmentError){console.warn('AI assessment not completed',assessmentError);notice('Your submission is saved. If AI is unavailable, an instructor can assess it.','warning')} el('feedbackSection').scrollIntoView({behavior:'smooth',block:'start'});
 }catch(err){console.error('Submission error',err);if(recordSaved){notice('Your project was saved, but the page could not refresh. Please use Retry loading; do not submit again.','warning',true);reviewLoaded=false}else{notice('Your project could not be uploaded. Your selected files are still here, so you can try again.','error');if(uploaded.length){try{const cleanup=await DB().storage.from('capstone-evidence').remove(uploaded.map(f=>f.path));if(cleanup.error)console.warn('Capstone upload cleanup incomplete',cleanup.error)}catch(cleanupError){console.warn('Capstone upload cleanup incomplete',cleanupError)}}}}finally{loading=false;el('submitCapstone').textContent='Submit for assessment →';toggleSubmit()}}
 function init(){document.querySelectorAll('.cap-track').forEach(b=>{b.classList.toggle('active',b.dataset.course===course);b.setAttribute('aria-pressed',String(b.dataset.course===course));b.addEventListener('click',()=>{if(b.dataset.course!==course)choose(b.dataset.course)})});el('evidenceInput').addEventListener('change',e=>{addFiles([...e.target.files]);e.target.value=''});const zone=el('dropZone');['dragenter','dragover'].forEach(x=>zone.addEventListener(x,e=>{e.preventDefault();zone.classList.add('drag')}));['dragleave','drop'].forEach(x=>zone.addEventListener(x,e=>{e.preventDefault();zone.classList.remove('drag')}));zone.addEventListener('drop',e=>addFiles([...e.dataTransfer.files]));el('projectSummary').addEventListener('input',e=>el('summaryCount').textContent=e.target.value.length+' / 4000');el('capstoneForm').addEventListener('submit',submit);el('printCertificate').addEventListener('click',()=>{if(currentCertificate)window.print()});el('downloadCertificate').addEventListener('click',async()=>{if(!currentCertificate)return;const b=el('downloadCertificate');b.disabled=true;b.textContent='Preparing image…';try{await window.DALP_CERT.downloadPNG(el('certificatePaper'),{...currentCertificate,score:currentReview?.status==='approved'&&currentReview?.id===currentCertificate.capstone_submission_id?currentReview.score:null})}catch(e){console.error(e);notice('We could not prepare your image. Please use Print / Save as PDF.','warning')}finally{b.disabled=false;b.textContent='Download PNG'}});refresh()}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
