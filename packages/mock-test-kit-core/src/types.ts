import { Matcher } from './Matcher';

export type Match = RegExp | string | number | boolean;

export interface IMatcher {
  toString(): string | number | boolean;
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRedirect = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;
export type HttpClientError =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;
export type HttpServerError =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;
export type HttpError = HttpClientError | HttpServerError;

export type Context = `${string}.${string}`;
export type Expression = `\${{ ${Context | Func} }}`;
export type Func = `${string}(${string})`;

export type MockTestKitRestRequest = {
  headers?: Record<string, Matcher | string | number | boolean>;
  query?: Record<string, Matcher | string | number | boolean>;
  body?: Record<string, Matcher | string | number | boolean>;
  params?: Record<string, Matcher | string | number | boolean>;
};

export type MockTestKitRestResponse = {
  status: number;
  redirect?: string;
  body?: Record<string, unknown>;
};

export type MockTestKitRestRequestAndResponse = {
  service: string;
  path: string;
  method: string;
  request: MockTestKitRestRequest;
  response: MockTestKitRestResponse[];
};

export interface IBuilder {
  build(): unknown;
  toString(): string;
}

export interface IRequestBuilder extends IBuilder {
  build(): MockTestKitRestRequestAndResponse;
  withParam(param: string, matcher: Matcher): IRequestBuilder;
  withParams(
    params: Record<string, string | number | boolean>,
  ): IRequestBuilder;
  withQueryParam(param: string, matcher: Matcher): IRequestBuilder;
  withQueryParams(
    query: Record<string, string | number | boolean>,
  ): IRequestBuilder;
  withHeader(header: string, matcher: Matcher): IRequestBuilder;
  withHeaders(
    headers: Record<string, string | number | boolean>,
  ): IRequestBuilder;
  withBodyParam(param: string, matcher: Matcher): IRequestBuilder;
  withBodyParams(
    body: Record<string, string | number | boolean>,
  ): IRequestBuilder;
  addResponses(...responses: MockTestKitRestResponse[]): IRequestBuilder;
}

export interface IResponseBuilder extends IBuilder {
  build(): MockTestKitRestResponse;
  withStatus(status: number): IResponseBuilder;
  withRedirect(status: HttpRedirect, redirect: string): IResponseBuilder;
  withBodyParam(param: string, value: unknown): IResponseBuilder;
  withBodyParams(body: Record<string, unknown>): IResponseBuilder;
}
