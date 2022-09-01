import { createExpression, Expression } from './Expression';
import { Func } from './functions/Function';
import { Context } from './contexts/Context';

/**
 *
 */
export namespace Expr {
  /**
   * @example
   * const expression = Expr.create(Ctx.params('id'));
   * const expression2 = Expr.create(Fn.now(3600, 'ms'));
   */
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
