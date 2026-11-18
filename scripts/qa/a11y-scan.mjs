import handler from 'serve-handler';
import http from 'http'; import fs from 'fs'; import path from 'path'; import { chromium, devices } from 'playwright';
const root=new URL('../../dist', import.meta.url).pathname; const axe=fs.readFileSync(new URL('../../node_modules/axe-core/axe.min.js', import.meta.url).pathname,'utf8');
const pages=[]; (function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(f==='index.html')pages.push(('/'+path.relative(root,d)+'/').replace('//','/'));}})(root);
const srv=http.createServer((q,r)=>handler(q,r,{public:root,cleanUrls:true})).listen(4719);
const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const agg={};
for (const [lab,opt] of [['desktop',{viewport:{width:1366,height:900}}],['phone',devices['iPhone 13']]]) {
 const ctx=await b.newContext({...opt, reducedMotion:'reduce'});
 for(const u of pages){ const p=await ctx.newPage(); await p.goto('http://localhost:4719'+u); await p.addScriptTag({content:axe});
  const r=await p.evaluate(async()=>{const res=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}});return res.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,n:v.nodes.length,ex:v.nodes.slice(0,2).map(x=>x.target.join(' ')+' :: '+(x.failureSummary||'').split('\n')[1])}));});
  for(const v of r){const k=v.id; agg[k]=agg[k]||{impact:v.impact,help:v.help,pages:new Set(),nodes:0,ex:v.ex,views:new Set()}; agg[k].pages.add(u); agg[k].nodes+=v.n; agg[k].views.add(lab);}
  await p.close(); }
 await ctx.close(); }
console.log('pages',pages.length);
for(const [k,v] of Object.entries(agg).sort((a,b)=>b[1].nodes-a[1].nodes)) console.log(`${v.impact} | ${k} | ${v.help} | ${v.pages.size} pages, ${v.nodes} nodes, ${[...v.views]} | e.g. ${v.ex.join(' || ').slice(0,300)}`);
await b.close(); srv.close();
