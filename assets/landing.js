
(function(){
  const COURSE_MAP = {
    introduction:{ key:'dalpIntroductionProgressV1', title:'Introduction to Data Analysis', units:8, route:'courses/introduction.html' },
    excel:       { key:'excelRoadmapProgress', title:'Excel for Data Analysis', units:10, route:'courses/excel.html' },
    powerbi:     { key:'powerbiRoadmapProgress', title:'Power BI & DAX', units:10, route:'courses/powerbi.html' },
    sql:         { key:'sqlRoadmapProgress', title:'SQL for Data Analysis', units:10, route:'courses/sql.html' },
    ai:          { key:'aiRoadmapProgress', title:'AI Integration in Data Analysis', units:10, route:'courses/ai.html' }
  };

  function safeLocalProgress(key){
    try{
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value && typeof value === 'object' ? value : {};
    }catch(e){
      return {};
    }
  }

  function countCompleted(progress){
    return Object.values(progress || {}).filter(Boolean).length;
  }

  function paintCourse(slug, progress){
    const completed = countCompleted(progress);
    const units = COURSE_MAP[slug]?.units || 10;
    const pct = Math.max(0, Math.min(100, Math.round((completed / units) * 100)));

    const bar = document.getElementById(slug + '-progress');
    const label = document.getElementById(slug + '-progress-text');

    if(bar) bar.style.width = pct + '%';
    if(label) label.textContent = pct + '%';
  }

  function paintLocalImmediately(){
    Object.entries(COURSE_MAP).forEach(([slug])=>{
      paintCourse(slug, safeLocalProgress(COURSE_MAP[slug].key));
    });
    updateResumePanel();
  }

  function updateResumePanel(progressMap = null, signedIn = false){
    const sourceProgress = progressMap || {};
    const candidates = Object.entries(COURSE_MAP).map(([slug, info]) => {
      const progress = sourceProgress[slug] || safeLocalProgress(info.key);
      const completed = countCompleted(progress);
      return { slug, completed, title: info.title, route: info.route, progress };
    });

    const best = candidates.sort((a,b)=> b.completed - a.completed)[0] || { completed:0, title:'Introduction to Data Analysis', route:'courses/introduction.html' };
    const titleEl = document.getElementById('resumeCourseName');
    const metaEl = document.getElementById('resumeCourseMeta');
    const linkEl = document.getElementById('resumeCourseLink');
    const countEl = document.getElementById('smartCompletedCount');
    const focusEl = document.getElementById('smartFocusLabel');
    const syncEl = document.getElementById('smartSyncState');

    if(titleEl) titleEl.textContent = best.title;
    if(metaEl){
      if(best.completed > 0){
        metaEl.textContent = `You have completed ${best.completed} unit${best.completed === 1 ? '' : 's'} in ${best.title}. Pick up the next lesson to keep the momentum going.`;
      }else{
        metaEl.textContent = 'Start your learning journey with the first guided lesson and build confidence with a clear roadmap.';
      }
    }
    if(linkEl){
      linkEl.href = best.route;
      linkEl.textContent = 'Resume course →';
    }
    if(countEl) countEl.textContent = String(best.completed);
    if(focusEl) focusEl.textContent = best.title.startsWith('Introduction') ? 'Introduction' : best.title.split(' ').slice(0,2).join(' ');
    if(syncEl) syncEl.textContent = signedIn ? 'Cloud synced' : 'Local';
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
    const localProgressMap = {};
    Object.keys(COURSE_MAP).forEach(slug => {
      localProgressMap[slug] = safeLocalProgress(COURSE_MAP[slug].key);
    });

    paintLocalImmediately();

    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAH_DB.client){
      setAccountState(false);
      updateResumePanel(localProgressMap, false);
      return;
    }

    try{
      const user = await window.ZAHProgressCloud.getUser();
      if(!user){
        setAccountState(false);
        updateResumePanel(localProgressMap, false);
        return;
      }

      setAccountState(true);

      const result = await window.ZAHProgressCloud.syncAll();

      if(!result || !result.courses) {
        updateResumePanel(localProgressMap, true);
        return;
      }

      const combined = {};
      Object.keys(COURSE_MAP).forEach(slug=>{
        const course = result.courses[slug];
        if(course && course.ok && course.progress){
          combined[slug] = course.progress;
          paintCourse(slug, course.progress);
        }else{
          combined[slug] = safeLocalProgress(COURSE_MAP[slug].key);
          paintCourse(slug, combined[slug]);
        }
      });

      updateResumePanel(combined, true);
    }catch(error){
      console.error('Landing-page cloud progress refresh failed:', error);
      updateResumePanel(localProgressMap, false);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', refreshFromCloud, {once:true});
  }else{
    refreshFromCloud();
  }

  window.addEventListener('pageshow', refreshFromCloud);
  window.addEventListener('focus', refreshFromCloud);
})();
