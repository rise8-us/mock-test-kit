import { create } from './Function';
import { Func } from '../../types';

export const createNow = (num: number, unit: 'sec' | 'ms'): Func =>
  create('now', num, unit);
