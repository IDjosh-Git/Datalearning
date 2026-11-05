/* Share the Python Lab worker: reloading Pyodide for each graded attempt is very slow on phones. */
(()=>{'use strict';
window.DALP_PY_GRADE=(code,task,onStatus)=>{
 const runtime=window.DALP_PY_RUNTIME;
 if(!runtime) return Promise.reject(new Error('Shared Python runtime unavailable. Reload the Practice Arena.'));
 return runtime.execute({type:'grade',code,test:task?.test||'',onStatus}).then(data=>({ok:!!data.ok,output:data.output,error:data.error}));
};
})();
