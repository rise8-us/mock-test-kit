import * as Ctx from './Context';
import { Context } from '../../types';

export const createParams = (value: string): Context =>
  Ctx.create('params', value);
