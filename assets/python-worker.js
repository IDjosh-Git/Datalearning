/* Python lab and formative challenge runner. Executes only in the learner's browser. */
let runtimePromise;
async function getPython(){
  if(!runtimePromise){
    runtimePromise=(async()=>{
      self.postMessage({type:'status',id:activeId,message:'Loading Python runtime…'});
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
      return await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'});
    })().catch(error=>{runtimePromise=null;throw error});
  }
  return runtimePromise;
}
let activeId=0;
self.addEventListener('message',async({data})=>{
  if(!data || !['run','grade'].includes(data.type) || typeof data.code!=='string')return;
  const {id,code,type}=data;activeId=id;
  try{
    const python=await getPython();
    const test=type==='grade' ? String(data.test??'') : '';
    await python.loadPackagesFromImports(code+'\n'+test);
    python.globals.set('__dalp_source',code);
    python.globals.set('__dalp_test',test);
    python.globals.set('__dalp_grade',type==='grade');
    const response=await python.runPythonAsync(`
import contextlib, io, json, traceback
_dalp_stdout = io.StringIO()
_dalp_namespace = {'__name__': '__main__'}
try:
    with contextlib.redirect_stdout(_dalp_stdout), contextlib.redirect_stderr(_dalp_stdout):
        exec(compile(__dalp_source, '<learner>', 'exec'), _dalp_namespace, _dalp_namespace)
        if __dalp_grade:
            exec(compile(__dalp_test, '<challenge checks>', 'exec'), _dalp_namespace, _dalp_namespace)
    _dalp_response = {'ok': True, 'output': _dalp_stdout.getvalue() or ('All checks passed.' if __dalp_grade else 'Code completed successfully (no output).'), 'error': ''}
except BaseException as _dalp_exception:
    _dalp_response = {'ok': False, 'output': _dalp_stdout.getvalue(), 'error': type(_dalp_exception).__name__ + ': ' + str(_dalp_exception)}
json.dumps(_dalp_response)
`);
    const result=JSON.parse(response);
    if(type==='grade')self.postMessage({id,type:'grade',...result});
    else if(result.ok)self.postMessage({id,type:'result',output:result.output});
    else self.postMessage({id,type:'error',message:result.error});
  }catch(error){self.postMessage({id,type:'error',message:error?.message||'Python runtime failed to load. Check your internet connection.'})}
});
