import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lesson as LessonT, Unit } from '../content/types';
import { Markdown } from './Markdown';
import { CodeBlock } from './CodeBlock';
import { Quiz } from './Quiz';
import { Predict } from './Predict';
import { requiredBlocks, setCompleted, useStore, resetLesson } from '../progress';
import { go } from '../router';

export function LessonStatusDot({ unit, lesson, current }: { unit: Unit; lesson: LessonT; current?: boolean }) {
  const s = useStore();
  const req = requiredBlocks(lesson.id);
  const n = req.filter((b) => s.done[lesson.id]?.[b]).length;
  const on = !!s.completed[lesson.id];
  void unit;
  return <span className={'dot' + (on ? ' on' : n > 0 ? ' partial' : '') + (current ? ' current' : '')} />;
}

function Toc({ lesson }: { lesson: LessonT }) {
  const s = useStore();
  const [heads, setHeads] = useState<{ id: string; text: string }[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      const hs = Array.from(document.querySelectorAll<HTMLElement>('.lesson .md h3'));
      setHeads(hs.map((h, i) => { h.id ||= `sec-${i}`; h.style.scrollMarginTop = '24px'; return { id: h.id, text: h.textContent || '' }; }));
    }, 150);
    return () => clearTimeout(t);
  }, [lesson.id]);
  const exercises = lesson.blocks.map((b, i) => ({ b, i })).filter(({ b }) => b.type !== 'text');
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <aside className="toc" aria-label="on this page">
      <div className="unit-title">On this page</div>
      {heads.map((h) => <a key={h.id} href={`#${h.id}`} onClick={go(h.id)}>{h.text}</a>)}
      {exercises.length > 0 && <div className="unit-title" style={{ marginTop: 18 }}>Exercises</div>}
      {exercises.map(({ b, i }, n) => {
        const d = !!s.done[lesson.id]?.[(b as { id: string }).id];
        return <a key={i} className={'ex' + (d ? ' done' : '')} href={`#blk-${i}`} onClick={go(`blk-${i}`)}><span className="tick">{d ? '✓' : ''}</span>{b.type} {n + 1}</a>;
      })}
    </aside>
  );
}

export function LessonView({ unit, lesson }: { unit: Unit; lesson: LessonT }) {
  const s = useStore();
  const idx = unit.lessons.findIndex((l) => l.id === lesson.id);
  const prev = unit.lessons[idx - 1], next = unit.lessons[idx + 1];
  const req = requiredBlocks(lesson.id);
  const n = req.filter((b) => s.done[lesson.id]?.[b]).length;
  const complete = !!s.completed[lesson.id];

  return (
    <div className="lesson-wrap">
      <nav className="side">
        <div className="unit-title">Unit {unit.id}</div>
        {unit.lessons.map((l) => (
          <a key={l.id} href={`#/u/${unit.id}/${l.id}`} className={l.id === lesson.id ? 'active' : ''}>
            <LessonStatusDot unit={unit} lesson={l} current={l.id === lesson.id} />
            <span>{l.title}</span>
          </a>
        ))}
      </nav>
      <article className="lesson">
        <div className="eyebrow">{lesson.id.replace('-', '.')}</div>
        <h1>{lesson.title}</h1>
        <div className="progress-note">{n} / {req.length} exercises done</div>
        <div style={{ height: 36 }} />
        {lesson.blocks.map((b, i) => (
          <motion.div id={`blk-${i}`} key={lesson.id + i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            {b.type === 'text' ? <Markdown>{b.md}</Markdown>
              : b.type === 'code' ? <CodeBlock block={b} lessonId={lesson.id} />
              : b.type === 'predict' ? <Predict block={b} lessonId={lesson.id} />
              : <Quiz block={b} lessonId={lesson.id} />}
          </motion.div>
        ))}
        <div className="lesson-foot">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <motion.button className={'btn ghost' + (complete ? ' done' : '')} whileTap={{ scale: 0.97 }} onClick={() => setCompleted(lesson.id, !complete)}>
              {complete ? 'Completed' : 'Mark complete'}
            </motion.button>
            {complete && <button className="link" onClick={() => resetLesson(lesson.id)}>reset progress</button>}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {prev && <button className="btn ghost" onClick={() => go(`/u/${unit.id}/${prev.id}`)}>Previous</button>}
            {next
              ? <button className="btn primary" onClick={() => go(`/u/${unit.id}/${next.id}`)}>Next lesson</button>
              : <button className="btn primary" onClick={() => go('/')}>All units</button>}
          </div>
        </div>
      </article>
      <Toc lesson={lesson} />
    </div>
  );
}
