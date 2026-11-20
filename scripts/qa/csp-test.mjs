import handler from 'serve-handler';
import http from 'http'; import fs from 'fs'; import path from 'path'; import { chromium, devices } from 'playwright';
const root=new URL('../../dist', import.meta.url).pathname;
const hdr=fs.readFileSync(root+'/_headers','utf8').split('\n/')[0].split('\n').slice(1).filter(l=>l.trim()).map(l=>{const i=l.indexOf(':');return {key:l.slice(0,i).trim(),value:l.slice(i+1).trim()};}).filter(h=>h.key!=='Strict-Transport-Security'&&h.key!=='Content-Security-Policy'||true);
// drop upgrade-insecure-requests locally (http)
hdr.forEach(h=>{if(h.key==='Content-Security-Policy')h.value=h.value.replace('; upgrade-insecure-requests','');});
const pages=[]; (function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f);if(fs.statSync(p).isDirectory())walk(p);else if(f==='index.html')pages.push(('/'+path.relative(root,d)+'/').replace('//','/'));}})(root);
const srv=http.createServer((q,r)=>handler(q,r,{public:root,cleanUrls:true,headers:[{source:'**',headers:hdr}]})).listen(4720);
const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const ctx=await b.newContext(devices['iPhone 13']); const bad=[];
for(const u of pages){const p=await ctx.newPage(); const v=[]; p.on('console',m=>{if(/Content Security Policy|Refused/.test(m.text()))v.push(m.text().slice(0,160))}); p.on('pageerror',e=>v.push('JS '+e.message));
 const resp=await p.goto('http://localhost:4720'+u); const hasCsp=!!resp.headers()['content-security-policy'];
 await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}});
 if(u==='/patio-visualizer/'){ await p.setInputFiles('#file',new URL('../../public/visualizer/sample-patio.jpg', import.meta.url).pathname); await p.waitForTimeout(800); const w=await p.evaluate(()=>document.getElementById('gl').width); if(w<100)v.push('upload failed'); }
 if(u==='/'){ const bad=await p.evaluate(()=>[...document.querySelectorAll('a.btn')].filter(a=>/design visit|free visit/i.test(a.textContent)&&!a.getAttribute('href').includes('free-quote')).length); if(bad)v.push(bad+' visit buttons do not go to the questionnaire'); }
 if(!hasCsp)v.push('no CSP header'); if(v.length)bad.push(u+': '+[...new Set(v)].join(' | ')); await p.close();}
// check the form endpoint is allowed by CSP (without sending)
const p=await ctx.newPage(); await p.goto('http://localhost:4720/free-quote/');
const allowed=await p.evaluate(()=>new Promise(res=>{document.addEventListener('securitypolicyviolation',e=>res('BLOCKED '+e.blockedURI));fetch('https://api.web3forms.com/',{method:'HEAD',mode:'no-cors'}).then(()=>res('allowed')).catch(()=>setTimeout(()=>res('allowed (network error only)'),500));}));
console.log('pages',pages.length,'web3forms:',allowed); console.log('problems',bad.length); bad.forEach(x=>console.log(' -',x));
await b.close(); srv.close();
