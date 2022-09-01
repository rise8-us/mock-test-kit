import { Context } from './contexts/Context';
import { Func } from './functions/Function';

export type Expression = `\${{ ${Context | Func} }}`;

export const createExpression = (value: Context | Func): Expression =>
  `\${{ ${value} }}`;
