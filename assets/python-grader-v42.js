(()=>{'use strict';
window.DALP_PY_GRADE=(code,task)=>new Promise((resolve,reject)=>{
 const worker=new Worker('assets/python-worker-v41.js?v=20261028.42');const id=1;
 const timer=setTimeout(()=>{worker.terminate();reject(new Error('Python timed out. Try a shorter solution or check for infinite loops.'));},90000);
 const finish=fn=>{clearTimeout(timer);worker.terminate();fn();};
 worker.onerror=e=>finish(()=>reject(new Error(e.message||'Python runtime unavailable. Check your internet connection.')));
 worker.onmessage=({data})=>{if(data.id!==id||data.type==='status')return;
  if(data.type==='grade')finish(()=>resolve({ok:!!data.ok,output:data.output,error:data.error}));
  else if(data.type==='error')finish(()=>reject(new Error(data.message)));
 };
 worker.postMessage({type:'grade',id,code,test:task.test});
});
})();
