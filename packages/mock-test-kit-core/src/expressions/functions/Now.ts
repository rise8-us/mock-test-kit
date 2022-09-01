import { create, Func } from './Function';

export const createNow = (num: number, unit: 'sec' | 'ms'): Func =>
  create('now', num, unit);
