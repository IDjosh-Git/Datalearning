/* Browser-persistence-free DataLearning workspace. UI keeps transient state in RAM; authenticated snapshots are stored under Supabase RLS. */
(()=>{'use strict';
 const records=new Map(),dirty=new Set();let currentUser='',loading=null,saveTimer=0,serial=Promise.resolve();
 const excluded=new Set(['dalpLastLearnerId','dalpGateUser','dalp-app-use-record']);
 const courseKeys=new Set(['dalpIntroductionProgressV1','excelRoadmapProgress','sqlRoadmapProgress','powerbiRoadmapProgress','tableauAcademyProgress','powerqueryAcademyProgress','statisticsAcademyProgress','pythonRoadmapProgress','aiRoadmapProgress']);
 const keyOk=k=>typeof k==='string'&&k.length>0&&k.length<=160&&!excluded.has(k);
 const cloudKey=k=>keyOk(k)&&!courseKeys.has(k)&&!k.startsWith('zahPending:')&&!k.startsWith('zahPendingAnonymous:')&&!k.startsWith('zahCloudMigration:')&&!k.startsWith('zahLastSync:');
 // Recover old device state once, without continuing to use persistent device storage.
 let legacyOwner='';try{legacyOwner=localStorage.getItem('dalpLastLearnerId')||''}catch{}
 const legacy=new Map();try {for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(keyOk(key)&&/^(dalp|zah|excelRoadmap|sqlRoadmap|powerbiRoadmap|tableauAcademy|powerqueryAcademy|statisticsAcademy|pythonRoadmap|aiRoadmap|data-learning|zahPending)/.test(key))legacy.set(key,localStorage.getItem(key));}}catch{}
 for(const [k,v] of legacy)records.set(k,v);
 const storage={get length(){return records.size},key(i){return [...records.keys()][i]??null},getItem(k){return records.has(String(k))?records.get(String(k)):null},setItem(k,v){k=String(k);if(!keyOk(k))return;records.set(k,String(v));if(cloudKey(k)){dirty.add(k);schedule()}},removeItem(k){k=String(k);records.delete(k);if(cloudKey(k)){dirty.add(k);schedule()}},clear(){for(const key of [...records.keys()])this.removeItem(key)}};
 const courseNames={'dalpIntroductionProgressV1':'introduction','excelRoadmapProgress':'excel','sqlRoadmapProgress':'sql','powerbiRoadmapProgress':'powerbi','tableauAcademyProgress':'tableau','powerqueryAcademyProgress':'powerquery','statisticsAcademyProgress':'statistics','pythonRoadmapProgress':'python','aiRoadmapProgress':'ai'};
 async function migrateLegacyProgress(client,user){
  const candidates=[...legacy.keys()].filter(k=>courseKeys.has(k));if(!candidates.length)return true;
  try{
   const {data,error}=await client.from('course_progress').select('course_slug,week_no,completed').eq('user_id',user).in('course_slug',candidates.map(k=>courseNames[k]));if(error)throw error;
   const present=new Set((data||[]).map(row=>row.course_slug+':'+row.week_no));const changes=[];
   for(const key of candidates){const slug=courseNames[key];let local={};try{local=JSON.parse(legacy.get(key)||'{}')}catch{}
    for(let week=1;week<=10;week++)if(local[String(week)]===true&&!present.has(slug+':'+week)){
      const now=new Date().toISOString();changes.push({user_id:user,course_slug:slug,week_no:week,completed:true,completed_at:now,updated_at:now});
    }
   }
   if(changes.length){const {error:saveError}=await client.from('course_progress').upsert(changes,{onConflict:'user_id,course_slug,week_no'});if(saveError)throw saveError;}
   for(const key of candidates){try{localStorage.removeItem(key)}catch{}legacy.delete(key)}return true;
  }catch(e){console.warn('Previous browser course data remains pending cloud import:',e?.message||e);return false}
 }
 function schedule(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>void flush(),260)}
 async function clientUser(){const c=window.ZAH_DB?.client;if(!c)return null;try{const {data}=await c.auth.getUser();return data?.user||null}catch{return null}}
 async function flush(){if(!dirty.size)return false;const client=window.ZAH_DB?.client,user=currentUser||((await clientUser())?.id||'');if(!client||!user)return false;currentUser=user;
  const keys=[...dirty];keys.forEach(k=>dirty.delete(k));
  const write=async()=>{
   const upserts=[],deletes=[];for(const k of keys){if(records.has(k))upserts.push({user_id:user,state_key:k,state_value:records.get(k),updated_at:new Date().toISOString()});else deletes.push(k)}
   try {if(upserts.length){const {error}=await client.from('learner_workspace_state').upsert(upserts,{onConflict:'user_id,state_key'});if(error)throw error;}
    if(deletes.length){const {error}=await client.from('learner_workspace_state').delete().eq('user_id',user).in('state_key',deletes);if(error)throw error;}
    return true;
   }catch(e){keys.forEach(k=>dirty.add(k));console.warn('Cloud workspace save failed; changes are held in memory for retry:',e?.message||e);return false}
  };
  serial=serial.then(write,write);return serial;
 }
 async function hydrate(){if(loading)return loading;loading=(async()=>{
  await (window.DALP_AUTH_RESTORE||Promise.resolve());const client=window.ZAH_DB?.client;const user=await clientUser();if(!client||!user)return false;
  if(currentUser&&currentUser!==user.id){records.clear();dirty.clear();}currentUser=user.id;
  if(legacyOwner&&legacyOwner!==user.id){for(const k of legacy.keys()){records.delete(k);try{localStorage.removeItem(k)}catch{}}legacy.clear();}
  const {data,error}=await client.from('learner_workspace_state').select('state_key,state_value').eq('user_id',user.id).limit(1000);
  if(error){console.warn('Cloud workspace read unavailable:',error.message);return false;}
  const cloudKeys=new Set();(data||[]).forEach(row=>{if(!cloudKey(row.state_key))return;cloudKeys.add(row.state_key);if(!dirty.has(row.state_key))records.set(row.state_key,String(row.state_value??''));});
  for(const [k,v] of legacy){if(!cloudKey(k)||cloudKeys.has(k))continue;records.set(k,v);dirty.add(k)}
  if(dirty.size){const saved=await flush();if(!saved)return false;}
  if(!(await migrateLegacyProgress(client,user.id)))return false;
  // Remove legacy persistent values only after cloud sync; progress is also read directly from course_progress.
  try {for(const k of legacy.keys()){if(courseKeys.has(k))continue;localStorage.removeItem(k)}for(const k of [...legacy.keys()])legacy.delete(k);localStorage.removeItem('dalpLastLearnerId')}catch{}
  window.dispatchEvent(new CustomEvent('dalp:cloud-hydrated'));window.dispatchEvent(new Event('storage'));
  return true;
 })().finally(()=>{loading=null});return loading}
 function setOwner(userId){if(currentUser&&currentUser!==userId){records.clear();dirty.clear();}currentUser=userId||'';}
 window.DALP_STORAGE=storage;window.DALP_CLOUD_WORKSPACE={hydrate,flush,setOwner,get ready(){return !!currentUser},get userId(){return currentUser}};
 window.addEventListener('dalp:auth-ready',()=>void hydrate());
 window.addEventListener('online',()=>void flush());
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void hydrate(),{once:true});else void hydrate();
 // Never register a service worker or CacheStorage for this application.
 if('serviceWorker'in navigator)void navigator.serviceWorker.getRegistrations().then(all=>Promise.all(all.filter(r=>{try{return new URL(r.scope).origin===location.origin}catch{return false}}).map(r=>r.unregister()))).catch(()=>{});
 if('caches'in window)void caches.keys().then(keys=>Promise.all(keys.filter(k=>/^dalp-public-/.test(k)).map(k=>caches.delete(k)))).catch(()=>{});
})();
