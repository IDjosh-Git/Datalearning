(function(){
  'use strict';
  const COURSE_MAP = {
    introduction: { key:'dalpIntroductionProgressV1', title:'Introduction to Data Analysis', units:8, unitLabel:'lessons' },
    excel:        { key:'excelRoadmapProgress', title:'Excel Data Analysis', units:10, unitLabel:'weeks' },
    sql:          { key:'sqlRoadmapProgress', title:'SQL for Data Analytics', units:10, unitLabel:'weeks' },
    powerbi:      { key:'powerbiRoadmapProgress', title:'Power BI', units:10, unitLabel:'weeks' },
    ai:           { key:'aiRoadmapProgress', title:'AI Integration in Data Analysis', units:10, unitLabel:'weeks' }
  };
  const MIGRATION_VERSION='v4';
  let allSyncPromise=null;

  function safeParse(value, fallback={}){ try { return JSON.parse(value || '') ?? fallback; } catch { return fallback; } }
  function readLocal(key){ return safeParse(localStorage.getItem(key), {}); }
  function writeLocal(key, progress){ try{ localStorage.setItem(key,JSON.stringify(progress||{})); }catch(_){} }
  function normalizedProgress(rows,totalUnits=10){
    const result={}; for(let w=1;w<=totalUnits;w++) result[String(w)]=false;
    (rows||[]).forEach(r=>{ const w=Number(r.week_no); if(w>=1&&w<=totalUnits) result[String(w)]=!!r.completed; });
    return result;
  }
  const pendingKey=(userId,slug)=>`zahPending:${userId}:${slug}`;
  const anonPendingKey=slug=>`zahPendingAnonymous:${slug}`;
  const migratedKey=(userId,slug)=>`zahCloudMigration:${MIGRATION_VERSION}:${userId}:${slug}`;
  function readPending(key){ return safeParse(localStorage.getItem(key),{}); }
  function writePending(key,value){ try{ if(value&&Object.keys(value).length)localStorage.setItem(key,JSON.stringify(value)); else localStorage.removeItem(key); }catch(_){} }

  async function getUser(){
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client) return null;
    try{ const {data,error}=await window.ZAH_DB.client.auth.getUser(); if(error) throw error; return data?.user||null; }
    catch(e){ console.error('Unable to read Supabase user',e); return null; }
  }

  function queueAnonymous(slug,week,completed){ const key=anonPendingKey(slug),p=readPending(key); p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()}; writePending(key,p); }
  function queueForUser(userId,slug,week,completed){ const key=pendingKey(userId,slug),p=readPending(key); p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()}; writePending(key,p); }
  function transferAnonymousPending(userId,slug){
    const anon=readPending(anonPendingKey(slug)); if(!Object.keys(anon).length)return;
    const key=pendingKey(userId,slug),current=readPending(key); Object.assign(current,anon); writePending(key,current); writePending(anonPendingKey(slug),{});
  }
  async function fetchCourseRows(userId,slug){
    const {data,error}=await window.ZAH_DB.client.from('course_progress').select('week_no,completed,completed_at,updated_at').eq('user_id',userId).eq('course_slug',slug).order('week_no');
    if(error) throw error; return data||[];
  }
  async function upsertRows(rows){
    if(!rows.length)return;
    const {error}=await window.ZAH_DB.client.from('course_progress').upsert(rows,{onConflict:'user_id,course_slug,week_no'});
    if(error) throw error;
  }
  function rowFor(userId,slug,week,completed,changedAt){ const now=changedAt||new Date().toISOString(); return {user_id:userId,course_slug:slug,week_no:Number(week),completed:!!completed,completed_at:completed?now:null,updated_at:now}; }

  async function syncCourse(slug,opts={}){
    const info=COURSE_MAP[slug]; if(!info) throw new Error(`Unknown course: ${slug}`);
    const local=readLocal(info.key);
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client) return {ok:false,reason:'not_configured',user:null,progress:local};
    const user=opts.user||await getUser(); if(!user) return {ok:false,reason:'signed_out',user:null,progress:local};

    transferAnonymousPending(user.id,slug);
    let remoteRows=await fetchCourseRows(user.id,slug);
    const remoteByWeek=new Map(remoteRows.map(r=>[String(r.week_no),r]));
    const pending=readPending(pendingKey(user.id,slug));
    const migrated=localStorage.getItem(migratedKey(user.id,slug))==='1';
    const rowsToPush=[];

    // Explicit unsynced actions always win first, including deliberate unchecks.
    for(const [week,change] of Object.entries(pending)) rowsToPush.push(rowFor(user.id,slug,week,change.completed,change.changed_at));

    // Recover legacy device progress once for this app version. Only completed
    // local units are migrated, so an old browser can never erase newer cloud progress.
    if(opts.forceLegacyMigration||!migrated){
      for(let w=1;w<=info.units;w++){
        const key=String(w),remote=remoteByWeek.get(key);
        if(local[key]===true&&!pending[key]&&(!remote||remote.completed!==true)) rowsToPush.push(rowFor(user.id,slug,w,true,new Date().toISOString()));
      }
    }

    if(rowsToPush.length){ const dedup={}; rowsToPush.forEach(r=>dedup[String(r.week_no)]=r); await upsertRows(Object.values(dedup)); }
    writePending(pendingKey(user.id,slug),{});
    try{ localStorage.setItem(migratedKey(user.id,slug),'1'); }catch(_){}

    // Cloud becomes the shared source of truth after recovery.
    remoteRows=await fetchCourseRows(user.id,slug);
    const progress=normalizedProgress(remoteRows,info.units); writeLocal(info.key,progress);
    const latest=(remoteRows||[]).map(r=>r.updated_at).filter(Boolean).sort().at(-1)||new Date().toISOString();
    try{ localStorage.setItem(`zahLastSync:${user.id}:${slug}`,latest); }catch(_){}
    return {ok:true,reason:'synced',user,progress,completed:Object.values(progress).filter(Boolean).length,percent:Math.round(Object.values(progress).filter(Boolean).length/info.units*100),lastSync:latest};
  }

  async function saveWeek(slug,week,completed,user=null){
    const info=COURSE_MAP[slug]; if(!info) throw new Error(`Unknown course: ${slug}`);
    const local=readLocal(info.key); local[String(week)]=!!completed; writeLocal(info.key,local);
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client){ queueAnonymous(slug,week,completed); return {ok:false,reason:'not_configured',progress:local}; }
    user=user||await getUser(); if(!user){ queueAnonymous(slug,week,completed); return {ok:false,reason:'signed_out',progress:local}; }
    queueForUser(user.id,slug,week,completed);
    try{
      await upsertRows([rowFor(user.id,slug,week,completed,new Date().toISOString())]);
      const p=readPending(pendingKey(user.id,slug)); delete p[String(week)]; writePending(pendingKey(user.id,slug),p);
      const now=new Date().toISOString(); try{localStorage.setItem(`zahLastSync:${user.id}:${slug}`,now)}catch(_){}
      return {ok:true,reason:'saved',user,lastSync:now,progress:local};
    }catch(error){ console.error('Cloud week save failed',error); return {ok:false,reason:'network_or_database',error,user,progress:local}; }
  }

  async function saveSnapshot(slug,progress,user=null){
    const info=COURSE_MAP[slug]; if(!info) throw new Error(`Unknown course: ${slug}`); writeLocal(info.key,progress);
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client){ Object.entries(progress).forEach(([w,v])=>queueAnonymous(slug,w,v)); return {ok:false,reason:'not_configured'}; }
    user=user||await getUser(); if(!user){ Object.entries(progress).forEach(([w,v])=>queueAnonymous(slug,w,v)); return {ok:false,reason:'signed_out'}; }
    const now=new Date().toISOString(),rows=[];
    for(let w=1;w<=info.units;w++){ const value=!!progress[String(w)]; queueForUser(user.id,slug,w,value); rows.push(rowFor(user.id,slug,w,value,now)); }
    try{ await upsertRows(rows); writePending(pendingKey(user.id,slug),{}); try{localStorage.setItem(`zahLastSync:${user.id}:${slug}`,now)}catch(_){} return {ok:true,reason:'saved',lastSync:now}; }
    catch(error){ console.error('Cloud snapshot save failed',error); return {ok:false,reason:'network_or_database',error}; }
  }

  async function syncAll(opts={}){
    if(allSyncPromise&&!opts.forceLegacyMigration) return allSyncPromise;
    const task=(async()=>{
      const user=opts.user||await getUser(); if(!user)return {ok:false,reason:'signed_out',user:null,courses:{}};
      const courses={};
      for(const slug of Object.keys(COURSE_MAP)){
        try{ courses[slug]=await syncCourse(slug,{user,forceLegacyMigration:!!opts.forceLegacyMigration}); }
        catch(error){ console.error(`Sync failed for ${slug}`,error); courses[slug]={ok:false,reason:'error',error,progress:readLocal(COURSE_MAP[slug].key)}; }
      }
      return {ok:Object.values(courses).every(x=>x.ok),user,courses};
    })();
    if(!opts.forceLegacyMigration) allSyncPromise=task;
    try{return await task;}finally{if(allSyncPromise===task)allSyncPromise=null;}
  }

  // Used immediately after authentication so old on-device progress is pushed
  // before the browser navigates away from the sign-in page.
  async function recoverCurrentDevice(user){ return syncAll({user:user||null,forceLegacyMigration:true}); }

  window.ZAHProgressCloud={COURSE_MAP,MIGRATION_VERSION,getUser,readLocal,writeLocal,queueAnonymous,queueForUser,syncCourse,saveWeek,saveSnapshot,syncAll,recoverCurrentDevice};
})();
