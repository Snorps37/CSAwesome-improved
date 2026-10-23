import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DotPlayer } from '../dotPlayer';
import type { DotEvent } from '../runner';

export function DotStage({ events, runKey }: { events: DotEvent[]; runKey: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const player = useRef<DotPlayer | null>(null);
  const [speed, setSpeed] = useState(1);

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
      <canvas ref={ref} />
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
