import { ContextString } from './contexts/types';
import { FunctionCallString } from './functions/types';

export * from './functions/types';
export * from './contexts/types';

export type ExpressionString = `\${{ ${ContextString | FunctionCallString} }}`;

export interface IExpression {
  toString(): ExpressionString;
}
