import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { QuizBlock } from '../content/types';
import { Markdown } from './Markdown';
import { markBlockDone, useStore } from '../progress';

export function Quiz({ block, lessonId }: { block: QuizBlock; lessonId: string }) {
  const store = useStore();
  const solved = !!store.done[lessonId]?.[block.id];
  const [picked, setPicked] = useState<number | null>(null);
  const correct = solved || picked === block.answer;

  const pick = (i: number) => {
    setPicked(i);
    if (i === block.answer) markBlockDone(lessonId, block.id);
  };

  return (
    <div className="block quiz">
      <div className="q"><Markdown>{block.question}</Markdown></div>
      {block.choices.map((c, i) => {
        const isRight = (solved || picked !== null) && i === block.answer && correct;
        const isWrong = picked === i && i !== block.answer;
        return (
          <motion.button
            key={i} whileTap={{ scale: 0.99 }} disabled={correct}
            className={'choice' + (isRight ? ' right' : '') + (isWrong ? ' wrong' : '')}
            onClick={() => pick(i)}
          >
            <span className="k">{String.fromCharCode(65 + i)}</span><span>{c}</span>
          </motion.button>
        );
      })}
      <AnimatePresence>
        {(picked !== null || solved) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="explain">
              {correct ? 'Correct. ' + (block.explanation ?? '') : 'Not quite, try another.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
