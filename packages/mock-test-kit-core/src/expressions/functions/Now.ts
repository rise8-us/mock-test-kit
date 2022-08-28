import { FunctionCall } from './Function';
import { IFunctionCall, NowFunctionCallUnit } from './types';

class NowCall extends FunctionCall {
  constructor(num: number, unit: NowFunctionCallUnit) {
    super('now', num, `"${unit}"`);
  }
}

export const callNow = (
  num: number,
  unit: NowFunctionCallUnit,
): IFunctionCall => {
  return new NowCall(num, unit);
};
