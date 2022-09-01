import { createJwt } from './Jwt';
import { createNow } from './Now';
import { Func } from '../../types';

export namespace Fn {
  export const jwt: (
    payload: Record<string, unknown>,
    privateKey: string,
    options?: Record<string, unknown> | null,
    passphrase?: string | null,
  ) => Func = createJwt;
  export const now: (num: number, unit: 'sec' | 'ms') => Func = createNow;
}

export { createJwt } from './Jwt';
export { createNow } from './Now';
