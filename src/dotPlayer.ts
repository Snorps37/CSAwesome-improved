import type { DotEvent } from './runner';

type DotState = { x: number; y: number; heading: number; color: string; size: number; pen: boolean; visible: boolean; filled: boolean };
type Seg = { x0: number; y0: number; x1: number; y1: number; color: string; size: number; t: number };
type Shape = { op: string; x: number; y: number; heading: number; color: string; size: number; filled: boolean; r?: number; w?: number; h?: number; text?: string };
type Anim = { id: number; x0: number; y0: number; x1: number; y1: number; start: number; dur: number; draw: boolean };

const COLORS: Record<string, string> = {
  cyan: '#67e8f9', violet: '#a78bfa', white: '#f5f5f5', red: '#fb7185', green: '#4ade80',
  blue: '#60a5fa', yellow: '#fde047', orange: '#fb923c', pink: '#f472b6', purple: '#c084fc',
  magenta: '#e879f9', gray: '#9ca3af', grey: '#9ca3af', black: '#3f3f46',
};
const resolveColor = (c: string) => COLORS[c.toLowerCase()] ?? c;

const EXTENT = 110; // logical half-size shown on canvas
const UNITS_PER_SEC = 140;
const TURN_PAUSE = 0.12; // seconds per turn/instant op at speed 1
const FADE_MS = 5000;
const MIN_ALPHA = 0.28;

/** Plays back Dot events on a canvas: glowing head, fading trail. */
export class DotPlayer {
  private ctx: CanvasRenderingContext2D;
  private dots = new Map<number, DotState>();
  private segs: Seg[] = [];
  private shapes: Shape[] = [];
  private queue: DotEvent[] = [];
  private anim: Anim | null = null;
  private wait = 0; // timestamp until which we pause
  private raf = 0;
  private lastT = 0;
  speed = 1;
  onFinish?: () => void;
  private finished = true;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  destroy() { cancelAnimationFrame(this.raf); }

  play(events: DotEvent[]) {
    this.dots.clear();
    this.segs = [];
    this.shapes = [];
    this.anim = null;
    this.wait = 0;
    this.queue = events.slice(0, 20000);
    this.finished = this.queue.length === 0;
  }

  skip() {
    // fast-forward everything
    const now = performance.now();
    while (this.anim || this.queue.length) {
      if (this.anim) this.finishAnim(now);
      else this.step(now, true);
    }
    this.wait = 0;
  }

  private state(id: number): DotState {
    let s = this.dots.get(id);
    if (!s) { s = { x: 0, y: 0, heading: 0, color: '#67e8f9', size: 3, pen: true, visible: true, filled: false }; this.dots.set(id, s); }
    return s;
  }

  private finishAnim(now: number) {
    const a = this.anim!;
    const s = this.state(a.id);
    if (a.draw && (a.x0 !== a.x1 || a.y0 !== a.y1)) this.pushSeg(s, a.x0, a.y0, a.x1, a.y1, now);
    s.x = a.x1; s.y = a.y1;
    this.anim = null;
  }

  private pushSeg(s: DotState, x0: number, y0: number, x1: number, y1: number, t: number) {
    this.segs.push({ x0, y0, x1, y1, color: s.color, size: s.size, t });
    if (this.segs.length > 8000) this.segs.splice(0, 1000);
  }

  private step(now: number, instant = false) {
    const ev = this.queue.shift();
    if (!ev) return;
    const s = this.state(ev.id);
    const pause = instant ? 0 : (TURN_PAUSE / this.speed) * 1000;
    switch (ev.op) {
      case 'create':
        s.x = Number(ev.x); s.y = Number(ev.y);
        this.wait = now + pause;
        break;
      case 'move':
      case 'line': {
        const x1 = Number(ev.x), y1 = Number(ev.y);
        const dist = Math.hypot(x1 - s.x, y1 - s.y);
        const dur = instant ? 0 : (dist / (UNITS_PER_SEC * this.speed)) * 1000;
        this.anim = { id: ev.id, x0: s.x, y0: s.y, x1, y1, start: now, dur, draw: s.pen || ev.op === 'line' };
        break;
      }
      case 'heading': s.heading = Number(ev.deg); this.wait = now + pause; break;
      case 'color': s.color = resolveColor(String(ev.color)); break;
      case 'size': s.size = Math.max(0.5, Number(ev.size)); break;
      case 'pen': s.pen = !!ev.down; break;
      case 'fill': s.filled = !!ev.filled; break;
      case 'circle':
      case 'rect':
      case 'text':
        this.shapes.push({ op: ev.op, x: s.x, y: s.y, heading: s.heading, color: s.color, size: s.size, filled: s.filled, r: Number(ev.r), w: Number(ev.w), h: Number(ev.h), text: String(ev.text ?? '') });
        if (this.shapes.length > 8000) this.shapes.splice(0, 1000);
        this.wait = now + pause;
        break;
      case 'clear': this.segs = []; this.shapes = []; break;
    }
  }

