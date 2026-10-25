import type { Lesson, Unit } from './types';
import { unit3a } from './unit3a';
import { unit3b } from './unit3b';
import { unit3c } from './unit3c';
import {
  referenceLesson, toggleLesson, mixedLesson, cupcakeLesson, stepLesson,
  timeLesson, labsLesson, communityLesson, projectsLesson, extraExamQuestions,
  summaryExercise,
} from './unit3d';

// Reuse the original detailed instruction and exercises while following the
// CSAwesome2 topic order. Introduction is the opening of the first topic.
const lesson = (source: Lesson, id: string, title: string): Lesson => ({ ...source, id, title });
const methods = lesson(unit3a[4], '3-5', 'Methods: How to Write Them');
methods.blocks = [
  ...methods.blocks.filter((block) => block.type === 'text' ||
    ['q-ret', 'q-ovl', 'p-prim', 'pbv-method'].includes(block.id)),
  ...unit3b[0].blocks.filter((block) => block.type === 'text' ||
    ['q-acc', 'q-why', 'p-student', 'acc-account'].includes(block.id)),
];
const staticLesson = lesson(unit3b[1], '3-7', 'Class (static) Variables and Methods');
staticLesson.blocks = staticLesson.blocks.filter((block) => block.type !== 'code' || block.id !== 'stat-const');
const summary = lesson(unit3c[0], '3-10', 'Unit 3 Summary');
summary.blocks = [...summary.blocks, summaryExercise];
const exam = lesson(unit3c[3], '3-15', 'Unit 3 Test');
exam.blocks = [...exam.blocks, ...extraExamQuestions];
const frqPractice = lesson(unit3c[4], '3-17', 'FRQ 2 Practice with Classes');
frqPractice.blocks = [{ type: 'text', md: `### Three-part class-design practice
For the Thermostat task, complete these parts in sequence. **Part (a):** choose private state and write the constructor under the precondition that the initial target is in [50,90]. **Part (b):** implement bounded raise/lower and the on/off mutators; rejected changes leave state unchanged. **Part (c):** implement the accessors and describe method, then test both boundaries and two independent objects.

For ScoreKeeper, scores may be any int. Track highest correctly even when every score is negative. Before any score, getHighest returns 0 and getAverage returns 0.0. Partition the work into private state, record, and reporting methods. After the supplied driver passes, add tests for no records, negative records, and equal highest scores.` }, ...frqPractice.blocks];
frqPractice.blocks = frqPractice.blocks.map((block) => {
  if (block.type !== 'code') return block;
  return {
    ...block,
    starter: block.starter
      .replace('// TODO: class Thermostat', 'class Thermostat {\n    // TODO: private fields, constructor, and specified public methods\n}')
      .replace('// TODO: class ScoreKeeper', 'class ScoreKeeper {\n    // TODO: private fields and specified public methods\n}'),
  };
});

const lessons: Lesson[] = [
  unit3a[0], unit3a[1],
  lesson(unit3a[2], '3-3', 'Anatomy of a Java Class'),
  lesson(unit3a[3], '3-4', 'Writing Constructors'),
  methods, referenceLesson,
  staticLesson,
  unit3b[2], unit3b[3], summary, toggleLesson, mixedLesson,
  lesson(unit3c[1], '3-13', 'Unit 3 Write Code Practice for Classes'),
  lesson(unit3c[2], '3-14', 'Multiple-Choice Exercises - Objects and Classes'),
  exam, cupcakeLesson, frqPractice, stepLesson, timeLesson, labsLesson,
  communityLesson, projectsLesson,
];

export const unit3: Unit = {
  id: 3,
  title: 'Class Creation',
  blurb: 'Introduction to class design: abstraction, constructors, methods, references, shared state, and tested object-oriented systems.',
  lessons: lessons.map((entry) => ({
    ...entry,
    blocks: entry.blocks.map((block, index) => block.type === 'text' ? block : {
      ...block, id: `u3-${entry.id}-${index}-${block.id}`,
    }),
  })),
};
