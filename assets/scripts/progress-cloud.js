(function(){
  'use strict';
  const COURSE_MAP = {
    introduction: { key:'dalpIntroductionProgressV1', title:'Data Analysis', units:10, unitLabel:'weeks' },
    excel:        { key:'excelRoadmapProgress', title:'Excel Data Analysis', units:10, unitLabel:'weeks' },
    sql:          { key:'sqlRoadmapProgress', title:'SQL for Data Analytics', units:10, unitLabel:'weeks' },
    powerbi:      { key:'powerbiRoadmapProgress', title:'Power BI', units:10, unitLabel:'weeks' },
    tableau:      { key:'tableauAcademyProgress', title:'Tableau', units:10, unitLabel:'weeks' },
    powerquery:   { key:'powerqueryAcademyProgress', title:'Power Query', units:10, unitLabel:'weeks' },
    statistics:   { key:'statisticsAcademyProgress', title:'Introductory Statistics', units:10, unitLabel:'weeks' },
    python:       { key:'pythonRoadmapProgress', title:'Python for Data Analytics', units:10, unitLabel:'weeks' },
    ai:           { key:'aiRoadmapProgress', title:'AI Integration in Data Analysis', units:10, unitLabel:'weeks' }
  };
  const MIGRATION_VERSION='v4';
  let allSyncPromise=null;
  // Serialize writes per course. Rapid mobile taps must not arrive at Supabase out of order.
  const courseWriteLanes=new Map();

  function safeParse(value, fallback={}){ try { return JSON.parse(value || '') ?? fallback; } catch { return fallback; } }
  function readLocal(key){ try{return safeParse(localStorage.getItem(key), {});}catch{return {};} }
  function writeLocal(key, progress){ try{ localStorage.setItem(key,JSON.stringify(progress||{})); }catch(_){} }
  function normalizedProgress(rows,totalUnits=10){
    const result={}; for(let w=1;w<=totalUnits;w++) result[String(w)]=false;
    (rows||[]).forEach(r=>{ const w=Number(r.week_no); if(w>=1&&w<=totalUnits) result[String(w)]=!!r.completed; });
    return result;
  }
  const pendingKey=(userId,slug)=>`zahPending:${userId}:${slug}`;
  const anonPendingKey=slug=>`zahPendingAnonymous:${slug}`;
  const migratedKey=(userId,slug)=>`zahCloudMigration:${MIGRATION_VERSION}:${userId}:${slug}`;
  function readPending(key){ try{return safeParse(localStorage.getItem(key),{});}catch{return {};} }
  function writePending(key,value){ try{ if(value&&Object.keys(value).length)localStorage.setItem(key,JSON.stringify(value)); else localStorage.removeItem(key); }catch(_){} }
  function clearSettledPending(key,submitted){
    const current=readPending(key);
    for(const [week,change] of Object.entries(submitted||{})){
      if(current[week] && current[week].changed_at===change.changed_at && current[week].completed===change.completed) delete current[week];
    }
    writePending(key,current);
  }

  async function getUser(){
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client) return null;
    // Reuse the identity already verified by the global auth gate this page load.
    // Database RLS still verifies the JWT independently on each cloud request.
    if(window.DALP_AUTH_USER?.id)return window.DALP_AUTH_USER;
    try{ const {data,error}=await window.ZAH_DB.client.auth.getUser(); if(error) throw error; return data?.user||null; }
    catch(e){ console.error('Unable to read Supabase user',e); return null; }
  }

  function queueAnonymous(slug,week,completed){ const key=anonPendingKey(slug),p=readPending(key); p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()}; writePending(key,p); }
  function queueForUser(userId,slug,week,completed){ const key=pendingKey(userId,slug),p=readPending(key); p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()}; writePending(key,p); }
  function transferAnonymousPending(userId,slug){
    const anon=readPending(anonPendingKey(slug)); if(!Object.keys(anon).length)return;
    const key=pendingKey(userId,slug),current=readPending(key);
    for(const [week,entry] of Object.entries(anon)){
      if(!current[week] || String(current[week].changed_at||'')<String(entry.changed_at||'')) current[week]=entry;
    }
    writePending(key,current); writePending(anonPendingKey(slug),{});
  }
  async function fetchCourseRows(userId,slug){
    const {data,error}=await window.ZAH_DB.client.from('course_progress').select('week_no,completed,completed_at,updated_at').eq('user_id',userId).eq('course_slug',slug).order('week_no');
    if(error) throw error; return data||[];
  }
  async function upsertRows(rows){
    if(!rows.length)return;
    const slug=String(rows[0].course_slug||'');
    const previous=courseWriteLanes.get(slug)||Promise.resolve();
    const task=previous.catch(()=>{}).then(async()=>{
      const {error}=await window.ZAH_DB.client.from('course_progress').upsert(rows,{onConflict:'user_id,course_slug,week_no'});
      if(error) throw error;
    });
    courseWriteLanes.set(slug,task);
    try{await task}finally{if(courseWriteLanes.get(slug)===task)courseWriteLanes.delete(slug);}
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
    let migrated=false; try{migrated=localStorage.getItem(migratedKey(user.id,slug))==='1';}catch(_){}
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

    if(rowsToPush.length){ const dedup={}; rowsToPush.forEach(r=>dedup[String(r.week_no)]=r); await upsertRows(Object.values(dedup));
      // Only re-fetch when pending or recovered work changed the remote rows.
      remoteRows=await fetchCourseRows(user.id,slug); }
    clearSettledPending(pendingKey(user.id,slug),pending);
    try{ localStorage.setItem(migratedKey(user.id,slug),'1'); }catch(_){}

    // Cloud becomes the shared source of truth after recovery.
    const progress=normalizedProgress(remoteRows,info.units); writeLocal(info.key,progress);
    const latest=(remoteRows||[]).map(r=>r.updated_at).filter(Boolean).sort().at(-1)||new Date().toISOString();
    try{ localStorage.setItem(`zahLastSync:${user.id}:${slug}`,latest); }catch(_){}
    return {ok:true,reason:'synced',user,progress,completed:Object.values(progress).filter(Boolean).length,percent:Math.round(Object.values(progress).filter(Boolean).length/info.units*100),lastSync:latest};
  }

  async function saveWeek(slug,week,completed,user=null){
    const info=COURSE_MAP[slug]; if(!info) throw new Error(`Unknown course: ${slug}`);
    if(!Number.isInteger(Number(week))||Number(week)<1||Number(week)>info.units)throw new RangeError('Invalid course unit');
    const local=readLocal(info.key); local[String(week)]=!!completed; writeLocal(info.key,local);
    if(!window.ZAH_DB?.configured||!window.ZAH_DB?.client){ queueAnonymous(slug,week,completed); return {ok:false,reason:'not_configured',progress:local}; }
    user=user||await getUser(); if(!user){ queueAnonymous(slug,week,completed); return {ok:false,reason:'signed_out',progress:local}; }
    queueForUser(user.id,slug,week,completed);
    const pendingKeyForCourse=pendingKey(user.id,slug);
    const captured=readPending(pendingKeyForCourse)[String(week)];
    try{
      await upsertRows([rowFor(user.id,slug,week,completed,captured?.changed_at)]);
      clearSettledPending(pendingKeyForCourse,{[String(week)]:captured});
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
    const captured=readPending(pendingKey(user.id,slug));
    try{ await upsertRows(rows); clearSettledPending(pendingKey(user.id,slug),captured); try{localStorage.setItem(`zahLastSync:${user.id}:${slug}`,now)}catch(_){} return {ok:true,reason:'saved',lastSync:now}; }
    catch(error){ console.error('Cloud snapshot save failed',error); return {ok:false,reason:'network_or_database',error}; }
  }

  async function syncAll(opts={}){
    if(allSyncPromise&&!opts.forceLegacyMigration) return allSyncPromise;
    const task=(async()=>{
      const user=opts.user||await getUser(); if(!user)return {ok:false,reason:'signed_out',user:null,courses:{}};
      // Each course is independent; parallel reads avoid five sequential network waits.
      const entries=await Promise.all(Object.keys(COURSE_MAP).map(async slug=>{
        try{return [slug,await syncCourse(slug,{user,forceLegacyMigration:!!opts.forceLegacyMigration})];}
        catch(error){console.error(`Sync failed for ${slug}`,error);return [slug,{ok:false,reason:'error',error,progress:readLocal(COURSE_MAP[slug].key)}];}
      }));
      const courses=Object.fromEntries(entries);
      return {ok:Object.values(courses).every(x=>x.ok),user,courses};
    })();
    if(!opts.forceLegacyMigration) allSyncPromise=task;
    try{return await task;}finally{if(allSyncPromise===task)allSyncPromise=null;}
  }

  // Import legacy device progress only once for each account, and never force a
  // reimport when changing accounts on shared browsers.
  async function recoverCurrentDevice(user){ return syncAll({user:user||null}); }

  window.addEventListener('dalp:online',()=>{if(window.ZAH_DB?.configured)syncAll().catch(error=>console.warn('Progress resync deferred',error));});
  window.ZAHProgressCloud={COURSE_MAP,MIGRATION_VERSION,getUser,readLocal,writeLocal,queueAnonymous,queueForUser,syncCourse,saveWeek,saveSnapshot,syncAll,recoverCurrentDevice};
})();
