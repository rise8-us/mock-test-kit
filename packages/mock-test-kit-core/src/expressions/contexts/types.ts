export type RequestContext = 'headers' | 'query' | 'body' | 'params';
export type ContextString = `${RequestContext}.${string}`;

export interface IContext {
  toString(): ContextString;
}
