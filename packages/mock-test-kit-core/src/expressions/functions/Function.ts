import type { Func } from '../../types';

export const create = (name: string, ...args: unknown[]): Func =>
  `${name}(${args.join(',')})`;
