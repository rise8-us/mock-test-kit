import type { Context, Expression, Func } from '../types';

export const createExpression = (value: Context | Func): Expression =>
  `\${{ ${value} }}`;
