import type { Unit } from './types';
import { unit1 } from './unit1';
import { unit2 } from './unit2';
export { md } from './md';

// Unit titles and topic counts follow the CSAwesome2 table of contents.
// Units 1 and 2 are built; the rest show as "coming soon". Planned counts match the CSAwesome2 topic lists.
export const units: Unit[] = [
  unit1,
  unit2,
  { id: 3, title: 'Class Creation', blurb: 'Writing your own classes, constructors, and methods.', lessons: [], plannedLessons: 9 },
  { id: 4, title: 'Data Collections', blurb: 'Arrays, ArrayLists, 2D arrays, searching, sorting, recursion.', lessons: [], plannedLessons: 17 },
  { id: 5, title: 'Inheritance', blurb: 'Subclasses, overriding, polymorphism (optional unit).', lessons: [], plannedLessons: 7 },
];

export const isBuilt = (u: Unit) => u.lessons.length > 0;
