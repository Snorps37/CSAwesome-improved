import { useSyncExternalStore } from 'react';

export type Colors = { comment: string; keyword: string; string: string; number: string; type: string; delimiter: string; text: string };
export type Settings = { fontSize: number; colors: Colors; accent: string; uiZoom: number };

export const MIN_FONT = 10;
export const MAX_FONT = 32;
export const defaultColors: Colors = {
  comment: '5a5a64', keyword: 'a78bfa', string: '86efac', number: 'fdba74',
  type: '67e8f9', delimiter: 'f4f4f5', text: 'e4e4e7',
};
export const MIN_UI_ZOOM = 60;
export const MAX_UI_ZOOM = 250;
export const defaultAccent = '67e8f9';
const defaults = (): Settings => ({ fontSize: 14, colors: { ...defaultColors }, accent: defaultAccent, uiZoom: 100 });
const clampZoom = (n: number) => Math.min(MAX_UI_ZOOM, Math.max(MIN_UI_ZOOM, Math.round(n / 10) * 10));
const validHex = (v: unknown, fb: string) => (typeof v === 'string' && /^[0-9a-f]{6}$/i.test(v) ? v.toLowerCase() : fb);

const KEY = 'csa-settings-v1';
const clampFont = (n: number) => Math.min(MAX_FONT, Math.max(MIN_FONT, Math.round(n)));

function load(): Settings {
  const d = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return { fontSize: clampFont(Number(p.fontSize) || d.fontSize), colors: { ...d.colors, ...p.colors }, accent: validHex(p.accent, d.accent), uiZoom: clampZoom(Number(p.uiZoom) || d.uiZoom) };
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
export const setAccent = (v: string) => { const a = validHex(v.replace('#', ''), state.accent); if (a !== state.accent) commit({ ...state, accent: a }); };
export const setUiZoom = (n: number) => { const z = clampZoom(n); if (z !== state.uiZoom) commit({ ...state, uiZoom: z }); };
export const bumpUiZoom = (d: number) => setUiZoom(state.uiZoom + d * 10);
export const resetUiZoom = () => setUiZoom(100);
export const applyUiZoom = (d: number) => (d === 0 ? resetUiZoom() : bumpUiZoom(d));

function applyRoot(s: Settings) {
  const r = document.documentElement;
  r.style.setProperty('--accent', '#' + s.accent);
  const nz = (window as unknown as { nativeZoom?: (f: number) => void }).nativeZoom;
  if (nz) nz(s.uiZoom / 100);
  else r.style.setProperty('zoom', s.uiZoom === 100 ? '' : String(s.uiZoom / 100));
}
applyRoot(state);
subscribe(() => applyRoot(state));

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
