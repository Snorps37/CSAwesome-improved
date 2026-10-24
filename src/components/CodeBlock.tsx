import { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CodeBlock as CodeBlockT } from '../content/types';
import { parseRun, runJava, type ParsedRun } from '../runner';
import { checkRun, isRequired } from '../check';
import { getCode, markBlockDone, saveCode, useStore } from '../progress';
import { applyZoom, lineHeightFor, useSettings, zoomDelta } from '../settings';
import { Markdown } from './Markdown';
import { DotStage } from './DotStage';

const ease = [0.22, 1, 0.36, 1] as const;

export function CodeBlock({ block, lessonId }: { block: CodeBlockT; lessonId: string }) {
  const store = useStore();
  const done = !!store.done[lessonId]?.[block.id];
  const required = isRequired(block);
  const [code, setCode] = useState(() => getCode(block.id) ?? block.starter);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ParsedRun | null>(null);
  const [verdict, setVerdict] = useState<{ ok: boolean; msg?: string } | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [showSol, setShowSol] = useState(false);
  const [height, setHeight] = useState(() => Math.min(460, Math.max(140, block.starter.split('\n').length * 21 + 12)));
  const { fontSize } = useSettings();
  const codeRef = useRef(code);
  codeRef.current = code;
  const runningRef = useRef(false);

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    const parsed = parseRun(await runJava(codeRef.current));
    setResult(parsed);
    setRunKey((k) => k + 1);
    const v = checkRun(block, parsed);
    if (required) {
      setVerdict(v);
      if (v.ok) markBlockDone(lessonId, block.id);
    }
    runningRef.current = false;
    setRunning(false);
  }, [block, lessonId, required]);

  const runRef = useRef(run);
  runRef.current = run;

  const onMount: OnMount = (editor, monaco) => {
    editor.onKeyDown((e) => {
      if (e.keyCode === monaco.KeyCode.Enter && (e.ctrlKey || e.metaKey) && !e.altKey) {
        e.preventDefault(); e.stopPropagation();
        runRef.current();
      }
    });
    const K = monaco.KeyCode, C = monaco.KeyMod.CtrlCmd;
    for (const k of [K.Equal, K.NumpadAdd]) editor.addCommand(C | k, () => applyZoom(1));
    editor.addCommand(C | monaco.KeyMod.Shift | K.Equal, () => applyZoom(1));
    for (const k of [K.Minus, K.NumpadSubtract]) editor.addCommand(C | k, () => applyZoom(-1));
    for (const k of [K.Digit0, K.Numpad0]) editor.addCommand(C | k, () => applyZoom(0));
    editor.getDomNode()?.addEventListener('wheel', (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault(); e.stopPropagation();
      applyZoom(e.deltaY < 0 ? 1 : -1);
    }, { passive: false, capture: true });
  };

  useEffect(() => {
    const t = setTimeout(() => saveCode(block.id, code), 300);
    return () => clearTimeout(t);
  }, [code, block.id]);

  const autoHeight = () => Math.min(460, Math.max(140, block.starter.split('\n').length * 21 + 12));
  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget, y0 = e.clientY, h0 = height;
    el.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => setHeight(Math.min(900, Math.max(100, h0 + ev.clientY - y0)));
    const up = () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  };

  const reset = () => { setCode(block.starter); setResult(null); setVerdict(null); };
  const hasDots = !!result && result.dots.length > 0;
  const showCanvas = block.dot || hasDots;

  return (
    <div className="block code-block">
      {block.prompt && <div className="prompt"><Markdown>{block.prompt}</Markdown></div>}
      <div className={'editor-shell' + (done ? ' ok' : '')}>
        <Editor
          height={height} language="java" theme="void" value={code}
          onChange={(v) => setCode(v ?? '')} onMount={onMount}
          options={{
            fontFamily: "'JetBrains Mono Variable', monospace", fontSize, lineHeight: lineHeightFor(fontSize),
            minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true,
            padding: { top: 6, bottom: 6 }, renderLineHighlight: 'none', overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true, scrollbar: { vertical: 'auto', horizontal: 'auto', useShadows: false },
            folding: false, glyphMargin: false, lineDecorationsWidth: 8, lineNumbersMinChars: 3,
            tabSize: 4, wordWrap: 'on', fixedOverflowWidgets: true, contextmenu: false,
          }}
          onValidate={() => undefined}
          loading={<div style={{ height, color: 'var(--faint)', fontFamily: 'var(--mono)', fontSize: 13, padding: 16 }}>loading editor</div>}
        />
        <div className="resize-handle" title="drag to resize, double-click to reset" onPointerDown={startDrag} onDoubleClick={() => setHeight(autoHeight())} />
      </div>
      <div className="toolbar">
        <motion.button className="btn primary" disabled={running} onClick={run} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
          {running ? 'Running' : 'Run'} <span style={{ opacity: 0.45, fontSize: 12 }}>ctrl+enter</span>
        </motion.button>
        <button className="link" onClick={reset}>reset</button>
        {block.solution && <button className="link" onClick={() => setShowSol((s) => !s)}>{showSol ? 'hide solution' : 'show solution'}</button>}
        {block.hint && <span className="link" title={block.hint}>hint: {block.hint}</span>}
        <AnimatePresence mode="wait">
          {done && required ? (
            <motion.span key="d" className="status ok" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>done</motion.span>
          ) : verdict && !verdict.ok ? (
            <motion.span key="v" className="status bad" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>not yet</motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {showSol && block.solution && (
          <motion.div key="sol" className="console" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <div className="hintbox"><div className="label" style={{ marginTop: 16 }}>solution</div><pre>{block.solution}</pre></div>
          </motion.div>
        )}
      </AnimatePresence>

      {showCanvas && <DotStage events={result?.dots ?? []} runKey={runKey} />}

      <AnimatePresence initial={false}>
        {result && (
          <motion.div
            key={runKey} className="console"
            initial={{ opacity: 0, y: 8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} transition={{ duration: 0.4, ease }}
          >
            {(result.console || (!result.stderr && !hasDots)) && (
              <div className="out" style={{ marginTop: 18 }}>
                <div className="label">output</div>
                <pre>{result.console || '(no output)'}</pre>
              </div>
            )}
            {result.stderr && (
              <div className="err" style={{ marginTop: 18 }}>
                <div className="label">{result.compileError ? 'compile error' : 'error'}</div>
                <pre>{result.stderr}</pre>
              </div>
            )}
            {verdict && !verdict.ok && verdict.msg && !result.stderr && (
              <div className="hintbox" style={{ marginTop: 18 }}><pre>{verdict.msg}</pre></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
