export type FunctionName = 'jwt' | 'now' | 'base64Encode';
export type FunctionCallString = `${FunctionName}(${string})`;
export type FunctionCallArgs = (string | number | boolean)[];

export interface IFunctionCall {
  toString(): FunctionCallString;
}

export type NowFunctionCallUnit = 'sec' | 'ms';
