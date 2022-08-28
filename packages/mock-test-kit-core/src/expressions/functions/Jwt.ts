import { FunctionCall } from './Function';
import { IFunctionCall } from './types';

class JwtCall extends FunctionCall {
  constructor(
    payload: Record<string, unknown>,
    privateKey: string,
    options: Record<string, unknown> | null = null,
    passphrase: string | null = null,
  ) {
    super(
      'jwt',
      JSON.stringify(payload),
      JSON.stringify(privateKey),
      JSON.stringify(options),
      JSON.stringify(passphrase),
    );
  }
}

export const callJwt = (
  payload: Record<string, unknown>,
  privateKey: string,
  options: Record<string, unknown> | null = null,
  passphrase: string | null = null,
): IFunctionCall => {
  return new JwtCall(payload, privateKey, options, passphrase);
};
