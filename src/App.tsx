import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { units, isBuilt } from './content';
import { globalStats, unitStats, useStore } from './progress';
import { applyZoom, zoomDelta } from './settings';
import { useRoute, go } from './router';
import { Settings } from './components/Settings';
import { Ring } from './components/Ring';
import { LessonStatusDot, LessonView } from './components/Lesson';

const ease = [0.22, 1, 0.36, 1] as const;

function useGlobalZoom() {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const d = zoomDelta(e);
      if (d === null) return;
      e.preventDefault();
      if (!(e.target as HTMLElement | null)?.closest?.('.monaco-editor')) applyZoom(d);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
}

function TopBar() {
  const s = useStore();
  const g = globalStats(s);
  return (
    <div className="topbar" role="progressbar" aria-valuenow={Math.round(g.pct * 100)} aria-valuemin={0} aria-valuemax={100}>
      <motion.div className="topbar-fill" initial={{ width: 0 }} animate={{ width: `${g.pct * 100}%` }} transition={{ duration: 1, ease }} />
    </div>
  );
}

function Header() {
  const s = useStore();
  const g = globalStats(s);
  return (
    <header className="header">
      <a className="brand" href="#/"><i />csa/java</a>
      <div className="nav">
        <a href="#/about">about</a>
        <Settings />
        <span className="pct">{Math.round(g.pct * 100)}%</span>
      </div>
    </header>
  );
}

function Toast() {
  const s = useStore();
  const g = globalStats(s);
  const prev = useRef(g.done);
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (g.done > prev.current) {
      setMsg(`Lesson complete. ${g.done} of ${g.total} done`);
      const t = setTimeout(() => setMsg(null), 3200);
      prev.current = g.done;
      return () => clearTimeout(t);
    }
    prev.current = g.done;
  }, [g.done, g.total]);
  return (
    <AnimatePresence>
      {msg && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{msg}</motion.div>}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="footer">
      Lesson structure follows <a href="https://github.com/bhoffman0/CSAwesome2">CSAwesome2</a> by Beryl Hoffman and contributors,
      licensed <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>. Content here is adapted and rewritten;
      this app is non-commercial and shared under the same license. Not affiliated with CSAwesome, Runestone or the College Board.
    </footer>
  );
}

function Overview() {
  const s = useStore();
  const g = globalStats(s);
  return (
    <>
      <div className="hero">
        <h1>Learn Java.<br /><span>One small step at a time.</span></h1>
        <p>AP Computer Science A, with an editor in every lesson. {g.done} of {g.total} lessons complete.</p>
      </div>
      <div className="units">
        {units.map((u, i) => {
          const st = unitStats(s, u.id);
          const live = isBuilt(u);
          const inner = (
            <>
              <Ring pct={st.pct} label={String(u.id)} />
              <div>
                <h3>{u.title}</h3>
                <p>{u.blurb}</p>
              </div>
              <div className="unit-meta">
                {live ? <>{st.done} / {st.total} lessons</> : <span className="tag">coming soon · {st.total} lessons planned</span>}
              </div>
            </>
          );
          return (
            <motion.div key={u.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.6, ease }}>
              {live
                ? <a className="unit-row live" href={`#/u/${u.id}`}>{inner}</a>
                : <div className="unit-row soon">{inner}</div>}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

function UnitPage({ unitId }: { unitId: number }) {
  const u = units.find((x) => x.id === unitId);
  if (!u || !isBuilt(u)) return <NotFound />;
  return (
    <>
      <div className="hero" style={{ marginBottom: '4vh' }}>
        <div className="eyebrow">Unit {u.id}</div>
        <h1>{u.title}</h1>
        <p>{u.blurb}</p>
      </div>
      <div className="units">
        {u.lessons.map((l, i) => (
          <motion.a key={l.id} className="lesson-row" href={`#/u/${u.id}/${l.id}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.5, ease }}>
            <span className="num">{l.id.replace('-', '.')}</span>
            <span className="t">{l.title}</span>
            <LessonStatusDot unit={u} lesson={l} />
          </motion.a>
        ))}
      </div>
    </>
  );
}

function About() {
  return (
    <div className="about">
      <h1>About</h1>
      <div className="md">
        <p>A personal AP CS A (Java) practice app with an in-page editor for every exercise. Code runs on a local server using your system <code>javac</code> and <code>java</code>.</p>
        <p><strong>Dot</strong> is a small helper class that replaces the Turtle used in other courses. Its calls print protocol lines that this page replays as an animation.</p>
        <h3>Attribution</h3>
        <p>
          The unit and lesson structure (and the ideas behind many exercises) come from <a href="https://github.com/bhoffman0/CSAwesome2">CSAwesome2</a> (Runestone Academy / Beryl Hoffman and contributors),
          licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0</a>.
          Text and exercises here are adapted and rewritten. Changes were made. This app is for non-commercial personal use and adaptations are shared under the same license.
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return <div className="hero"><h1>Not found</h1><p><a href="#/">Back to start</a></p></div>;
}

function Routes() {
  const route = useRoute();
  const m = /^\/u\/(\d+)(?:\/([\w-]+))?$/.exec(route);
  if (route === '/') return <Overview />;
  if (route === '/about') return <About />;
  if (m) {
    const u = units.find((x) => x.id === Number(m[1]));
    if (!u) return <NotFound />;
    if (!m[2]) return <UnitPage unitId={u.id} />;
    const l = u.lessons.find((x) => x.id === m[2]);
    return l ? <LessonView unit={u} lesson={l} /> : <NotFound />;
  }
  return <NotFound />;
}

export default function App() {
  useGlobalZoom();
  const route = useRoute();
  // lessons transition per lesson; other pages per route
  const key = route;
  return (
    <>
      <TopBar />
      <Header />
      <main className="page">
        <AnimatePresence mode="wait">
          <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
            <Routes />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </main>
      <Toast />
    </>
  );
}

export { go };
