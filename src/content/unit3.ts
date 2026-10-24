import type { Unit } from './types';
import { unit3a } from './unit3a';
import { unit3b } from './unit3b';
import { unit3c } from './unit3c';

// Lessons follow CSAwesome2 Unit 3 topics 3.1-3.10, then review material. Text is original wording.
export const unit3: Unit = {
  id: 3,
  title: 'Class Creation',
  blurb: 'Writing your own classes, constructors, and methods.',
  lessons: [...unit3a, ...unit3b, ...unit3c],
};
