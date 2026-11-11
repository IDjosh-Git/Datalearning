/* Keep hosting's secure page session in step with the existing learning-account session. */
(function(){'use strict';
 const endpoint=new URL('api/auth/session',new URL('../../',document.currentScript?.src||document.baseURI));
 let recentToken='',recentAt=0,pending=null;
 async function establish(session){
  const token=session?.access_token;
  if(!token)throw new Error('Please sign in again.');
  if(token===recentToken&&Date.now()-recentAt<60000)return true;
  if(pending)return pending;
  pending=(async()=>{
   const controller=new AbortController();
   const timer=setTimeout(()=>controller.abort(),7000);
   let response;
   try{response=await fetch(endpoint,{
     method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:session?.refresh_token}),credentials:'same-origin',cache:'no-store',signal:controller.signal});}
   finally{clearTimeout(timer)}
   if(!response.ok)throw new Error('We couldn’t secure your session. Please try again.');
   recentToken=token;recentAt=Date.now();return true;
  })();
  try{return await pending}finally{pending=null}
 }
 async function clear(){recentToken='';recentAt=0;try{
  await fetch(endpoint,{method:'DELETE',credentials:'same-origin',cache:'no-store'});
 }catch(e){console.warn('Could not close the hosting session',e)}}
 async function restore(){try{
  const response=await fetch(endpoint,{method:'GET',credentials:'same-origin',cache:'no-store'});
  if(!response.ok)return false;const data=await response.json();
  if(!data.access_token||!data.refresh_token)return false;
  const client=window.ZAH_DB?.client;if(!client)return false;
  const {error}=await client.auth.setSession({access_token:data.access_token,refresh_token:data.refresh_token});
  return !error;
 }catch{return false}}
 window.DALP_SERVER_SESSION={establish,clear,restore};
})();
