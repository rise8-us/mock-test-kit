import { init, generate } from './Mock';
export type { Func, Context, Expression } from './types';
export { Matcher } from './Matcher';

import { Context, Expression, Func } from './types';

import {
  Ctx as Contexts,
  Expr as Expressions,
  Fn as Functions,
} from './expressions';

export namespace Ctx {
  export const headers = Contexts.createHeaders;
  export const params = Contexts.createParams;
  export const queryParams = Contexts.createQueryParams;
  export const bodyParams = Contexts.createBodyParams;
}

export namespace Fn {
  export const jwt = Functions.createJwt;
  export const now = Functions.createNow;
}

export namespace Expr {
  export const create: (value: Context | Func) => Expression =
    Expressions.createExpression;
}

namespace MockTestKit {
  export const initialize = init;
  export const generateJSON = generate;
}
export { Contexts, MockTestKit as default };

export { RestResponseBuilder, RestRequestBuilder } from './builders';
