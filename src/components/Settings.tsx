import { useEffect, useRef, useState } from 'react';
import { MAX_FONT, MIN_FONT, bumpFontSize, resetSettings, setColor, useSettings, type Colors } from '../settings';

const labels: [keyof Colors, string][] = [
  ['keyword', 'keyword'], ['type', 'type'], ['string', 'string'], ['number', 'number'],
  ['comment', 'comment'], ['delimiter', 'dots & semicolons'], ['text', 'text'],
];

export function Settings() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { fontSize, colors: c } = useSettings();

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
          {labels.map(([k, l]) => (
            <label className="row" key={k}>
              <span>{l}</span>
              <input type="color" value={'#' + c[k]} onChange={(e) => setColor(k, e.target.value)} />
            </label>
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
