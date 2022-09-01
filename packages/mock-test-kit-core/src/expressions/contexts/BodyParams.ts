import { Context, create } from './Context';

export const createBodyParams = (value: string): Context =>
  create('body', value);
