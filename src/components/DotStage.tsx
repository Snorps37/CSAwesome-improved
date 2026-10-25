import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DotPlayer } from '../dotPlayer';
import type { DotEvent } from '../runner';

const HEIGHT_KEY = 'csa-dot-height';
const clampHeight = (n: number) => Math.min(900, Math.max(160, n));

export function DotStage({ events, runKey }: { events: DotEvent[]; runKey: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const player = useRef<DotPlayer | null>(null);
  const [speed, setSpeed] = useState(1);
  const [height, setHeight] = useState(() => {
    try { return clampHeight(Number(sessionStorage.getItem(HEIGHT_KEY)) || 300); } catch { return 300; }
  });
  useEffect(() => { try { sessionStorage.setItem(HEIGHT_KEY, String(height)); } catch { /* ignore */ } }, [height]);
  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget, y0 = e.clientY, h0 = height;
    el.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => setHeight(clampHeight(h0 + ev.clientY - y0));
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  };

  useEffect(() => {
    const p = new DotPlayer(ref.current!);
    player.current = p;
    return () => p.destroy();
  }, []);

  useEffect(() => { if (player.current) player.current.speed = speed; }, [speed]);

  useEffect(() => {
    player.current?.play(events);
  }, [events, runKey]);

  return (
    <motion.div className="dot-stage" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="dot-canvas-shell">
        <canvas ref={ref} style={{ height }} aria-label="Dot drawing canvas" />
        <div className="resize-handle" role="separator" aria-label="Canvas height" aria-orientation="horizontal" aria-valuemin={160} aria-valuemax={900} aria-valuenow={height} tabIndex={0}
          title="drag to resize, double-click to reset" onPointerDown={startDrag} onDoubleClick={() => setHeight(300)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); setHeight((h) => clampHeight(h + (e.key === 'ArrowUp' ? -20 : 20))); }
            if (e.key === 'Home') { e.preventDefault(); setHeight(300); }
          }} />
      </div>
      <div className="dot-ctrl">
        <span>speed</span>
        <input type="range" min={0.25} max={6} step={0.25} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        <span>{speed.toFixed(2)}x</span>
        <button className="link" onClick={() => player.current?.play(events)}>replay</button>
        <button className="link" onClick={() => player.current?.skip()}>skip</button>
      </div>
    </motion.div>
  );
}
