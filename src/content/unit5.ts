import type { Unit } from './types';
import { unit5a } from './unit5a';
import { unit5b } from './unit5b';
import { unit5c } from './unit5c';

// Lessons follow CSAwesome2 Unit 5 topics 5.1-5.7, then summary and practice. Text is original wording.
export const unit5: Unit = {
  id: 5,
  title: 'Inheritance',
  blurb: 'Subclasses, overriding, polymorphism (optional unit).',
  lessons: [...unit5a, ...unit5b, ...unit5c],
};
