import { useSyncExternalStore } from 'react';

const get = () => (location.hash.replace(/^#/, '') || '/');
const sub = (f: () => void) => { window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); };
export const useRoute = () => useSyncExternalStore(sub, get);
export const go = (path: string) => { location.hash = path; window.scrollTo({ top: 0 }); };
