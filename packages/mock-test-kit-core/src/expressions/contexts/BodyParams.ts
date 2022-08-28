import * as Ctx from './Context';
import { Context } from '../../types';

export const createBodyParams = (value: string): Context =>
  Ctx.create('body', value);
