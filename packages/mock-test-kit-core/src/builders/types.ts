import { IMatcher } from '../types';

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

export interface IMockTestKitRequestRecord {
  [property: string]: MockTestKitParamValue | IMockTestKitRequestRecord;
}

export type MockTestKitParamValue = string | number | boolean | IMatcher;

export type MockTestKitRequestRecord = Record<string, MockTestKitParamValue>;

export type MockTestKitRequestNestedRecord = IMockTestKitRequestRecord;

export interface IMockTestKitRestRequest {
  headers?: MockTestKitRequestRecord;
  params?: MockTestKitRequestRecord;
  query?: MockTestKitRequestRecord;
  body?: MockTestKitRequestNestedRecord;
}

export interface IMockTestKitRestResponse {
  status: number;
  redirect?: string;
  body?: Record<string, unknown>;
}

export interface IMockTestKitRestRequestAndResponse {
  id: string;
  service: string;
  path: string;
  method: string;
  request: IMockTestKitRestRequest;
  response: IMockTestKitRestResponse[];
}

export interface IBuilder {
  build(): unknown;

  toString(): string;
}

export interface IRequestBuilder extends IBuilder {
  build(): IMockTestKitRestRequestAndResponse;

  withParam(param: string, value: MockTestKitParamValue): IRequestBuilder;

  withParams(params: MockTestKitRequestRecord): IRequestBuilder;

  withQueryParam(param: string, value: MockTestKitParamValue): IRequestBuilder;

  withQueryParams(query: MockTestKitRequestRecord): IRequestBuilder;

  withHeader(header: string, value: MockTestKitParamValue): IRequestBuilder;

  withHeaders(headers: MockTestKitRequestRecord): IRequestBuilder;

  withBodyParams(body: MockTestKitRequestNestedRecord): IRequestBuilder;

  addResponses(...responses: IMockTestKitRestResponse[]): IRequestBuilder;
}

export interface IResponseBuilder extends IBuilder {
  build(): IMockTestKitRestResponse;

  withStatus(status: number): IResponseBuilder;

  withRedirect(status: HttpRedirect, redirect: string): IResponseBuilder;

  withBodyParam(param: string, value: unknown): IResponseBuilder;

  withBodyParams(body: Record<string, unknown>): IResponseBuilder;
}
