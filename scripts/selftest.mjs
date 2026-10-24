// Runs every code block's reference solution through the running API and applies the block's check.
// Usage: (server running) node scripts/selftest.mjs
import { register } from 'node:module';
register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); }
  catch (e) { if (spec.startsWith('.')) { for (const x of ['.ts','/index.ts']) { try { return await next(spec + x, ctx); } catch {} } } throw e; }
}`), import.meta.url);
const { units } = await import('../src/content/index.ts');
const { parseRun } = await import('../src/runner.ts');
const { checkRun, isRequired, normAnswer } = await import('../src/check.ts');
const base = process.env.API || 'http://127.0.0.1:3001';
let bad = 0, n = 0;
const ids = new Set();
for (const u of units) for (const l of u.lessons) for (const b of l.blocks) {
  if (b.type !== 'text') { const k = l.id + '/' + b.id; if (ids.has(k)) { bad++; console.log('DUP ID', k); } ids.add(k); }
  if (b.type === 'quiz' && (b.answer < 0 || b.answer >= b.choices.length)) { bad++; console.log('BAD QUIZ ANSWER', l.id, b.id); }
  if (b.type === 'predict') {
    const r = parseRun(await (await fetch(base + '/api/run', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code: b.code }) })).json());
    n++;
    if (r.compileError || normAnswer(r.console) !== normAnswer(b.answer)) { bad++; console.log('FAIL predict', l.id, b.id, r.stderr, JSON.stringify(r.console)); }
    else console.log('ok   predict', l.id, b.id);
    continue;
  }
  if (b.type !== 'code') continue;
  const code = b.solution ?? b.starter;
  if (!b.solution && isRequired(b) && b.expected !== undefined) { console.log('NO SOLUTION', b.id); bad++; continue; }
  const r = parseRun(await (await fetch(base + '/api/run', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code }) })).json());
  const v = checkRun(b, r); n++;
  const ok = v.ok && !r.compileError;
  if (!ok) { bad++; console.log('FAIL', l.id, b.id, v.msg ?? '', r.stderr, JSON.stringify(r.console)); }
  else console.log('ok  ', l.id, b.id, `dots=${r.dots.length}`);
}
console.log(`${n} blocks run, ${bad} problems`);
process.exit(bad ? 1 : 0);
