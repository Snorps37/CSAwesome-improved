import type { Unit } from './types';
import { unit4a } from './unit4a';
import { unit4b } from './unit4b';
import { unit4c } from './unit4c';

// Lessons 4-1..4-15 follow CSAwesome2 Unit 4 topics 4.1-4.15 in order; 4-16..4-21 are review, practice, FRQs and projects. Original wording.
export const unit4: Unit = {
  id: 4,
  title: 'Data Collections',
  blurb: 'Arrays, ArrayLists, 2D arrays, searching, sorting, recursion.',
  lessons: [...unit4a, ...unit4b, ...unit4c],
};
