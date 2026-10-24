import { useSyncExternalStore } from 'react';
import { units } from './content';

type Store = {
  done: Record<string, Record<string, true>>; // lessonId -> blockId -> true
  completed: Record<string, true>; // lessonId -> true (manually or automatically)
  code: Record<string, string>; // blockId -> code
};

const KEY = 'csa-progress-v1';
const empty = (): Store => ({ done: {}, completed: {}, code: {} });

function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...empty(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return empty();
}

let state: Store = load();
const subs = new Set<() => void>();
function commit(next: Store) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  subs.forEach((f) => f());
}

export const useStore = () =>
  useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, () => state);

export const lessonKey = (unitId: number, lessonId: string) => `${unitId}:${lessonId}`;

export function requiredBlocks(lessonId: string): string[] {
  for (const u of units) for (const l of u.lessons) if (l.id === lessonId) {
    return l.blocks.flatMap((b) =>
      b.type === 'quiz' || b.type === 'predict' ? [b.id]
      : b.type === 'code' && (b.expected !== undefined || b.mustContain || b.minDotMoves || b.completeOnRun) ? [b.id]
      : []);
  }
  return [];
}

export function markBlockDone(lessonId: string, blockId: string) {
  if (state.done[lessonId]?.[blockId]) return;
  const done = { ...state.done, [lessonId]: { ...state.done[lessonId], [blockId]: true as const } };
  const req = requiredBlocks(lessonId);
  const all = req.length > 0 && req.every((b) => done[lessonId][b]);
  commit({ ...state, done, completed: all ? { ...state.completed, [lessonId]: true } : state.completed });
}

export function setCompleted(lessonId: string, value: boolean) {
  const completed = { ...state.completed };
  if (value) completed[lessonId] = true; else delete completed[lessonId];
  commit({ ...state, completed });
}

export function saveCode(blockId: string, code: string) {
  // no re-render fanout needed for typing; write through directly
  state = { ...state, code: { ...state.code, [blockId]: code } };
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export const getCode = (blockId: string) => state.code[blockId];

export function resetLesson(lessonId: string) {
  const done = { ...state.done }; delete done[lessonId];
  const completed = { ...state.completed }; delete completed[lessonId];
  commit({ ...state, done, completed });
}

export function unitStats(s: Store, unitId: number) {
  const u = units.find((x) => x.id === unitId)!;
  const total = u.lessons.length || u.plannedLessons || 0;
  const done = u.lessons.filter((l) => s.completed[l.id]).length;
  return { done, total, pct: total ? done / total : 0 };
}

export function globalStats(s: Store) {
  let done = 0, total = 0;
  for (const u of units) { const st = unitStats(s, u.id); done += st.done; total += st.total; }
  return { done, total, pct: total ? done / total : 0 };
}
