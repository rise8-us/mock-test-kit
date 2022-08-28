export type Match = RegExp | string | number | boolean;

export interface IMatcher {
  toString(): string | number | boolean;
}

// export declare class Matcher {
//   constructor(match: Match);
//   toString(): string;
//   static any(): Matcher;
//   static number(): Matcher;
//   static boolean(): Matcher;
//   static hash(): Matcher;
//   static bearerAuthorization(): Matcher;
//   static jwt(): Matcher;
//   static guid(): Matcher;
// }
