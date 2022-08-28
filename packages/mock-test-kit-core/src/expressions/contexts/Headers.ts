import { Context } from './Context';
import { IContext } from './types';

class Headers extends Context {
  constructor(value: string) {
    super('headers', value);
  }
}

export const getHeader = (value: string): IContext => {
  return new Headers(value);
};
