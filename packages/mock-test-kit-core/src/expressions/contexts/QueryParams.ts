import * as Ctx from './Context';
import { Context } from '../../types';

export const createQueryParams = (value: string): Context =>
  Ctx.create('query', value);
