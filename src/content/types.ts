export type TextBlock = { type: 'text'; md: string };

export type CodeBlock = {
  type: 'code';
  id: string;
  /** Short markdown prompt shown above the editor. */
  prompt?: string;
  starter: string;
  /** Required to finish the lesson if any check below is set (or completeOnRun). */
  expected?: string; // console output must equal this (trimmed, per-line trailing space ignored)
  mustContain?: string[]; // console output must include each of these
  minDotMoves?: number; // number of Dot move events required
  completeOnRun?: boolean; // done as soon as it runs without error
  hint?: string;
  /** Reference solution (revealed on demand; also used by the self-test script). */
  solution?: string;
  /** Show the dot canvas for this editor. */
  dot?: boolean;
};

export type QuizBlock = {
  type: 'quiz';
  id: string;
  question: string; // markdown
  choices: string[];
  answer: number;
  explanation?: string;
};

/** Predict-the-output: the learner types what the program prints. */
export type PredictBlock = {
  type: 'predict';
  id: string;
  question: string; // markdown prompt
  /** Complete Java program shown to the learner. Its real output must equal `answer` (verified by the selftest). */
  code: string;
  answer: string; // compared with whitespace collapsed
  explanation?: string;
};

export type Block = TextBlock | CodeBlock | QuizBlock | PredictBlock;

export type Lesson = {
  id: string; // e.g. "1-2"
  title: string;
  blocks: Block[];
};

export type Unit = {
  id: number;
  title: string;
  blurb: string;
  lessons: Lesson[];
  /** For units not built yet: number of lessons planned (from the CSAwesome2 topic list). */
  plannedLessons?: number;
};
