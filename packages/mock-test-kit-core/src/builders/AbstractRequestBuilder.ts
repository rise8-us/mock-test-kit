import {
  IRequestBuilder,
  MockTestKitRestRequest,
  MockTestKitRestRequestAndResponse,
  MockTestKitRestResponse,
  IMatcher,
  HttpMethod,
} from '../types';

export abstract class AbstractRequestBuilder implements IRequestBuilder {
  protected readonly service: string;
  protected readonly path: string;
  protected readonly method: HttpMethod;
  protected readonly request: MockTestKitRestRequest = {};
  protected readonly responses: MockTestKitRestResponse[] = [];

  protected constructor(service: string, path: string, method: HttpMethod) {
    this.service = service;
    this.path = path;
    this.method = method;
  }

  abstract withParam(param: string, matcher: IMatcher): IRequestBuilder;

  abstract withParams(
    params: Record<string, string | number | boolean>,
  ): IRequestBuilder;

  abstract withQueryParam(param: string, matcher: IMatcher): IRequestBuilder;

  abstract withQueryParams(
    query: Record<string, string | number | boolean>,
  ): IRequestBuilder;

  abstract withHeader(header: string, matcher: IMatcher): IRequestBuilder;

  abstract withHeaders(
    headers: Record<string, string | number | boolean>,
  ): IRequestBuilder;

  abstract withBodyParam(param: string, matcher: IMatcher): IRequestBuilder;

  abstract withBodyParams(
    body: Record<string, string | number | boolean>,
  ): IRequestBuilder;

  abstract addResponses(
    ...responses: MockTestKitRestResponse[]
  ): IRequestBuilder;

  abstract build(): MockTestKitRestRequestAndResponse;

  abstract toString(): string;
}
