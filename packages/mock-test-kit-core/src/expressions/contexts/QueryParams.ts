import { Context, create } from './Context';

export const createQueryParams = (value: string): Context =>
  create('query', value);
