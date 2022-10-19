import { FunctionCall } from './Function';
import { IFunctionCall } from './types';

class Base64EncodeCall extends FunctionCall {
  constructor(value: string) {
    super('base64Encode', value);
  }
}

export const callBase64Encode = (
  value: string | Record<string, unknown>,
): IFunctionCall =>
  new Base64EncodeCall(
    typeof value === 'object' ? JSON.stringify(value) : value,
  );
