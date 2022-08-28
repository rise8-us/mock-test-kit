import { IResponseBuilder, MockTestKitRestResponse } from '../types/builders';
import { HttpError, HttpRedirect } from '../types/global';

export abstract class AbstractResponseBuilder implements IResponseBuilder {
  protected readonly response: MockTestKitRestResponse = {
    status: 200,
  };

  abstract build(): MockTestKitRestResponse;

  abstract withRedirect(
    status: HttpRedirect,
    redirect: string,
  ): IResponseBuilder;

  abstract withStatus(status: number): IResponseBuilder;

  abstract withError(status: HttpError, message: string): IResponseBuilder;

  abstract withBodyParam(key: string, value: unknown): IResponseBuilder;

  abstract withBodyParams(body: Record<string, unknown>): IResponseBuilder;
}
