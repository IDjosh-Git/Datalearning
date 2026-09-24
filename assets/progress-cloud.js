
(function(){
  const COURSE_MAP = {
    introduction: { key:'dalpIntroductionProgressV1', title:'Introduction to Data Analysis', units:8, unitLabel:'lessons' },
    excel:        { key:'excelRoadmapProgress', title:'Excel Data Analysis', units:10, unitLabel:'weeks' },
    sql:          { key:'sqlRoadmapProgress', title:'SQL for Data Analytics', units:10, unitLabel:'weeks' },
    powerbi:      { key:'powerbiRoadmapProgress', title:'Power BI', units:10, unitLabel:'weeks' }
  };

  function safeParse(value, fallback={}){
    try { return JSON.parse(value || '') ?? fallback; }
    catch(e){ return fallback; }
  }

  function readLocal(key){
    return safeParse(localStorage.getItem(key), {});
  }

  function writeLocal(key, progress){
    localStorage.setItem(key, JSON.stringify(progress || {}));
  }

  function normalizedProgress(rows, totalUnits=10){
    const result={};
    for(let w=1;w<=totalUnits;w++) result[String(w)] = false;
    (rows||[]).forEach(r=>{
      const w=Number(r.week_no);
      if(w>=1 && w<=totalUnits) result[String(w)] = !!r.completed;
    });
    return result;
  }

  function pendingKey(userId, slug){
    return `zahPending:${userId}:${slug}`;
  }
  function anonPendingKey(slug){
    return `zahPendingAnonymous:${slug}`;
  }
  function migratedKey(userId, slug){
    return `zahCloudMigrationV2:${userId}:${slug}`;
  }

  function readPending(key){
    return safeParse(localStorage.getItem(key), {});
  }
  function writePending(key, value){
    if(value && Object.keys(value).length) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  }

  async function getUser(){
    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAH_DB.client) return null;
    try{
      const {data,error}=await window.ZAH_DB.client.auth.getUser();
      if(error) throw error;
      return data?.user || null;
    }catch(e){
      console.error('Unable to read Supabase user',e);
      return null;
    }
  }

  function queueAnonymous(slug, week, completed){
    const key=anonPendingKey(slug);
    const p=readPending(key);
    p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()};
    writePending(key,p);
  }

  function queueForUser(userId, slug, week, completed){
    const key=pendingKey(userId,slug);
    const p=readPending(key);
    p[String(week)]={completed:!!completed,changed_at:new Date().toISOString()};
    writePending(key,p);
  }

  function transferAnonymousPending(userId, slug){
    const anon=readPending(anonPendingKey(slug));
    if(!Object.keys(anon).length) return;
    const key=pendingKey(userId,slug);
    const current=readPending(key);
    Object.assign(current,anon);
    writePending(key,current);
    localStorage.removeItem(anonPendingKey(slug));
  }

  async function fetchCourseRows(userId, slug){
    const {data,error}=await window.ZAH_DB.client
      .from('course_progress')
      .select('week_no,completed,completed_at,updated_at')
      .eq('user_id',userId)
      .eq('course_slug',slug)
      .order('week_no');
    if(error) throw error;
    return data || [];
  }

  async function upsertRows(rows){
    if(!rows.length) return;
    const {error}=await window.ZAH_DB.client
      .from('course_progress')
      .upsert(rows,{onConflict:'user_id,course_slug,week_no'});
    if(error) throw error;
  }

  function rowFor(userId,slug,week,completed,changedAt){
    const now=changedAt || new Date().toISOString();
    return {
      user_id:userId,
      course_slug:slug,
      week_no:Number(week),
      completed:!!completed,
      completed_at:completed ? now : null,
      updated_at:now
    };
  }

  async function syncCourse(slug, opts={}){
    const info=COURSE_MAP[slug];
    if(!info) throw new Error(`Unknown course: ${slug}`);
    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAH_DB.client){
      return {ok:false,reason:'not_configured',user:null,progress:readLocal(info.key)};
    }

    const user=opts.user || await getUser();
    if(!user){
      return {ok:false,reason:'signed_out',user:null,progress:readLocal(info.key)};
    }

    transferAnonymousPending(user.id,slug);

    let remoteRows=await fetchCourseRows(user.id,slug);
    const remoteByWeek=new Map(remoteRows.map(r=>[String(r.week_no),r]));
    const local=readLocal(info.key);
    const migrated=localStorage.getItem(migratedKey(user.id,slug)) === '1';
    const pending=readPending(pendingKey(user.id,slug));
    const rowsToPush=[];

    // 1) Push explicit unsynced changes first. These are authoritative.
    for(const [week,change] of Object.entries(pending)){
      rowsToPush.push(rowFor(user.id,slug,week,change.completed,change.changed_at));
    }

    // 2) One-time migration for progress created before cloud sync existed.
    // Completed local weeks are preserved so the user's current device does
    // not lose earlier work. This runs only once per user/device/course.
    if(!migrated){
      for(let w=1;w<=info.units;w++){
        const key=String(w);
        if(local[key] === true && !pending[key]){
          const remote=remoteByWeek.get(key);
          if(!remote || remote.completed !== true){
            rowsToPush.push(rowFor(user.id,slug,w,true,new Date().toISOString()));
          }
        }
      }
    }

    if(rowsToPush.length){
      // Deduplicate by week; later row wins.
      const dedup={};
      rowsToPush.forEach(r=>dedup[String(r.week_no)]=r);
      await upsertRows(Object.values(dedup));
    }

    // Only clear pending after successful write.
    writePending(pendingKey(user.id,slug),{});
    localStorage.setItem(migratedKey(user.id,slug),'1');

    // 3) Supabase is now the source of truth.
    remoteRows=await fetchCourseRows(user.id,slug);
    const progress=normalizedProgress(remoteRows,info.units);
    writeLocal(info.key,progress);

    const latest=(remoteRows||[])
      .map(r=>r.updated_at)
      .filter(Boolean)
      .sort()
      .at(-1) || new Date().toISOString();

    localStorage.setItem(`zahLastSync:${user.id}:${slug}`,latest);

    return {
      ok:true,
      reason:'synced',
      user,
      progress,
      completed:Object.values(progress).filter(Boolean).length,
      percent:Math.round(Object.values(progress).filter(Boolean).length/info.units*100),
      lastSync:latest
    };
  }

  async function saveWeek(slug, week, completed, user=null){
    const info=COURSE_MAP[slug];
    if(!info) throw new Error(`Unknown course: ${slug}`);

    // Always preserve the user's action locally immediately.
    const local=readLocal(info.key);
    local[String(week)]=!!completed;
    writeLocal(info.key,local);

    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAH_DB.client){
      queueAnonymous(slug,week,completed);
      return {ok:false,reason:'not_configured',progress:local};
    }

    user=user || await getUser();
    if(!user){
      queueAnonymous(slug,week,completed);
      return {ok:false,reason:'signed_out',progress:local};
    }

    queueForUser(user.id,slug,week,completed);
    try{
      await upsertRows([rowFor(user.id,slug,week,completed,new Date().toISOString())]);
      const p=readPending(pendingKey(user.id,slug));
      delete p[String(week)];
      writePending(pendingKey(user.id,slug),p);
      const now=new Date().toISOString();
      localStorage.setItem(`zahLastSync:${user.id}:${slug}`,now);
      return {ok:true,reason:'saved',user,lastSync:now,progress:local};
    }catch(error){
      console.error('Cloud week save failed',error);
      return {ok:false,reason:'network_or_database',error,user,progress:local};
    }
  }

  async function saveSnapshot(slug, progress, user=null){
    const info=COURSE_MAP[slug];
    if(!info) throw new Error(`Unknown course: ${slug}`);
    writeLocal(info.key,progress);

    if(!window.ZAH_DB || !window.ZAH_DB.configured || !window.ZAH_DB.client){
      Object.entries(progress).forEach(([w,v])=>queueAnonymous(slug,w,v));
      return {ok:false,reason:'not_configured'};
    }
    user=user || await getUser();
    if(!user){
      Object.entries(progress).forEach(([w,v])=>queueAnonymous(slug,w,v));
      return {ok:false,reason:'signed_out'};
    }

    const now=new Date().toISOString();
    const rows=[];
    for(let w=1;w<=info.units;w++){
      const value=!!progress[String(w)];
      queueForUser(user.id,slug,w,value);
      rows.push(rowFor(user.id,slug,w,value,now));
    }

    try{
      await upsertRows(rows);
      writePending(pendingKey(user.id,slug),{});
      localStorage.setItem(`zahLastSync:${user.id}:${slug}`,now);
      return {ok:true,reason:'saved',lastSync:now};
    }catch(error){
      console.error('Cloud snapshot save failed',error);
      return {ok:false,reason:'network_or_database',error};
    }
  }

  async function syncAll(){
    const user=await getUser();
    if(!user) return {ok:false,reason:'signed_out',user:null,courses:{}};
    const courses={};
    for(const slug of Object.keys(COURSE_MAP)){
      try{ courses[slug]=await syncCourse(slug,{user}); }
      catch(error){ courses[slug]={ok:false,reason:'error',error}; }
    }
    return {ok:Object.values(courses).every(x=>x.ok),user,courses};
  }

  window.ZAHProgressCloud={
    COURSE_MAP,
    getUser,
    readLocal,
    writeLocal,
    queueAnonymous,
    queueForUser,
    syncCourse,
    saveWeek,
    saveSnapshot,
    syncAll
  };
})();
