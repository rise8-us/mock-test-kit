import { Context } from './contexts';
import { Func } from './functions';

export { Context, Func };
export type Expression = `\${{ ${Context | Func} }}`;
