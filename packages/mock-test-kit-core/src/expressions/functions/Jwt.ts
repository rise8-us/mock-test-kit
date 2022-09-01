import { create, Func } from './Function';

export const createJwt = (
  payload: Record<string, unknown>,
  privateKey: string,
  options: Record<string, unknown> | null = null,
  passphrase: string | null = null,
): Func =>
  create(
    'jwt',
    JSON.stringify(payload),
    JSON.stringify(privateKey),
    JSON.stringify(options),
    JSON.stringify(passphrase),
  );
