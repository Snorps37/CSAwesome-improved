import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { MAX_FONT, MAX_UI_ZOOM, MIN_FONT, MIN_UI_ZOOM, bumpFontSize, bumpUiZoom, resetSettings, resetUiZoom, setAccent, setColor, useSettings, type Colors } from '../settings';

type Key = keyof Colors | 'accent';
const labels: [Key, string][] = [
  ['accent', 'accent'],   ['keyword', 'keyword'], ['type', 'type'], ['string', 'string'], ['number', 'number'],
  ['comment', 'comment'], ['delimiter', 'dots & semicolons'], ['text', 'text'],
];

export function Settings() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { fontSize, colors: c, accent, uiZoom } = useSettings();
  const [picking, setPicking] = useState<Key | null>(null);
  const val = (k: Key) => (k === 'accent' ? accent : c[k]);
  const put = (k: Key, v: string) => (k === 'accent' ? setAccent(v) : setColor(k, v));

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const down = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', key);
    window.addEventListener('mousedown', down);
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('mousedown', down); };
  }, [open]);

  const s = (k: keyof Colors) => ({ color: '#' + c[k] });
  return (
    <div className="settings" ref={ref}>
      <button className="link" onClick={() => setOpen((o) => !o)} aria-expanded={open}>settings</button>
      {open && (
        <div className="settings-pop" role="dialog" aria-label="settings">
          <div className="row">
            <span>font size</span>
            <span className="size">
              <button onClick={() => bumpFontSize(-1)} disabled={fontSize <= MIN_FONT}>-</button>
              {fontSize}
              <button onClick={() => bumpFontSize(1)} disabled={fontSize >= MAX_FONT}>+</button>
            </span>
          </div>
          <div className="row">
            <span>ui zoom</span>
            <span className="size">
              <button onClick={() => bumpUiZoom(-1)} disabled={uiZoom <= MIN_UI_ZOOM}>-</button>
              {uiZoom}%
              <button onClick={() => bumpUiZoom(1)} disabled={uiZoom >= MAX_UI_ZOOM}>+</button>
              <button className="link" onClick={resetUiZoom} style={{ width: 'auto', border: 0 }}>reset</button>
            </span>
          </div>
          {labels.map(([k, l]) => (
            <div key={k}>
              <div className="row">
                <span>{l}</span>
                <button className="swatch" aria-label={`pick ${l} color`} aria-expanded={picking === k} style={{ background: '#' + val(k) }} onClick={() => setPicking(picking === k ? null : k)} />
              </div>
              {picking === k && (
                <div className="picker">
                  <HexColorPicker color={'#' + val(k)} onChange={(v) => put(k, v)} />
                  <input className="hex" spellCheck={false} maxLength={7} defaultValue={'#' + val(k)} key={val(k)} onChange={(e) => { const v = e.target.value.replace('#', ''); if (/^[0-9a-f]{6}$/i.test(v)) put(k, v); }} />
                </div>
              )}
            </div>
          ))}
          <pre style={{ fontSize, color: '#' + c.text }}>
            <span style={s('comment')}>// preview</span>{'\n'}
            <span style={s('type')}>String</span> s = <span style={s('string')}>"hi"</span><span style={s('delimiter')}>;</span>{'\n'}
            <span style={s('keyword')}>int</span> n = s<span style={s('delimiter')}>.</span>length()<span style={s('delimiter')}>;</span> <span style={s('comment')}>// </span><span style={s('number')}>42</span>
          </pre>
          <button className="link" onClick={resetSettings}>reset to defaults</button>
        </div>
      )}
    </div>
  );
}
