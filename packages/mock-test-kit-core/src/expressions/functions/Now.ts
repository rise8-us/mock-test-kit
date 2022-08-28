import * as Function from './Function';

export const createNow = (num: number, unit: 'sec' | 'ms') =>
  Function.create('now', num, unit);
