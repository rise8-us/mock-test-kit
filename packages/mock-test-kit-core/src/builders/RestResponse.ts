import { NoResetProperty } from '../decorators/Property';
import { AbstractResponse } from './AbstractResponse';
import { HttpError, HttpRedirect, IMockTestKitRestResponse } from './types';

export class RestResponse extends AbstractResponse {
  build(): IMockTestKitRestResponse {
    if (this.response.status > 399 && !this.response.body?.message) {
      throw new Error(
        'Must include a message in the body for error responses.',
      );
    }

    return this.response;
  }

  withRedirect(status: HttpRedirect, redirect: string): RestResponse {
    if (status < 300 || status > 399) {
      throw new Error('withRedirect only supports status codes 300 - 308.');
    }

    this.response.status = status;
    this.response.redirect = redirect;
    return this;
  }

  @NoResetProperty('response.redirect')
  withStatus(status: number): RestResponse {
    if (status > 299 && status < 400) {
      throw new Error('Use withRedirect for status codes 300 - 308.');
    }

    this.response.status = status;

    return this;
  }

  withError(status: HttpError, message: string): RestResponse {
    this.response.status = status;
    this.response.body = {
      message,
    };
    return this;
  }

  withBodyParam(key: string, value: unknown): RestResponse {
    if (this.response.body?.[key]) {
      throw new Error(`Body param ${key} already exists.`);
    }

    this.response.body = {
      ...this.response.body,
      [key]: value,
    };
    return this;
  }

  @NoResetProperty('response.body')
  withBodyParams(body: Record<string, unknown>): RestResponse {
    this.response.body = body;
    return this;
  }
}
