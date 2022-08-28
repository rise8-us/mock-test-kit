import type { Context } from '../../types';

export const create = (context: string, value: string): Context =>
  `${context}.${value}`;
