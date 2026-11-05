/* Browser Python Lab; shares one cancellable, lazy Python worker with challenge grading. */
(()=>{'use strict';
const el=id=>document.getElementById(id);
const editor=el('pythonCode'),output=el('pythonOutput'),run=el('pythonRun'),stop=el('pythonStop'),state=el('pythonRuntimeState'),examples=el('pythonExample');
if(!editor||!output||!run||!stop||!state||!examples)return;
const samples={hello:'# Welcome to Python Lab\nname = "Data Learner"\nprint(f"Hello, {name}!")\nfor number in range(1, 6):\n    print(number, number ** 2)',analysis:'# Sales summary in pure Python\nsales = [1200, 1800, 950, 2200, 1750]\nprint("Total sales:", sum(sales))\nprint("Average sales:", round(sum(sales) / len(sales), 2))\nprint("Highest sale:", max(sales))',pandas:'import pandas as pd\n\ndata = pd.DataFrame({"product": ["Book", "Pen", "Bag"], "revenue": [3000, 1200, 7000]})\nprint(data.to_string(index=False))\nprint("Total revenue:", data["revenue"].sum())'};
let busy=false;
function status(message){state.textContent=message;}
function setBusy(value){busy=value;run.disabled=value;stop.disabled=!value;run.setAttribute('aria-busy',String(value));}
function reset(){editor.value=samples[examples.value]||samples.hello;editor.dispatchEvent(new Event('input',{bubbles:true}));}
async function execute(){
 if(busy)return;
 if(!editor.value.trim()){output.textContent='Enter Python code first.';return;}
 const runtime=window.DALP_PY_RUNTIME;
 if(!runtime){status('Python runtime unavailable');return;}
 if(runtime.busy){status('A challenge check is running. Wait or press Stop.');return;}
 setBusy(true);status(runtime.ready?'Running…':'Loading Python for the first time…');output.textContent='Running Python…';
 try{
  const data=await runtime.execute({type:'run',code:editor.value,onStatus:status});
  output.textContent=data.output||'Code completed with no output.';
  status('Ready · Python runtime stays loaded for your next run');
 }catch(error){output.textContent='Python: '+(error?.message||'Execution failed.');status('Ready to retry');}
 finally{setBusy(false);}
}
run.addEventListener('click',execute);
stop.addEventListener('click',()=>{window.DALP_PY_RUNTIME?.stop();setBusy(false);status('Stopped · reload on next run');output.textContent='Execution stopped.';});
el('pythonReset')?.addEventListener('click',reset);examples.addEventListener('change',reset);
el('pythonClear')?.addEventListener('click',()=>{output.textContent='';});
editor.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();execute();}});
// Keep a challenge's draft when this editor is moved into the active workspace.
if(!editor.value.trim())reset();
})();
