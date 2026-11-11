// Fails the build if page text uses claims the approved marketing doc says not to use.
import fs from 'node:fs'; import path from 'node:path';
const dir = process.argv[2] || 'dist';
const rules = [
  [/\bplastic\b/i, 'Say "polycarbonate", never "plastic"'],
  [/hurricane[- ]proof/i, 'No "hurricane-proof"'],
  [/\bpatent(ed)?\b/i, 'Say "proprietary", not "patented"'],
  [/blocks? (heat|infrared)|energy sav/i, 'No heat/IR/energy claims beyond tested VLT and SHGC'],
  [/every part is metal|all[- ]metal/i, 'Not every part is metal'],
  [/\b(budget|affordable|cheap)\b/i, 'Never budget/affordable/cheap (Hexfold is design-led)'],
  [/\$0 down/i, 'No "$0 down" in marketing'],
  [/close your patio/i, 'Say "enclose", not "close"'],
  [/2 to 3 weeks|2-3 weeks|two to three weeks/i, 'Install is "within a month"'],
  [/\b\d+[- ]?(min|minute|minutes|hour|hours)\b[^.]{0,40}(visit|patio)|(visit|patio)[^.]{0,40}\b\d+[- ]?(min|minute)s?\b|45[- ]min/i, 'No stated length for the site visit (not confirmed)'],
  [/fei@|sales@aefactory|\bFei\b|512\)? ?800|800-0117/i, 'Use info@aefactorysales.com and (713) 791-8073 only'],
  [/hexfold(?:(?!fixed screen)[^.]){0,60}304 stainless/i, '304 stainless is Fixed Screen only'],
  [/clear panels/i, 'Say tinted polycarbonate panels'],
  [/4[- ]ton|ADA track/i, '4-ton/ADA track needs proof first'],
  [/half & half hybrid|half and half hybrid/i, 'Call it "Hybrid"'],
  [/—/, 'No em dashes'],
];
const files = []; (function walk(d){ for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(dir);
let bad = 0;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  const rel = path.relative(dir, f);
  for (const [re, why] of rules) {
    const m = text.match(re); if (m) { bad++; console.log(`✗ ${path.relative(dir, f)}: "${text.slice(Math.max(0, m.index - 50), m.index + 60).trim()}" -> ${why}`); } }
}
console.log(bad ? `${bad} copy issue(s) in ${files.length} pages` : `✓ copy check passed on ${files.length} pages`);
process.exit(bad ? 1 : 0);
