/* Keep hosting's secure page session in step with the existing learning-account session. */
(function(){'use strict';
 const endpoint=new URL('api/auth/session',new URL('../',document.currentScript?.src||document.baseURI));
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
     method:'POST',headers:{Authorization:'Bearer '+token},credentials:'same-origin',cache:'no-store',signal:controller.signal});}
   finally{clearTimeout(timer)}
   if(!response.ok)throw new Error('We couldn’t secure your session. Please try again.');
   recentToken=token;recentAt=Date.now();return true;
  })();
  try{return await pending}finally{pending=null}
 }
 async function clear(){recentToken='';recentAt=0;try{
  await fetch(endpoint,{method:'DELETE',credentials:'same-origin',cache:'no-store'});
 }catch(e){console.warn('Could not close the hosting session',e)}}
 window.DALP_SERVER_SESSION={establish,clear};
})();
