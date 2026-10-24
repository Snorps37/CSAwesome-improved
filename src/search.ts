import { units } from './content';

export type Hit = { unit: number; lesson: string; num: string; title: string; path: string; snippet: string; at: number; len: number };

type Entry = { unit: number; lesson: string; title: string; tl: string; body: string; bl: string };

const clean = (s: string) =>
  s.replace(/§/g, '`')
    .replace(/```[\w]*\n?/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_#>|~]/g, '')
    .replace(/^\s*-{3,}\s*$/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

let index: Entry[] | null = null;
function build(): Entry[] {
  const out: Entry[] = [];
  for (const u of units) for (const l of u.lessons) {
    const parts: string[] = [];
    for (const b of l.blocks) {
      if (b.type === 'text') parts.push(b.md);
      else if (b.type === 'code') b.prompt && parts.push(b.prompt);
      else parts.push(b.question);
    }
    const body = clean(parts.join(' \n '));
    out.push({ unit: u.id, lesson: l.id, title: l.title, tl: l.title.toLowerCase(), body, bl: body.toLowerCase() });
  }
  return out;
}

export function search(q: string, max = 8): Hit[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  index ??= build();
  const scored: { e: Entry; score: number }[] = [];
  for (const e of index) {
    const all = e.tl + ' ' + e.bl;
    if (!words.every((w) => all.includes(w))) continue;
    const inTitle = words.filter((w) => e.tl.includes(w)).length;
    scored.push({ e, score: inTitle * 10 + (inTitle === words.length ? 50 : 0) });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, max).map(({ e }) => {
    let at = -1, len = 0;
    for (const w of words) { const i = e.bl.indexOf(w); if (i >= 0) { at = i; len = w.length; break; } }
    let snippet = '';
    if (at >= 0) {
      const s = Math.max(0, at - 40);
      snippet = (s > 0 ? '…' : '') + e.body.slice(s, at + len + 80) + (at + len + 80 < e.body.length ? '…' : '');
      at = at - s + (s > 0 ? 1 : 0);
    } else snippet = e.body.slice(0, 120) + (e.body.length > 120 ? '…' : '');
    return { unit: e.unit, lesson: e.lesson, num: e.lesson.replace('-', '.'), title: e.title, path: `/u/${e.unit}/${e.lesson}`, snippet, at, len };
  });
}
