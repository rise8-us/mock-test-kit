import * as Ctx from './Context';
import { Context } from '../../types';

export const createHeaders = (value: string): Context =>
  Ctx.create('headers', value);
