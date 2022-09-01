import { create } from './Context';
import type { Context } from '../../types';

export const createQueryParams = (value: string): Context =>
  create('query', value);
