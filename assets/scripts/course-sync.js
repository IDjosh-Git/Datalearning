
(function(){
  const slug=window.ZAH_COURSE_SLUG;
  const courseTitle=window.ZAH_COURSE_TITLE;
  const localProgressKey=window.ZAH_PROGRESS_KEY;
  if(!slug || !courseTitle || !localProgressKey) return;

  let currentUser=null;
  let syncRunning=false;

  function addBadge(){
    if(document.getElementById('zah-sync-badge')) return;
    const b=document.createElement('button');
    b.id='zah-sync-badge';
    b.type='button';
    b.className='dlp-inline-sync';
    b.textContent='Checking saved progress…';
    b.title='Check or retry account sync';
    b.setAttribute('aria-live','polite');
    b.addEventListener('click',()=>runSync(true));
    // Keep status beside the learner's progress meter, never at page start.
    const host=document.querySelector('.sidebar-progress') || document.querySelector('.progress-card') || document.querySelector('.dl-lesson-rail-resources') || document.querySelector('.sidebar');
    const slot=document.createElement('div');
    slot.className='dlp-sync-slot';
    slot.appendChild(b);
    if(host) host.appendChild(slot);
    else document.body.appendChild(slot);
  }

  function badge(text,state='normal'){
    addBadge();
    const b=document.getElementById('zah-sync-badge');
    b.textContent=text;
    b.dataset.state=state;
    // Palette is controlled by the selected light/dark theme, never inline styles.
  }

  function timeLabel(value){
    try{
      return new Date(value).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    }catch(e){return ''}
  }

  function applyProgress(progress){
    const boxes=[...document.querySelectorAll('.completeBox')];
    boxes.forEach(cb=>cb.checked=!!progress[String(cb.dataset.week)]);
    const done=boxes.filter(cb=>cb.checked).length;
    const pct=boxes.length?Math.round(done/boxes.length*100):0;
    const fill=document.getElementById('progressFill');
    const text=document.getElementById('progressText');
    if(fill) fill.style.width=pct+'%';
    if(text) text.textContent=pct+'%';
    // Certificate unlock logic listens to local storage; cloud engine already
    // mirrored cloud progress into localStorage.
    document.dispatchEvent(new CustomEvent('zah:progress-applied',{detail:{slug,progress,pct}}));
  }

  async function runSync(manual=false){
    if(syncRunning) return;
    syncRunning=true;
    try{
      if(!window.ZAH_DB || !window.ZAH_DB.configured){
        badge('Progress saving unavailable','error');
        return;
      }

      currentUser=await window.ZAHProgressCloud.getUser();
      if(!currentUser){
        badge('Sign in to save progress','offline');
        if(manual) location.href='../auth.html?return='+encodeURIComponent(location.href);
        return;
      }

      badge('Saving progress…');
      const result=await window.ZAHProgressCloud.syncCourse(slug,{user:currentUser});
      if(!result.ok){
        badge('Couldn’t save yet — tap to retry','error');
        return;
      }

      applyProgress(result.progress);
      badge(`Progress saved • ${timeLabel(result.lastSync)}`);
    }catch(error){
      console.error('Course cloud sync failed',error);
      badge('Couldn’t update progress — tap to retry','error');
    }finally{
      syncRunning=false;
    }
  }

  async function saveChangedWeek(cb){
    const week=Number(cb.dataset.week);
    if(!week) return;

    // The page's original local listener also runs. Queueing/saving here
    // guarantees the cloud receives the exact user action.
    const result=await window.ZAHProgressCloud.saveWeek(slug,week,cb.checked,currentUser);
    if(result.ok){
      currentUser=result.user || currentUser;
      badge(`Progress saved • ${timeLabel(result.lastSync)}`);
    }else if(result.reason==='signed_out'){
      badge('Saved here • sign in to continue anywhere','offline');
    }else if(result.reason==='not_configured'){
      badge('Saved on this device • try again later','error');
    }else{
      badge('Saved on this device • will retry soon','error');
    }
  }

  async function saveQuiz(btn){
    if(!currentUser) currentUser=await window.ZAHProgressCloud.getUser();
    if(!currentUser) return;

    const quiz=btn.closest('.quiz');
    const weekSection=btn.closest('.week');
    if(!quiz || !weekSection) return;
    const week=Number((weekSection.id||'').replace('week',''));
    if(!week) return;

    const qs=[...quiz.querySelectorAll('.question')];
    let score=0,answered=0;
    qs.forEach(q=>{
      const chosen=q.querySelector('input[type=radio]:checked');
      if(chosen){
        answered++;
        if(chosen.value===q.dataset.answer) score++;
      }
    });

    const row={
      user_id:currentUser.id,
      course_slug:slug,
      week_no:week,
      score,
      answered,
      total:qs.length,
      percentage:qs.length ? Math.round(score/qs.length*100) : 0,
      submitted_at:new Date().toISOString()
    };

    try{
      const {error}=await window.ZAH_DB.client
        .from('quiz_results')
        .upsert(row,{onConflict:'user_id,course_slug,week_no'});
      if(error) throw error;
      badge(`Quiz saved • ${timeLabel(new Date())}`);
    }catch(error){
      console.error('Quiz sync failed',error);
      badge('Quiz completed • couldn’t update your account','error');
    }
  }

  // Queue every user change, even while signed out.
  document.addEventListener('change',e=>{
    if(e.target && e.target.classList.contains('completeBox')){
      setTimeout(()=>saveChangedWeek(e.target),25);
    }
  });

  document.addEventListener('click',e=>{
    const t=e.target?.closest?.('button');
    if(!t) return;


    if(t.classList.contains('gradeBtn')){
      setTimeout(()=>saveQuiz(t),100);
    }


    // The original page resets local progress programmatically and therefore
    // does not fire checkbox change events. Sync the resulting snapshot.
    if(t.id==='resetBtn'){
      setTimeout(async()=>{
        const progress={};
        document.querySelectorAll('.completeBox').forEach(cb=>{
          progress[String(cb.dataset.week)]=cb.checked;
        });
        const res=await window.ZAHProgressCloud.saveSnapshot(slug,progress,currentUser);
        if(res.ok) badge(`Changes saved • ${timeLabel(res.lastSync)}`);
        else if(res.reason==='signed_out') badge('Changes saved here • sign in to save to your account','offline');
        else badge('Changes saved here • update pending','error');
      },500);
    }
  },true);

  // Keep local-only actions made while the page is open queued.
  // Avoid repeated full-course reconciliation when rapidly switching windows.
  let lastAutoSync=0;
  const autoSync=()=>{if(Date.now()-lastAutoSync<90000)return;lastAutoSync=Date.now();runSync(false);};
  window.addEventListener('online',()=>{lastAutoSync=0;autoSync();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)autoSync();});
  window.addEventListener('pageshow',e=>{if(e.persisted)autoSync();});
  addBadge();
  autoSync();
})();
