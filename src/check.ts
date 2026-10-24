import type { CodeBlock } from './content/types';
import type { ParsedRun } from './runner';

const norm = (s: string) => s.split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

export function checkRun(b: CodeBlock, r: ParsedRun): { ok: boolean; msg?: string } {
  if (r.compileError || r.stderr.trim() && !r.console && !r.dots.length) return { ok: false, msg: 'Fix the errors first.' };
  if (r.stderr.trim() && /Exception|Error/.test(r.stderr)) return { ok: false, msg: 'The program crashed. Check the error below.' };
  if (b.expected !== undefined && norm(r.console) !== norm(b.expected))
    return { ok: false, msg: 'Output does not match yet. Expected:\n' + b.expected };
  if (b.mustContain) {
    const miss = b.mustContain.filter((m) => !r.console.includes(m));
    if (miss.length) return { ok: false, msg: 'Your output should include: ' + miss.join(', ') };
  }
  if (b.minDotMoves) {
    const n = r.dots.filter((d) => d.op === 'move').length;
    if (n < b.minDotMoves) return { ok: false, msg: `Make the dot move at least ${b.minDotMoves} times (it moved ${n}).` };
  }
  return { ok: true };
}

export const isRequired = (b: CodeBlock) =>
  b.expected !== undefined || !!b.mustContain || !!b.minDotMoves || !!b.completeOnRun;

export const normAnswer = (s: string) => s.replace(/\s+/g, ' ').trim();
