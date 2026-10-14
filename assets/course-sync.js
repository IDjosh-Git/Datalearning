
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
    b.style.cssText='position:fixed;right:18px;bottom:18px;z-index:9998;background:#254559;color:white;padding:10px 13px;border:0;border-radius:12px;font:700 12px system-ui;box-shadow:0 10px 25px rgba(20,45,58,.22);cursor:pointer';
    b.textContent='Checking cloud sync…';
    b.title='Tap to sync now';
    b.addEventListener('click',()=>runSync(true));
    document.body.appendChild(b);
  }

  function badge(text,state='normal'){
    addBadge();
    const b=document.getElementById('zah-sync-badge');
    b.textContent=text;
    b.dataset.state=state;
    b.style.background=state==='error'?'#9b3b3b':state==='offline'?'#6c5a2c':'#254559';
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
        badge('Database not configured','error');
        return;
      }

      currentUser=await window.ZAHProgressCloud.getUser();
      if(!currentUser){
        badge('Sign in to sync','offline');
        if(manual) location.href='../auth.html?return='+encodeURIComponent(location.href);
        return;
      }

      badge('Syncing…');
      const result=await window.ZAHProgressCloud.syncCourse(slug,{user:currentUser});
      if(!result.ok){
        badge('Sync unavailable — tap to retry','error');
        return;
      }

      applyProgress(result.progress);
      badge(`Synced • ${timeLabel(result.lastSync)}`);
    }catch(error){
      console.error('Course cloud sync failed',error);
      badge('Sync error — tap to retry','error');
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
      badge(`Synced • ${timeLabel(result.lastSync)}`);
    }else if(result.reason==='signed_out'){
      badge('Saved on this device • sign in to sync','offline');
    }else if(result.reason==='not_configured'){
      badge('Saved locally • database unavailable','error');
    }else{
      badge('Saved locally • cloud retry pending','error');
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
      badge(`Quiz synced • ${timeLabel(new Date())}`);
    }catch(error){
      console.error('Quiz sync failed',error);
      badge('Quiz saved on page • cloud error','error');
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
        if(res.ok) badge(`Reset synced • ${timeLabel(res.lastSync)}`);
        else if(res.reason==='signed_out') badge('Reset saved locally • sign in to sync','offline');
        else badge('Reset pending cloud sync','error');
      },500);
    }
  },true);

  // Keep local-only actions made while the page is open queued.
  window.addEventListener('online',()=>runSync(false));
  window.addEventListener('focus',()=>runSync(false));
  window.addEventListener('pageshow',()=>runSync(false));

  addBadge();
  runSync(false);
})();
