import { create } from './Context';
import type { Context } from '../../types';

export const createHeaders = (value: string): Context =>
  create('headers', value);
