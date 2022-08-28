export * from './expressions/types';
export * from './builders/types';

export type MatcherValue = RegExp | string | number | boolean;
export type MatcherString = `${string | number | boolean}`;

export interface IMatcher {
  toString(): MatcherString;
}
