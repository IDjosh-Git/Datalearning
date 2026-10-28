(()=>{'use strict';
const el=id=>document.getElementById(id);
const editor=el('pythonCode'),output=el('pythonOutput'),run=el('pythonRun'),stop=el('pythonStop'),state=el('pythonRuntimeState'),examples=el('pythonExample');
if(!editor||!output)return;
const samples={hello:'# Welcome to Python Lab\nname = "Data Learner"\nprint(f"Hello, {name}!")\nfor number in range(1, 6):\n    print(number, number ** 2)',analysis:'# Sales summary in pure Python\nsales = [1200, 1800, 950, 2200, 1750]\nprint("Total sales:", sum(sales))\nprint("Average sales:", round(sum(sales) / len(sales), 2))\nprint("Highest sale:", max(sales))',pandas:'import pandas as pd\n\ndata = pd.DataFrame({"product": ["Book", "Pen", "Bag"], "revenue": [3000, 1200, 7000]})\nprint(data.to_string(index=False))\nprint("Total revenue:", data["revenue"].sum())'};
let worker=null,job=0,busy=false;
function status(message){state.textContent=message;}
function setBusy(value){busy=value;run.disabled=value;stop.disabled=!value;}
function createWorker(){const w=new Worker('assets/python-worker-v41.js?v=20261028.41');w.onmessage=({data})=>{if(data.id!==job)return;if(data.type==='status'){status(data.message);return;}output.textContent=data.type==='result'?data.output:'Python error: '+data.message;status(data.type==='result'?'Ready':'Error');setBusy(false);};w.onerror=e=>{output.textContent='Unable to load Python. Check your connection and browser console. '+(e.message||'');status('Runtime unavailable');setBusy(false);};return w;}
function reset(){editor.value=samples[examples.value]||samples.hello;editor.dispatchEvent(new Event('input',{bubbles:true}));}
function execute(){if(busy)return;if(!editor.value.trim()){output.textContent='Enter Python code first.';return;}if(!worker)worker=createWorker();job++;setBusy(true);status('Starting…');output.textContent='Running Python…';worker.postMessage({type:'run',id:job,code:editor.value});}
run.addEventListener('click',execute);
stop.addEventListener('click',()=>{if(worker){worker.terminate();worker=null;}job++;setBusy(false);status('Stopped — runtime resets on next run');output.textContent='Execution stopped.';});
el('pythonReset').addEventListener('click',reset);examples.addEventListener('change',reset);el('pythonClear').addEventListener('click',()=>{output.textContent='';});editor.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();execute();}});
// Preserve the currently selected challenge starter/draft if it is already loaded.
if(!editor.value.trim())reset();
})();
