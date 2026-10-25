import type { Unit } from './types';
import { unit2a } from './unit2a';
import { unit2b } from './unit2b';
import { unit2c } from './unit2c';
import { unit2d } from './unit2d';

// Lessons follow CSAwesome2 Unit 2 topics 2.1-2.32 in order. Text is original wording.
export const unit2: Unit = {
  id: 2,
  title: 'Selection and Iteration',
  blurb: 'Booleans, if statements, while and for loops, string algorithms, nested loops and loop analysis.',
  lessons: [...unit2a, ...unit2b, ...unit2c, ...unit2d],
};
