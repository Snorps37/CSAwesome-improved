import { useEffect, useMemo, useRef, useState } from 'react';
import { search } from '../search';
import { go } from '../router';

export function Search() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable || !!t.closest?.('.monaco-editor'));
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); e.stopPropagation(); ref.current?.focus(); setOpen(true); }
      else if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); ref.current?.focus(); setOpen(true); }
    };
    const c = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', k, true);
    window.addEventListener('mousedown', c);
    return () => { window.removeEventListener('keydown', k, true); window.removeEventListener('mousedown', c); };
  }, []);

  const pick = (i: number) => {
    const h = hits[i];
    if (!h) return;
    go(h.path); setOpen(false); setQ(''); ref.current?.blur();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, hits.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(sel); }
    else if (e.key === 'Escape') { setOpen(false); ref.current?.blur(); }
  };

  return (
    <div className="search" ref={box}>
      <input ref={ref} value={q} placeholder="search  ⌘K" aria-label="Search lessons" spellCheck={false}
        onChange={(e) => { setQ(e.target.value); setSel(0); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey} />
      {open && q.trim() && (
        <div className="search-pop" role="listbox">
          {hits.length === 0 && <div className="search-empty">No matches</div>}
          {hits.map((h, i) => (
            <a key={h.path} href={`#${h.path}`} role="option" aria-selected={i === sel} className={i === sel ? 'sel' : ''}
              onMouseEnter={() => setSel(i)} onClick={(e) => { e.preventDefault(); pick(i); }}>
              <span className="st"><span className="n">{h.num}</span>{h.title}</span>
              <span className="ss">{h.at >= 0
                ? <>{h.snippet.slice(0, h.at)}<mark>{h.snippet.slice(h.at, h.at + h.len)}</mark>{h.snippet.slice(h.at + h.len)}</>
                : h.snippet}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
