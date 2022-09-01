import { Context, create } from './Context';

export const createParams = (value: string): Context => create('params', value);
