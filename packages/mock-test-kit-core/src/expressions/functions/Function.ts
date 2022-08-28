import {
  FunctionCallArgs,
  FunctionCallString,
  FunctionName,
  IFunctionCall,
} from './types';

export class FunctionCall implements IFunctionCall {
  _name: FunctionName;
  _args: FunctionCallArgs;

  constructor(name: FunctionName, ...args: FunctionCallArgs) {
    this._name = name;
    this._args = args;
  }

  toString(): FunctionCallString {
    return `${this._name}(${this._args.join(', ')})`;
  }
}
