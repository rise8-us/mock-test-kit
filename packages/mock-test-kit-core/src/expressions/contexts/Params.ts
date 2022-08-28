import { Context } from './Context';
import { IContext } from './types';

class Params extends Context {
  constructor(value: string) {
    super('params', value);
  }
}

export const getParam = (value: string): IContext => {
  return new Params(value);
};
