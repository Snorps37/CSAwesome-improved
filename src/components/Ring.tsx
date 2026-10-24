import { motion } from 'framer-motion';

export function Ring({ pct, size = 52, label }: { pct: number; size?: number; label?: string }) {
  const r = size / 2 - 3;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`${Math.round(pct * 100)}% complete`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={1.5} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round"
        style={{ rotate: -90, transformOrigin: '50% 50%', filter: 'drop-shadow(0 0 4px color-mix(in srgb, var(--accent) 70%, transparent))' }}
        initial={{ pathLength: 0 }} animate={{ pathLength: pct }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      {label && <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="ring-label">{label}</text>}
    </svg>
  );
}
