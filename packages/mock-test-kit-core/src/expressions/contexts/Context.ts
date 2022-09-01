export type Context = `${string}.${string}`;

export const create = (context: string, value: string): Context =>
  `${context}.${value}`;
