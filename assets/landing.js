
(function(){
  const COURSE_MAP = {
    introduction:{ key:'dalpIntroductionProgressV1', units:8 },
    excel:       { key:'excelRoadmapProgress', units:10 },
    powerbi:     { key:'powerbiRoadmapProgress', units:10 },
    sql:         { key:'sqlRoadmapProgress', units:10 }
  };

  function safeLocalProgress(key){
    try{
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value && typeof value === 'object' ? value : {};
    }catch(e){
      return {};
    }
  }

  function paintCourse(slug, progress){
    const completed = Object.values(progress || {}).filter(Boolean).length;
    const units = COURSE_MAP[slug]?.units || 10;
    const pct = Math.max(0, Math.min(100, Math.round((completed / units) * 100)));

    const bar = document.getElementById(slug + '-progress');
    const label = document.getElementById(slug + '-progress-text');

    if(bar) bar.style.width = pct + '%';
    if(label) label.textContent = pct + '%';
  }

  function paintLocalImmediately(){
    Object.entries(COURSE_MAP).forEach(([slug, info])=>{
      paintCourse(slug, safeLocalProgress(info.key));
    });
  }

  function setAccountState(signedIn){
    const desktop = document.getElementById('accountLink');
    const mobile = document.getElementById('mobileAccountLink');

    if(signedIn){
      if(desktop){
        desktop.textContent = 'My Account';
        desktop.href = 'account.html';
      }
      if(mobile){
        mobile.textContent = 'My Account';
        mobile.href = 'account.html';
      }
    }else{
      if(desktop){
        desktop.textContent = 'Sign In';
        desktop.href = 'auth.html';
      }
      if(mobile){
        mobile.textContent = 'Sign In';
        mobile.href = 'auth.html';
      }
    }
  }

  async function refreshFromCloud(){
    // Local progress is shown immediately so the page never appears blank.
    paintLocalImmediately();

    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAHProgressCloud){
      setAccountState(false);
      return;
    }

    try{
      const user = await window.ZAHProgressCloud.getUser();
      if(!user){
        setAccountState(false);
        return;
      }

      setAccountState(true);

      // syncAll migrates any unsynced local progress first, then returns the
      // authoritative Supabase progress for every course.
      const result = await window.ZAHProgressCloud.syncAll();

      if(!result || !result.courses) return;

      Object.keys(COURSE_MAP).forEach(slug=>{
        const course = result.courses[slug];
        if(course && course.ok && course.progress){
          paintCourse(slug, course.progress);
        }
      });
    }catch(error){
      console.error('Landing-page cloud progress refresh failed:', error);
      // Local progress stays visible if Supabase/network is temporarily unavailable.
    }
  }

  // Run after the page HTML and dependencies have loaded.
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', refreshFromCloud, {once:true});
  }else{
    refreshFromCloud();
  }

  // Refresh when returning from a course or switching back to this tab.
  window.addEventListener('pageshow', refreshFromCloud);
  window.addEventListener('focus', refreshFromCloud);
})();
