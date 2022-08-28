import { AbstractRequestBuilder } from './AbstractRequestBuilder';
import { Matcher } from '../Matcher';
import { NoResetProperty } from '../decorators/Property';
import { HttpMethod, IMatcher, MockTestKitRestResponse } from '../types';

export class RestRequestBuilder extends AbstractRequestBuilder {
  constructor(service: string, path: string, method: HttpMethod) {
    super(service, path, method);
  }

  build() {
    return {
      service: this.service,
      path: this.path,
      method: this.method,
      request: this.request,
      response: this.responses,
    };
  }

  toString() {
    return 'Not implemented yet dummy.';
  }

  withParam(param: string, matcher: IMatcher) {
    if (this.request.params?.[param]) {
      throw new Error(`Param ${param} already exists.`);
    }

    this.request.params = {
      ...this.request.params,
      [param]: matcher.toString(),
    };
    return this;
  }

  @NoResetProperty('request.params')
  withParams(
    params: Record<string, string | number | boolean>,
  ): RestRequestBuilder {
    this.request.params = params;
    return this;
  }

  withQueryParam(param: string, matcher: Matcher): RestRequestBuilder {
    if (this.request.query?.[param]) {
      throw new Error(`Query param ${param} already exists.`);
    }

    this.request.query = {
      ...this.request.query,
      [param]: matcher.toString(),
    };
    return this;
  }

  @NoResetProperty('request.query')
  withQueryParams(
    query: Record<string, string | number | boolean>,
  ): RestRequestBuilder {
    this.request.query = query;
    return this;
  }

  withHeader(header: string, matcher: Matcher): RestRequestBuilder {
    if (this.request.headers?.[header]) {
      throw new Error(`Header ${header} already exists.`);
    }

    this.request.headers = {
      ...this.request.headers,
      [header]: matcher.toString(),
    };
    return this;
  }

  @NoResetProperty('request.headers')
  withHeaders(
    headers: Record<string, string | number | boolean>,
  ): RestRequestBuilder {
    this.request.headers = headers;
    return this;
  }

  withBodyParam(param: string, matcher: Matcher): RestRequestBuilder {
    if (this.request.body?.[param]) {
      throw new Error(`Body param ${param} already exists.`);
    }

    this.request.body = {
      ...this.request.body,
      [param]: matcher.toString(),
    };
    return this;
  }

  @NoResetProperty('request.body')
  withBodyParams(
    body: Record<string, string | number | boolean>,
  ): RestRequestBuilder {
    this.request.body = body;
    return this;
  }

  addResponses(...responses: MockTestKitRestResponse[]): RestRequestBuilder {
    this.responses.push(...responses);
    return this;
  }
}
