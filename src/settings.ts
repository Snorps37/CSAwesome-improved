import { useSyncExternalStore } from 'react';

export type Colors = { comment: string; keyword: string; string: string; number: string; type: string; delimiter: string; text: string };
export type Settings = { fontSize: number; colors: Colors };

export const MIN_FONT = 10;
export const MAX_FONT = 32;
export const defaultColors: Colors = {
  comment: '5a5a64', keyword: 'a78bfa', string: '86efac', number: 'fdba74',
  type: '67e8f9', delimiter: 'f4f4f5', text: 'e4e4e7',
};
const defaults = (): Settings => ({ fontSize: 14, colors: { ...defaultColors } });

const KEY = 'csa-settings-v1';
const clampFont = (n: number) => Math.min(MAX_FONT, Math.max(MIN_FONT, Math.round(n)));

function load(): Settings {
  const d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { fontSize: clampFont(Number(p.fontSize) || d.fontSize), colors: { ...d.colors, ...p.colors } };
    }
  } catch { /* ignore */ }
  return d;
}

let state: Settings = load();
const subs = new Set<() => void>();
export const subscribe = (f: () => void) => { subs.add(f); return () => { subs.delete(f); }; };
function commit(next: Settings) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  subs.forEach((f) => f());
}

export const getSettings = () => state;
export const useSettings = () => useSyncExternalStore(subscribe, getSettings);
export const lineHeightFor = (fontSize: number) => Math.round(fontSize * 1.57);

export const setFontSize = (n: number) => { const f = clampFont(n); if (f !== state.fontSize) commit({ ...state, fontSize: f }); };
export const bumpFontSize = (d: number) => setFontSize(state.fontSize + d);
export const resetFontSize = () => setFontSize(defaults().fontSize);
export const setColor = (k: keyof Colors, v: string) => commit({ ...state, colors: { ...state.colors, [k]: v.replace('#', '').toLowerCase() } });
export const resetSettings = () => commit(defaults());

// returns font-size delta (0 = reset) for a ctrl/cmd zoom key, or null
export function zoomDelta(e: { ctrlKey: boolean; metaKey: boolean; altKey: boolean; key: string; code: string }): number | null {
  if (!(e.ctrlKey || e.metaKey) || e.altKey) return null;
  if (e.key === '=' || e.key === '+' || e.code === 'NumpadAdd') return 1;
  if (e.key === '-' || e.key === '_' || e.code === 'NumpadSubtract') return -1;
  if (e.key === '0' || e.code === 'Numpad0') return 0;
  return null;
}
export const applyZoom = (d: number) => (d === 0 ? resetFontSize() : bumpFontSize(d));
