import { Context } from './Context';
import { IContext } from './types';

class BodyParams extends Context {
  constructor(value: string) {
    super('body', value);
  }
}

export const getBodyParam = (value: string): IContext => {
  return new BodyParams(value);
};
