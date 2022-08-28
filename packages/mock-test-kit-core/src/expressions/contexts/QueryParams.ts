import { Context } from './Context';
import { IContext } from './types';

class QueryParams extends Context {
  constructor(value: string) {
    super('query', value);
  }
}

export const getQueryParam = (value: string): IContext => {
  return new QueryParams(value);
};
