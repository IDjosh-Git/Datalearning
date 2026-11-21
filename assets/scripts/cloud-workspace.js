/* Browser-persistence-free DataLearning workspace. UI keeps transient state in RAM; authenticated snapshots are stored under Supabase RLS. */
(()=>{'use strict';
 const records=new Map(),dirty=new Set(),revisions=new Map(),conflicts=new Map(),generations=new Map();let recoveredOwner="";let recoveryReady=Promise.resolve(),offlineStatus="cloud";let currentUser='',loading=null,saveTimer=0,serial=Promise.resolve(),lastSaveOk=false;
 // Only unsynchronised authenticated workspace changes are persisted locally.
 // IndexedDB is scoped by Supabase user ID; confirmed cloud records are removed.
 const DB_NAME='dalp-pending-drafts-v1', STORE='pending';
 let dbPromise;
 function db(){if(!('indexedDB' in window))return Promise.reject(Error('IndexedDB unavailable'));
  if(!dbPromise)dbPromise=new Promise((resolve,reject)=>{const r=indexedDB.open(DB_NAME,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE,{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});return dbPromise}
 async function pendingOp(mode,run){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction(STORE,mode),store=tx.objectStore(STORE);let result;try{result=run(store)}catch(e){reject(e);return}tx.oncomplete=()=>resolve(result?.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
 async function stash(key,value,revision){if(!currentUser)return false;try{await pendingOp('readwrite',st=>st.put({id:currentUser+':'+key,user_id:currentUser,key,value,revision,at:Date.now()}));return true}catch(e){console.warn('Draft recovery unavailable:',e);return false}}
 async function unStash(key,user=currentUser){if(!user)return;try{await pendingOp('readwrite',st=>st.delete(user+':'+key))}catch(e){console.warn('Pending draft cleanup unavailable:',e)}}
 async function recover(user){if(recoveredOwner===user)return true;try{const database=await db();const rows=await new Promise((resolve,reject)=>{const tx=database.transaction(STORE,'readonly'),r=tx.objectStore(STORE).getAll();r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error)});
   for(const row of rows){if(row.user_id!==user||!cloudKey(row.key))continue;if(dirty.has(row.key))continue;
    if(row.value===null)records.delete(row.key);else records.set(row.key,String(row.value));
    revisions.set(row.key,Number(row.revision)||0);markDirty(row.key);
   }recoveredOwner=user;return true;
  }catch(e){console.warn('Draft recovery unavailable:',e);return false}}
 function saveState(state){offlineStatus=state;window.dispatchEvent(new CustomEvent('dalp:save-status',{detail:{status:state}}));let el=document.getElementById('dalp-save-status');if(!el){el=document.createElement('div');el.id='dalp-save-status';el.setAttribute('role','status');el.style.cssText='position:fixed;bottom:12px;right:12px;z-index:99990;background:#fff;color:#023048;border:1px solid #e2dcd3;border-radius:8px;padding:7px 12px;font:12px system-ui;box-shadow:0 2px 12px #0b090922';document.body?.append(el)}if(el)el.textContent=({cloud:'Saved to cloud',device:'Saved on this device',syncing:'Synchronising…',conflict:'Action required: changes on another device',unsaved:'Unsaved: device storage unavailable'})[state]||state}
 const excluded=new Set(['dalpLastLearnerId','dalpGateUser','dalp-app-use-record']);
 const courseKeys=new Set(['dalpIntroductionProgressV1','excelRoadmapProgress','sqlRoadmapProgress','powerbiRoadmapProgress','tableauAcademyProgress','powerqueryAcademyProgress','statisticsAcademyProgress','pythonRoadmapProgress','aiRoadmapProgress']);
 const keyOk=k=>typeof k==='string'&&k.length>0&&k.length<=160&&!excluded.has(k);
 const cloudKey=k=>keyOk(k)&&!courseKeys.has(k)&&!k.startsWith('zahPending:')&&!k.startsWith('zahPendingAnonymous:')&&!k.startsWith('zahCloudMigration:')&&!k.startsWith('zahLastSync:');
 // Recover old device state once, without continuing to use persistent device storage.
 let legacyOwner='';try{legacyOwner=localStorage.getItem('dalpLastLearnerId')||''}catch{}
 const legacy=new Map();try {for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(keyOk(key)&&/^(dalp|zah|excelRoadmap|sqlRoadmap|powerbiRoadmap|tableauAcademy|powerqueryAcademy|statisticsAcademy|pythonRoadmap|aiRoadmap|data-learning|zahPending)/.test(key))legacy.set(key,localStorage.getItem(key));}}catch{}
 for(const [k,v] of legacy)records.set(k,v);
 const storage={get length(){return records.size},key(i){return [...records.keys()][i]??null},getItem(k){return records.has(String(k))?records.get(String(k)):null},setItem(k,v){k=String(k);if(!keyOk(k))return;records.set(k,String(v));if(cloudKey(k)){lastSaveOk=false;markDirty(k);{const owner=currentUser,value=records.get(k)??null,rev=revisions.get(k)||0;recoveryReady=recoveryReady.then(()=>owner===currentUser?stash(k,value,rev):false).then(ok=>{if(owner===currentUser)saveState(ok?"device":"unsaved")});schedule()}}},removeItem(k){k=String(k);records.delete(k);if(cloudKey(k)){lastSaveOk=false;markDirty(k);{const owner=currentUser,rev=revisions.get(k)||0;recoveryReady=recoveryReady.then(()=>owner===currentUser?stash(k,null,rev):false).then(ok=>{if(owner===currentUser)saveState(ok?"device":"unsaved")});schedule()}}},clear(){for(const key of [...records.keys()])this.removeItem(key)}};
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
 function markDirty(k){generations.set(k,(generations.get(k)||0)+1);dirty.add(k)}
 function schedule(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>void flush(),260)}
 async function clientUser(){const c=window.ZAH_DB?.client;if(!c)return null;try{const {data}=await c.auth.getUser();return data?.user||null}catch{return null}}
 async function flush(){
  // Serialise the complete transaction, including reading dirty keys. A second flush
  // must never capture an outdated revision while the first RPC is in flight.
  const write=async()=>{
   await recoveryReady;
   if(!dirty.size)return lastSaveOk;
   const client=window.ZAH_DB?.client,active=await clientUser(),user=active?.id||'';
   if(!client||!user||!currentUser||currentUser!==user){saveState('device');return false}
   saveState('syncing');let success=true;
   for(const k of [...dirty]){
    if(currentUser!==user)return false;
    if(conflicts.has(k)){success=false;continue}
    const value=records.has(k)?records.get(k):null,gen=generations.get(k)||0,rev=revisions.get(k)||0;
    try{
     const {data,error}=await client.rpc('save_workspace_cas',{p_key:k,p_value:value,p_expected_revision:rev});
     if(error)throw error;
     if(currentUser!==user)return false;
     const result=Array.isArray(data)?data[0]:data;
     if(!result?.saved){
      conflicts.set(k,{local:records.has(k)?records.get(k):null,remote:result?.current_value??null,revision:Number(result?.current_revision)||0});
      success=false;window.dispatchEvent(new CustomEvent('dalp:workspace-conflict',{detail:{key:k}}));showConflict(k);continue;
     }
     revisions.set(k,Number(result.current_revision)||rev+1);
     if((generations.get(k)||0)===gen){
      // An IndexedDB delete is safe only if no new edit was made while the RPC ran.
      await unStash(k,user);
      if(currentUser===user&&(generations.get(k)||0)===gen)dirty.delete(k);
      else if(currentUser===user){dirty.add(k);await stash(k,records.get(k)??null,revisions.get(k)||0)}
     }else{
      // A new local edit occurred during the network request: retain its recovery copy.
      await stash(k,records.get(k)??null,revisions.get(k)||0);
     }
    }catch(e){success=false;console.warn('Cloud workspace save pending:',e?.message||e)}
   }
   lastSaveOk=success&&!dirty.size;
   saveState(conflicts.size?'conflict':dirty.size?'device':'cloud');
   if(dirty.size&&!conflicts.size&&navigator.onLine)setTimeout(()=>{if(currentUser===user)void flush()},5000);
   return lastSaveOk;
  };
  serial=serial.then(write,write);return serial;
 }
 // Wait for the underlying write even when the automatic debounce has already completed.
 async function persist(key){
  clearTimeout(saveTimer);
  const done=dirty.size?await flush():await serial.then(()=>lastSaveOk,()=>false);
  return !!done && !dirty.has(key) && !!currentUser;
 }
 async function hydrate(){if(loading)return loading;loading=(async()=>{
  await (window.DALP_AUTH_RESTORE||Promise.resolve());const client=window.ZAH_DB?.client;const user=await clientUser();if(!client||!user)return false;
  if(currentUser&&currentUser!==user.id){records.clear();dirty.clear();revisions.clear();conflicts.clear();generations.clear();recoveredOwner="";lastSaveOk=false;}currentUser=user.id;await recover(user.id);
  if(legacyOwner&&legacyOwner!==user.id){for(const k of legacy.keys()){records.delete(k);try{localStorage.removeItem(k)}catch{}}legacy.clear();}
  const {data,error}=await client.from('learner_workspace_state').select('state_key,state_value,revision').eq('user_id',user.id).limit(1000);
  if(error){console.warn('Cloud workspace read unavailable:',error.message);return false;}
  const cloudKeys=new Set();(data||[]).forEach(row=>{if(!cloudKey(row.state_key))return;cloudKeys.add(row.state_key);if(!dirty.has(row.state_key))revisions.set(row.state_key,Number(row.revision)||0);if(!dirty.has(row.state_key)){if(row.state_value===null)records.delete(row.state_key);else records.set(row.state_key,String(row.state_value));}});
  for(const [k,v] of legacy){if(!cloudKey(k)||cloudKeys.has(k))continue;records.set(k,v);markDirty(k)}
  if(dirty.size){const saved=await flush();if(!saved){window.dispatchEvent(new CustomEvent("dalp:cloud-hydrated"));return false;}}
  if(!(await migrateLegacyProgress(client,user.id)))return false;
  // Remove legacy persistent values only after cloud sync; progress is also read directly from course_progress.
  try {for(const k of legacy.keys()){if(courseKeys.has(k))continue;localStorage.removeItem(k)}for(const k of [...legacy.keys()])legacy.delete(k);localStorage.removeItem('dalpLastLearnerId')}catch{}
  window.dispatchEvent(new CustomEvent('dalp:cloud-hydrated'));window.dispatchEvent(new Event('storage'));
  return true;
 })().finally(()=>{loading=null});return loading}
 function showConflict(key){
  if(document.getElementById('dalp-workspace-conflict'))return;
  const entry=conflicts.get(key);if(!entry)return;
  const layer=document.createElement('div');layer.id='dalp-workspace-conflict';
  layer.setAttribute('role','alertdialog');layer.setAttribute('aria-modal','true');layer.setAttribute('aria-label','Learning changes conflict');
  layer.style.cssText='position:fixed;inset:0;z-index:2147483646;background:#023048c9;display:grid;place-items:center;padding:20px';
  const panel=document.createElement('div');panel.style.cssText='background:white;color:#023048;border-radius:14px;max-width:620px;width:100%;padding:24px;max-height:85vh;overflow:auto';
  const h=document.createElement('h2');h.textContent='Changes on another device';panel.append(h);
  const desc=document.createElement('p');desc.textContent='This learning item was changed elsewhere. Your unsaved version is preserved in this tab. Choose which version to keep; no change has been overwritten.';panel.append(desc);
  const label=document.createElement('p');label.textContent='Item: '+key;panel.append(label);
  const remote=document.createElement('textarea');remote.readOnly=true;remote.value=String(entry.remote??'');remote.style.cssText='width:100%;min-height:90px';remote.setAttribute('aria-label','Version saved on cloud');panel.append(remote);
  const local=document.createElement('textarea');local.readOnly=true;local.value=String(entry.local??'');local.style.cssText='width:100%;min-height:90px';local.setAttribute('aria-label','Your unsaved version');panel.append(local);
  for(const [caption,choice] of [['Keep cloud version','remote'],['Save my version','local']]){
   const b=document.createElement('button');b.type='button';b.textContent=caption;b.style.cssText='margin:8px;padding:10px;border:1px solid #770101;border-radius:8px';
   b.addEventListener('click',()=>{const item=conflicts.get(key);if(!item)return;revisions.set(key,item.revision);conflicts.delete(key);dirty.delete(key);
    if(choice==='remote'){void unStash(key);if(item.remote===null)records.delete(key);else records.set(key,String(item.remote));window.dispatchEvent(new CustomEvent('dalp:cloud-hydrated'));}
    else{if(item.local===null)records.delete(key);else records.set(key,String(item.local));markDirty(key);recoveryReady=recoveryReady.then(()=>stash(key,item.local,item.revision));schedule();}
    layer.remove();const next=conflicts.keys().next().value;if(next)showConflict(next);
   });panel.append(b);
  }
  layer.append(panel);document.body.append(layer);
 }
 function setOwner(userId){if(currentUser&&currentUser!==userId){records.clear();dirty.clear();revisions.clear();conflicts.clear();generations.clear();recoveredOwner="";lastSaveOk=false;}currentUser=userId||'';}
 window.DALP_STORAGE=storage;window.DALP_CLOUD_WORKSPACE={hydrate,flush,persist,setOwner,get ready(){return !!currentUser},get userId(){return currentUser},get saveStatus(){return offlineStatus}};
 window.addEventListener('dalp:auth-ready',()=>void hydrate());
 window.addEventListener('online',()=>{void hydrate().then(()=>flush())});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden){void hydrate();void flush();}});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void hydrate(),{once:true});else void hydrate();
 // Never register a service worker or CacheStorage for this application.
 if('serviceWorker'in navigator)void navigator.serviceWorker.getRegistrations().then(all=>Promise.all(all.filter(r=>{try{return new URL(r.scope).origin===location.origin}catch{return false}}).map(r=>r.unregister()))).catch(()=>{});
 if('caches'in window)void caches.keys().then(keys=>Promise.all(keys.filter(k=>/^dalp-public-/.test(k)).map(k=>caches.delete(k)))).catch(()=>{});
})();
