
(async function(){
  if(!window.ZAHProgressCloud) return;

  const mapping={
    excel:{key:'excelRoadmapProgress'},
    sql:{key:'sqlRoadmapProgress'},
    powerbi:{key:'powerbiRoadmapProgress'}
  };

  function paint(slug,progress){
    const done=Object.values(progress||{}).filter(Boolean).length;
    const pct=Math.round(done/10*100);
    const fill=document.getElementById(slug+'-progress');
    const text=document.getElementById(slug+'-progress-text');
    if(fill) fill.style.width=pct+'%';
    if(text) text.textContent=pct+'%';
  }

  // Show local immediately, then replace with Supabase values once loaded.
  for(const [slug,info] of Object.entries(mapping)){
    paint(slug,window.ZAHProgressCloud.readLocal(info.key));
  }

  if(!window.ZAH_DB?.configured) return;

  try{
    const result=await window.ZAHProgressCloud.syncAll();
    if(!result.user) return;

    for(const slug of Object.keys(mapping)){
      const course=result.courses[slug];
      if(course?.ok) paint(slug,course.progress);
    }

    const a=document.getElementById('accountLink');
    const m=document.getElementById('mobileAccountLink');
    if(a){a.textContent='My Account';a.href='account.html'}
    if(m){m.textContent='My Account';m.href='account.html'}
  }catch(error){
    console.error('Portal cloud progress load failed',error);
  }
})();
