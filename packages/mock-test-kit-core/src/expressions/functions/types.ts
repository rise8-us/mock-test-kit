export type FunctionName = 'jwt' | 'now';
export type FunctionCallString = `${FunctionName}(${string})`;
export type FunctionCallArgs = (string | number | boolean)[];

export interface IFunctionCall {
  toString(): FunctionCallString;
}

export type NowFunctionCallUnit = 'sec' | 'ms';
