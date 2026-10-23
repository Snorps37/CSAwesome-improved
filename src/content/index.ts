import type { Unit } from './types';
import { unit1 } from './unit1';
export { md } from './md';

// Unit titles and topic counts follow the CSAwesome2 table of contents.
// Only Unit 1 is built so far; the rest show as "coming soon".
export const units: Unit[] = [
  unit1,
  { id: 2, title: 'Selection and Iteration', blurb: 'Booleans, if statements, while and for loops.', lessons: [], plannedLessons: 12 },
  { id: 3, title: 'Class Creation', blurb: 'Writing your own classes, constructors, and methods.', lessons: [], plannedLessons: 9 },
  { id: 4, title: 'Data Collections', blurb: 'Arrays, ArrayLists, 2D arrays, searching, sorting, recursion.', lessons: [], plannedLessons: 17 },
  { id: 5, title: 'Inheritance', blurb: 'Subclasses, overriding, polymorphism (optional unit).', lessons: [], plannedLessons: 7 },
];

export const isBuilt = (u: Unit) => u.lessons.length > 0;
