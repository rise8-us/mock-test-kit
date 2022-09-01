import { createHeaders } from './Headers';
import { createParams } from './Params';
import { createQueryParams } from './QueryParams';
import { createBodyParams } from './BodyParams';
import type { Context } from '../../types';

export namespace Ctx {
  export const headers: (value: string) => Context = createHeaders;
  export const params: (value: string) => Context = createParams;
  export const queryParams: (value: string) => Context = createQueryParams;
  export const bodyParams: (value: string) => Context = createBodyParams;
}

export { createHeaders } from './Headers';
export { createParams } from './Params';
export { createQueryParams } from './QueryParams';
export { createBodyParams } from './BodyParams';
