// Checks every internal link, image and asset resolves, every page has one h1, title, description, canonical, and valid JSON-LD.
import fs from 'node:fs'; import path from 'node:path';
const dir = process.argv[2] || 'dist';
const files = []; (function walk(d){ for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dir);
const exists = (u) => { u = decodeURIComponent(u.split('#')[0].split('?')[0]); if (!u || u === '/') return fs.existsSync(path.join(dir, 'index.html'));
  const p = path.join(dir, u); return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html'))); };
let bad = 0, links = 0, ld = 0; const titles = new Map(), descs = new Map();
const fail = (f, msg) => { bad++; console.log(`✗ ${path.relative(dir, f)}: ${msg}`); };
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)) { const u = m[1]; if (/^(https?:|mailto:|tel:|sms:|#|data:)/.test(u)) continue; links++; if (!exists(u)) fail(f, `broken ${u}`); }
  for (const m of h.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (/^https?:/.test(u)) continue; links++; if (!exists(u)) fail(f, `broken srcset ${u}`); }
  const h1 = (h.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) fail(f, `${h1} h1 tags`);
  const t = h.match(/<title>([^<]*)<\/title>/)?.[1]; const d = h.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!t) fail(f, 'no title'); else { if (t.length > 70) console.log(`  note ${path.relative(dir,f)}: title ${t.length} chars`); titles.set(t, (titles.get(t) || 0) + 1); }
  if (!d) fail(f, 'no description'); else { if (d.length > 165) console.log(`  note ${path.relative(dir,f)}: description ${d.length} chars`); descs.set(d, (descs.get(d) || 0) + 1); }
  if (!/rel="canonical"/.test(h)) fail(f, 'no canonical');
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { ld++; try { const j = JSON.parse(m[1]); if (!j['@context'] || !j['@type']) fail(f, 'JSON-LD missing @context/@type'); } catch (e) { fail(f, 'invalid JSON-LD ' + e.message); } }
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) fail(f, 'img without alt');
}
for (const [t, n] of titles) if (n > 1) fail('-', `duplicate title x${n}: ${t}`);
for (const [t, n] of descs) if (n > 1) fail('-', `duplicate description x${n}`);
console.log(bad ? `${bad} problem(s)` : `✓ ${files.length} pages, ${links} links/assets, ${ld} JSON-LD blocks all OK`);
process.exit(bad ? 1 : 0);
