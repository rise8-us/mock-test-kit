import {
  IRequestBuilder,
  IMockTestKitRestRequest,
  IMockTestKitRestRequestAndResponse,
  IMockTestKitRestResponse,
  HttpMethod,
  MockTestKitParamValue,
  MockTestKitRequestRecord,
  MockTestKitRequestNestedRecord,
} from './types';

export abstract class AbstractRequest implements IRequestBuilder {
  protected readonly id: string;
  protected readonly service: string;
  protected readonly path: string;
  protected readonly method: HttpMethod;
  protected readonly request: IMockTestKitRestRequest = {};
  protected readonly responses: IMockTestKitRestResponse[] = [];

  protected constructor(
    id: string,
    service: string,
    path: string,
    method: HttpMethod,
  ) {
    this.id = id;
    this.service = service;
    this.path = path;
    this.method = method;
  }

  abstract withParam(
    param: string,
    value: MockTestKitParamValue,
  ): IRequestBuilder;

  abstract withParams(params: MockTestKitRequestRecord): IRequestBuilder;

  abstract withQueryParam(
    param: string,
    value: MockTestKitParamValue,
  ): IRequestBuilder;

  abstract withQueryParams(query: MockTestKitRequestRecord): IRequestBuilder;

  abstract withHeader(
    header: string,
    value: MockTestKitParamValue,
  ): IRequestBuilder;

  abstract withHeaders(headers: MockTestKitRequestRecord): IRequestBuilder;

  abstract withBodyParams(
    body: MockTestKitRequestNestedRecord,
  ): IRequestBuilder;

  abstract addResponses(
    ...responses: IMockTestKitRestResponse[]
  ): IRequestBuilder;

  abstract build(): IMockTestKitRestRequestAndResponse;

  abstract toString(): string;
}
