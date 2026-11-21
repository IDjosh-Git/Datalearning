/* Authenticated, cloud-authoritative practice progress. Browser storage is only the
   in-memory DALP_STORAGE adapter; no persistent device copy is written here. */
(()=>{'use strict';
 const key='dalp-practice-v1';let user=null,client=null,ready=false,timer=0,writing=false,dirty=false,cache={};
 const local=()=>{try{return JSON.parse(window.DALP_STORAGE?.getItem(key)||'{}')||{}}catch{return {}}};
 const record=r=>({pass:!!(r?.pass??r?.passed),attempts:Math.max(0,Number(r?.attempts)||0),updated:Number(r?.updated)||Date.parse(r?.updated_at)||0});
 const merge=(a,b)=>({pass:!!(a.pass||b.pass),attempts:Math.max(a.attempts||0,b.attempts||0),updated:Math.max(a.updated||0,b.updated||0)});
 function notify(){document.dispatchEvent(new CustomEvent('dalp:practice-cloud-ready',{detail:{records:cache}}));}
 function schedule(state){if(!ready||!user)return;for(const [id,value] of Object.entries(state||local())){if(id==='__activeId'||!value||typeof value!=='object')continue;const next=record(value);cache[id]=merge(cache[id]||record({}),next);dirty=true;}if(dirty){clearTimeout(timer);timer=setTimeout(()=>void flush(),900);}}
 async function flush(){if(!ready||!dirty||writing||!user||!client)return;writing=true;dirty=false;const owner=user.id;try{
  // Each challenge is merged atomically in Postgres; concurrent devices cannot regress passed/attempts.
  const entries=Object.entries(cache);
  for(const [id,r] of entries){
   const {data,error}=await client.rpc('merge_practice_progress',{p_challenge_id:id,p_passed:!!r.pass,p_attempts:r.attempts||0});
   if(error)throw error;
   const row=Array.isArray(data)?data[0]:data;
   if(row)cache[id]=merge(cache[id]||record({}),record(row));
  }
  notify();
 }catch(e){dirty=true;console.warn('Practice cloud sync pending:',e?.message||e);clearTimeout(timer);timer=setTimeout(()=>{timer=0;void flush()},5000);}finally{writing=false;if(dirty&&!timer)timer=setTimeout(()=>{timer=0;void flush()},900);}}
 async function init(){await Promise.resolve(window.DALP_AUTH_RESTORE).catch(()=>{});await window.DALP_CLOUD_WORKSPACE?.hydrate?.().catch(()=>{});client=window.ZAH_DB?.client;if(!client)return;
  const {data,error}=await client.auth.getUser();if(error||!data?.user||data.user.is_anonymous)return;
  if(user&&user.id!==data.user.id){cache={};dirty=false;}user=data.user;
  const {data:rows,error:readError}=await client.from('practice_progress').select('challenge_id,passed,attempts,updated_at').eq('user_id',user.id);if(readError){console.warn('Practice progress unavailable:',readError.message);return;}
  cache={};for(const row of rows||[])cache[row.challenge_id]=record(row);ready=true;
  // The in-memory workspace may contain drafts; merge only records for this user.
  notify();schedule(local());
 }
 window.DALP_PRACTICE_CLOUD={schedule,summary:()=>({...cache}),sync:flush};
 window.addEventListener('online',()=>{if(dirty)void flush();});
 window.addEventListener('dalp:auth-ready',()=>void init());
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>void init(),{once:true});else void init();
})();
