import type { Unit } from './types';
import { unit1 } from './unit1';
import { unit2 } from './unit2';
import { unit3 } from './unit3';
import { unit4 } from './unit4';
import { unit5 } from './unit5';
export { md } from './md';

// Unit titles and topic counts follow the CSAwesome2 table of contents.
// Units 1 and 2 are built; the rest show as "coming soon". Planned counts match the CSAwesome2 topic lists.
export const units: Unit[] = [
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
];

export const isBuilt = (u: Unit) => u.lessons.length > 0;
