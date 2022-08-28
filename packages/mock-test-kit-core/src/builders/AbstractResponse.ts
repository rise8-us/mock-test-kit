import {
  HttpError,
  HttpRedirect,
  IResponseBuilder,
  IMockTestKitRestResponse,
} from './types';

export abstract class AbstractResponse implements IResponseBuilder {
  protected readonly response: IMockTestKitRestResponse = {
    status: 200,
  };

  abstract build(): IMockTestKitRestResponse;

  abstract withRedirect(
    status: HttpRedirect,
    redirect: string,
  ): IResponseBuilder;

  abstract withStatus(status: number): IResponseBuilder;

  abstract withError(status: HttpError, message: string): IResponseBuilder;

  abstract withBodyParam(key: string, value: unknown): IResponseBuilder;

  abstract withBodyParams(body: Record<string, unknown>): IResponseBuilder;
}
