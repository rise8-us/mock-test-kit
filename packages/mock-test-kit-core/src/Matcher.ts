import type { Match, IMatcher } from './types';

export class Matcher implements IMatcher {
  private readonly value: Match;

  constructor(value: Match) {
    this.value = value;
  }

  toString(): string | number | boolean {
    return `${this.value}`;
  }

  static any = (): Matcher => new Matcher(/.*/);
  static number = (): Matcher => new Matcher(/\d+/);
  static boolean = (): Matcher => new Matcher(/true|false/);
  static hash = (): Matcher => new Matcher(/^[a-f0-9]{64}$/);
  static bearerAuthorization = (): Matcher =>
    new Matcher(
      /^Bearer [a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/,
    );
  static jwt = (): Matcher =>
    new Matcher(/^[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.?[a-zA-Z0-9-_.+/=]*$/);
  static guid = (): Matcher =>
    new Matcher(
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    );
}
