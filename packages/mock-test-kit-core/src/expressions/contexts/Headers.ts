import { Context, create } from './Context';

export const createHeaders = (value: string): Context =>
  create('headers', value);
