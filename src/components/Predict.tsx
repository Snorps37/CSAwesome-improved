import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PredictBlock } from '../content/types';
import { Markdown } from './Markdown';
import { normAnswer } from '../check';
import { markBlockDone, useStore } from '../progress';

export function Predict({ block, lessonId }: { block: PredictBlock; lessonId: string }) {
  const store = useStore();
  const solved = !!store.done[lessonId]?.[block.id];
  const [val, setVal] = useState('');
  const [tried, setTried] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const right = normAnswer(val) === normAnswer(block.answer);

  const submit = () => {
    setTried(true);
    if (right) markBlockDone(lessonId, block.id);
  };

  return (
    <div className="block quiz predict">
      <div className="q"><Markdown>{block.question}</Markdown></div>
      <Markdown>{'§§§java\n' + block.code.replace(/\n$/, '') + '\n§§§'}</Markdown>
      <textarea
        className="predict-in" rows={Math.max(1, block.answer.split('\n').length)} spellCheck={false}
        placeholder="Type the exact output (separate lines with Enter)"
        value={solved ? block.answer : val} disabled={solved}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit(); }}
      />
      {!solved && (
        <div className="toolbar">
          <button className="btn ghost" onClick={submit}>Check</button>
          <button className="link" onClick={() => setRevealed((r) => !r)}>{revealed ? 'hide answer' : 'reveal answer'}</button>
        </div>
      )}
      <AnimatePresence>
        {revealed && !solved && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <Markdown>{'§§§\n' + block.answer + '\n§§§'}</Markdown>
            {block.explanation && <p className="explain">{block.explanation}</p>}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(tried || solved) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <p className="explain">{solved || right ? 'Correct. ' + (block.explanation ?? '') : 'Not quite. Trace the code again, line by line.'}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