  private loop(now: number) {
    this.raf = requestAnimationFrame(this.loop);
    this.lastT = now;
    // advance animation state
    let guard = 200;
    while (guard-- > 0) {
      if (this.anim) {
        const a = this.anim;
        if (now - a.start >= a.dur) { this.finishAnim(now); continue; }
        break;
      }
      if (now < this.wait) break;
      if (!this.queue.length) break;
      this.step(now);
    }
    if (!this.finished && !this.anim && !this.queue.length && now >= this.wait) {
      this.finished = true;
      this.onFinish?.();
    }
    this.draw(now);
  }

  private draw(now: number) {
    const { canvas, ctx } = this;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
    const k = Math.min(w, h) / (2 * EXTENT);
    const X = (x: number) => w / 2 + x * k;
    const Y = (y: number) => h / 2 - y * k;

    // hairline axes
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, Math.round(h / 2) + 0.5); ctx.lineTo(w, Math.round(h / 2) + 0.5);
    ctx.moveTo(Math.round(w / 2) + 0.5, 0); ctx.lineTo(Math.round(w / 2) + 0.5, h); ctx.stroke();

    for (const shape of this.shapes) {
      ctx.save();
      ctx.translate(X(shape.x), Y(shape.y));
      ctx.strokeStyle = shape.color; ctx.fillStyle = shape.color;
      ctx.lineWidth = Math.max(1, shape.size * k * 0.6);
      if (shape.op === 'text') {
        ctx.font = `${Math.max(10, 12 * k)}px 'JetBrains Mono Variable', monospace`;
        ctx.fillText(shape.text ?? '', 0, 0);
      } else {
        ctx.rotate(shape.heading * Math.PI / 180);
        ctx.beginPath();
        if (shape.op === 'circle') ctx.arc(0, 0, Math.max(0, shape.r ?? 0) * k, 0, Math.PI * 2);
        else ctx.rect(-(shape.w ?? 0) * k / 2, -(shape.h ?? 0) * k / 2, (shape.w ?? 0) * k, (shape.h ?? 0) * k);
        if (shape.filled) ctx.fill(); else ctx.stroke();
      }
      ctx.restore();
    }

    ctx.lineCap = 'round';
    for (const sg of this.segs) {
      const age = now - sg.t;
      const alpha = Math.max(MIN_ALPHA, 1 - age / FADE_MS);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = sg.color; ctx.shadowColor = sg.color; ctx.shadowBlur = 8 * alpha;
      ctx.lineWidth = Math.max(1, sg.size * k * 0.6);
      ctx.beginPath(); ctx.moveTo(X(sg.x0), Y(sg.y0)); ctx.lineTo(X(sg.x1), Y(sg.y1)); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // in-progress trail + heads
    for (const [id, s] of this.dots) {
      let x = s.x, y = s.y;
      if (this.anim && this.anim.id === id) {
        const a = this.anim;
        const p = a.dur > 0 ? Math.min(1, (now - a.start) / a.dur) : 1;
        const e = p; // linear keeps speed readable
        x = a.x0 + (a.x1 - a.x0) * e; y = a.y0 + (a.y1 - a.y0) * e;
        if (a.draw) {
          ctx.strokeStyle = s.color; ctx.shadowColor = s.color; ctx.shadowBlur = 8;
          ctx.lineWidth = Math.max(1, s.size * k * 0.6);
          ctx.beginPath(); ctx.moveTo(X(a.x0), Y(a.y0)); ctx.lineTo(X(x), Y(y)); ctx.stroke();
        }
      }
      if (!s.visible) continue;
      const r = Math.max(3, s.size * k * 0.9);
      ctx.shadowColor = s.color; ctx.shadowBlur = 22; ctx.fillStyle = s.color;
      ctx.beginPath(); ctx.arc(X(x), Y(y), r, 0, Math.PI * 2); ctx.fill();
      // heading tick
      ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.5;
      const hr = (s.heading * Math.PI) / 180;
      ctx.beginPath(); ctx.moveTo(X(x), Y(y));
      ctx.lineTo(X(x) + Math.sin(hr) * (r + 7), Y(y) - Math.cos(hr) * (r + 7)); ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
}
