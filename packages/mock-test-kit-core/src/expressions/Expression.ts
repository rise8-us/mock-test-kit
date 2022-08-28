import { ContextString, IContext } from './contexts/types';
import { FunctionCallString, IFunctionCall } from './functions/types';
import { ExpressionString, IExpression } from './types';

export class Expression implements IExpression {
  private readonly _value: ContextString | FunctionCallString;

  constructor(value: IContext | IFunctionCall) {
    this._value = value.toString();
  }

  toString(): ExpressionString {
    return `\${{ ${this._value} }}`;
  }
}

export const create = (value: IContext | IFunctionCall): IExpression => {
  return new Expression(value);
};
