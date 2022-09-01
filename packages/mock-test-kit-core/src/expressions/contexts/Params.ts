import { create } from './Context';
import type { Context } from '../../types';

export const createParams = (value: string): Context => create('params', value);
