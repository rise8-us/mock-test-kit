import { createExpression } from './Expression';
import { Context, Expression, Func } from '../types';

export namespace Expr {
  export const create: (value: Context | Func) => Expression = createExpression;
}

export * from './Expression';
export {
  Ctx,
  createQueryParams,
  createParams,
  createBodyParams,
  createHeaders,
} from './contexts';
export { Fn, createNow, createJwt } from './functions';
