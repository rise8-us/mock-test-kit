import { Matcher } from '../../Matcher';
import { HttpRedirect } from '../global';

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
