export type Func = `${string}(${string})`;

export const create = (name: string, ...args: unknown[]): Func =>
  `${name}(${args.join(',')})`;
