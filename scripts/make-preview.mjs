// Rewrites the PREVIEW=1 build so it works as a relative-path bundle (for the claude.ai preview).
import fs from 'node:fs'; import path from 'node:path';
const dir = process.argv[2] || 'dist-preview';
const files = []; (function walk(d){ for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : files.push(p); } })(dir);
const pages = new Set(files.filter((f) => f.endsWith('.html')).map((f) => '/' + path.relative(dir, f).replace(/\\/g, '/')));
function map(u, depth) {
  const up = '../'.repeat(depth);
  const [p0, hash = ''] = u.split('#'); const h = hash ? '#' + hash : '';
  let p = p0;
  if (p === '' ) return u;
  if (p === '/') return up + 'home.html' + h;
  if (p.endsWith('/')) { const cand = p.slice(0, -1) + '.html'; if (pages.has(cand)) return up + cand.slice(1) + h; }
  return up + p.slice(1) + h;
}
for (const f of files.filter((f) => f.endsWith('.html') || f.endsWith('.css'))) {
  const depth = path.relative(dir, f).split(path.sep).length - 1;
  let s = fs.readFileSync(f, 'utf8');
  s = s.replace(/(\s(?:href|src|poster|data-next)=")(\/[^"]*)"/g, (m, a, u) => a + map(u, depth) + '"');
  s = s.replace(/(srcset=")([^"]+)"/g, (m, a, v) => a + v.split(',').map((x) => { const [u, w] = x.trim().split(/\s+/); return (u.startsWith('/') ? map(u, depth) : u) + (w ? ' ' + w : ''); }).join(', ') + '"');
  s = s.replace(/url\((['"]?)\/assets\//g, (m, q) => `url(${q}${f.endsWith('.css') ? '' : '../'.repeat(depth)}${f.endsWith('.css') ? './' : ''}assets/`);
  if (f.endsWith('.html')) s = s.replace('<title>', '<meta name="robots" content="noindex"><title>');
  fs.writeFileSync(f, s);
}
console.log('rewrote', files.length, 'files');
