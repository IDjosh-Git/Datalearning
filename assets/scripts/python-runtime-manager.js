/* Shared, lazy Python worker. One Pyodide download/runtime per Arena tab, not per challenge attempt. */
(()=>{'use strict';
 const script=document.currentScript;
 const workerUrl=new URL('../python-worker.js',script?.src||new URL('assets/scripts/python-runtime-manager.js',location.href)).href;
 let worker=null,pending=null,serial=0,ready=false;
 const makeError=value=>value instanceof Error?value:new Error(String(value||'Python execution could not complete.'));
 function dispose(message){
  const current=pending;pending=null;
  if(current){clearTimeout(current.timer);current.reject(makeError(message));}
  if(worker){worker.terminate();worker=null;}
  ready=false;
 }
 function ensure(){
  if(worker)return worker;
  worker=new Worker(workerUrl);
  worker.onmessage=({data})=>{
   const task=pending;if(!task||data?.id!==task.id)return;
   if(data.type==='status'){
    if(data.ready)ready=true;
    task.onStatus?.(data.message||'Preparing Python…');return;
   }
   clearTimeout(task.timer);pending=null;
   if(data.type==='error')task.reject(new Error(data.message||'Python execution failed.'));
   else if(data.type==='result'||data.type==='grade')task.resolve(data);
   else task.reject(new Error('Unexpected Python runtime response.'));
  };
  worker.onerror=event=>dispose(event.message||'Python runtime failed. Check your connection and try again.');
  worker.onmessageerror=()=>dispose('Python could not read the response. Restart the runtime and retry.');
  return worker;
 }
 function execute({type,code,test='',onStatus}={}){
  if(type!=='run'&&type!=='grade')return Promise.reject(new Error('Unsupported Python request.'));
  if(pending)return Promise.reject(new Error('Python is already running. Wait for the result or press Stop.'));
  if(!String(code||'').trim())return Promise.reject(new Error('Enter Python code first.'));
  if(String(code).length>100000)return Promise.reject(new Error('The Python example is too large for the browser editor.'));
  return new Promise((resolve,reject)=>{
   const id=++serial;
   // Cold-start Pyodide plus an optional pandas download needs longer on low-memory phones.
   const timeout=ready?60000:180000;
   pending={id,resolve,reject,onStatus,timer:setTimeout(()=>dispose('Python took too long. The runtime was restarted; try smaller code or a stronger connection.'),timeout)};
   try{onStatus?.(ready?'Running Python…':'Preparing Python for its first run…');ensure().postMessage({type,id,code,test});}
   catch(error){dispose(error?.message||'Unable to start Python.');}
  });
 }
 window.DALP_PY_RUNTIME={execute,stop:()=>dispose('Python execution stopped.'),get busy(){return !!pending;},get ready(){return ready;}};
})();
