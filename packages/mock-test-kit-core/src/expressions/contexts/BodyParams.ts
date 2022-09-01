import { create } from './Context';
import type { Context } from '../../types';

export const createBodyParams = (value: string): Context =>
  create('body', value);
