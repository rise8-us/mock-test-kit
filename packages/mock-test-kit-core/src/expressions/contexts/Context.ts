import { ContextString, IContext, RequestContext } from './types';

export class Context implements IContext {
  protected _context: RequestContext;
  protected _value: string;

  constructor(context: RequestContext, value: string) {
    this._context = context;
    this._value = value;
  }

  public toString(): ContextString {
    return `${this._context}.${this._value}`;
  }
}
