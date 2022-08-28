import { IMatcher, MatcherString, MatcherValue } from './types';

class Matcher implements IMatcher {
  private readonly _matcher: MatcherValue;

  constructor(matcher: MatcherValue) {
    this._matcher = matcher;
  }

  toString(): MatcherString {
    return `${this._matcher}`;
  }
}

export const create = (value: MatcherValue): IMatcher => {
  return new Matcher(value);
};
export const all = (): IMatcher => new Matcher(/.*/);
export const num = (): IMatcher => new Matcher(/\d+/);
export const bool = (): IMatcher => new Matcher(/true|false/);
export const hash = (): IMatcher => new Matcher(/^[a-f0-9]{64}$/);
export const bearerAuthorization = (): IMatcher =>
  new Matcher(/^Bearer [a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/);
export const jwt = (): IMatcher =>
  new Matcher(/^[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/);
export const guid = (): IMatcher =>
  new Matcher(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/);
