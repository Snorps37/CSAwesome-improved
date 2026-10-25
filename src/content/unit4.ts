import type { Unit } from './types';
import { unit4a } from './unit4a';
import { unit4b } from './unit4b';
import { unit4c } from './unit4c';
import { unit4d } from './unit4d';
import { unit4e } from './unit4e';
import { unit4f } from './unit4f';
import { unit4h } from './unit4h';

export const unit4: Unit = {
  id: 4,
  title: 'Data Collections',
  blurb: 'Arrays, ArrayLists, 2D arrays, searching, sorting, recursion, labs, and projects.',
  lessons: [...unit4a, ...unit4b, ...unit4c, ...unit4d, ...unit4e, ...unit4f, ...unit4h]
    .sort((a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1])),
};
