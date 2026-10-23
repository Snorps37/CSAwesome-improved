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
const { checkRun, isRequired } = await import('../src/check.ts');
const base = process.env.API || 'http://127.0.0.1:3001';
let bad = 0, n = 0;
for (const u of units) for (const l of u.lessons) for (const b of l.blocks) {
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
