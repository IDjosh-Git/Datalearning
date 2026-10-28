/* Isolated Python runtime — loaded on first execution. */
let pyodidePromise;
const base = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
async function runtime(){
  if (!pyodidePromise) pyodidePromise = (async()=>{importScripts(base+'pyodide.js');return await loadPyodide({indexURL:base});})();
  return pyodidePromise;
}
self.onmessage=async({data})=>{
  if(data.type!=='run'&&data.type!=='grade')return;
  const {id,code}=data;
  if(data.type==='grade'){
    try{
      self.postMessage({type:'status',id,message:'Loading Python runtime…'});
      const py=await runtime();await py.loadPackagesFromImports(code+'\n'+data.test);
      py.globals.set('_challenge_code',code);py.globals.set('_challenge_tests',data.test);
      const raw=await py.runPythonAsync(`import traceback, io, contextlib, json
_scope={"__builtins__":__builtins__}
_capture=io.StringIO()
_passed=False
_error=""
try:
    with contextlib.redirect_stdout(_capture), contextlib.redirect_stderr(_capture):
        exec(compile(_challenge_code, '<solution>', 'exec'), _scope)
        exec(compile(_challenge_tests, '<checks>', 'exec'), _scope)
    _passed=True
except BaseException as _exc:
    _error=''.join(traceback.format_exception_only(type(_exc),_exc)).strip()
json.dumps({'ok':_passed,'output':_capture.getvalue()[-6000:],'error':_error})`);
      const grade=JSON.parse(String(raw));self.postMessage({type:'grade',id,...grade});
    }catch(e){self.postMessage({type:'error',id,message:String(e?.message||e)});}
    return;
  }
  try{
    self.postMessage({type:'status',id,message:'Loading Python runtime…'});
    const py=await runtime();
    self.postMessage({type:'status',id,message:'Preparing packages…'});
    await py.loadPackagesFromImports(code);
    self.postMessage({type:'status',id,message:'Executing…'});
    py.globals.set('_arena_code',code);
    const output=await py.runPythonAsync(`import io, contextlib, traceback
_out=io.StringIO()
try:
    with contextlib.redirect_stdout(_out), contextlib.redirect_stderr(_out):
        exec(compile(_arena_code, '<Python Lab>', 'exec'), globals())
except BaseException:
    traceback.print_exc(file=_out)
_out.getvalue()`);
    self.postMessage({type:'result',id,output:String(output)||'(Code executed successfully. No output. Use print() to display a value.)'});
  }catch(error){self.postMessage({type:'error',id,message:String(error?.message||error)});}
};
