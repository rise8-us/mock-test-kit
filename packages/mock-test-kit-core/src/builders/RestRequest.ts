import { AbstractRequest } from './AbstractRequest';
import {
  HttpMethod,
  IMockTestKitRestResponse,
  MockTestKitParamValue,
  MockTestKitRequestNestedRecord,
  MockTestKitRequestRecord,
} from './types';
import { NoResetProperty } from '../decorators/Property';
import { IMatcher } from '../types';
import { isMatcher, toStringNestedMatchers } from '../utils';

export class RestRequest extends AbstractRequest {
  constructor(id: string, service: string, path: string, method: HttpMethod) {
    super(id, service, path, method);
  }

  build() {
    return {
      id: this.id,
      service: this.service,
      path: this.path,
      method: this.method,
      request: this.request,
      response: this.responses,
    };
  }

  toString() {
    return JSON.stringify(this.build());
  }

  withParam(param: string, value: MockTestKitParamValue) {
    if (this.request.params?.[param]) {
      throw new Error(`Param ${param} already exists.`);
    }

    this.request.params = {
      ...this.request.params,
      [param]: isMatcher(value) ? value.toString() : value,
    };
    return this;
  }

  @NoResetProperty('request.params')
  withParams(params: MockTestKitRequestRecord): RestRequest {
    this.request.params = toStringNestedMatchers(
      params,
    ) as MockTestKitRequestRecord;
    return this;
  }

  withQueryParam(param: string, value: MockTestKitParamValue): RestRequest {
    if (this.request.query?.[param]) {
      throw new Error(`Query param ${param} already exists.`);
    }

    this.request.query = {
      ...this.request.query,
      [param]: isMatcher(value) ? value.toString() : value,
    };
    return this;
  }

  @NoResetProperty('request.query')
  withQueryParams(query: MockTestKitRequestRecord): RestRequest {
    this.request.query = toStringNestedMatchers(
      query,
    ) as MockTestKitRequestRecord;
    return this;
  }

  withHeader(header: string, value: MockTestKitParamValue): RestRequest {
    if (this.request.headers?.[header]) {
      throw new Error(`Header ${header} already exists.`);
    }

    this.request.headers = {
      ...this.request.headers,
      [header]: isMatcher(value) ? value.toString() : value,
    };
    return this;
  }

  @NoResetProperty('request.headers')
  withHeaders(headers: MockTestKitRequestRecord): RestRequest {
    this.request.headers = toStringNestedMatchers(
      headers,
    ) as MockTestKitRequestRecord;
    return this;
  }

  @NoResetProperty('request.body')
  withBodyParams(body: MockTestKitRequestNestedRecord): RestRequest {
    this.request.body = toStringNestedMatchers(
      body,
    ) as MockTestKitRequestNestedRecord;
    return this;
  }

  addResponses(...responses: IMockTestKitRestResponse[]): RestRequest {
    this.responses.push(...responses);
    return this;
  }
}
