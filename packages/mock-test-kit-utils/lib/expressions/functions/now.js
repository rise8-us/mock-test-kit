const REGEX = /now\((-?\d+),\s*("ms"|'ms'|"sec"|'sec')\)/;
const UNIT_TIME_CONVERSION = {
  ms: 1,
  sec: 1000,
};

const isFunction = (expression) => new RegExp(REGEX).test(expression);

const getFunction = (func) => {
  if (!isFunction(func)) {
    throw new Error(`The expression ${func} is not a valid now function.`);
  }

  const nowFunc = func.replace(REGEX, '$1,$2');
  const [num, unit] = JSON.parse(`[${nowFunc}]`);

  return (
    (Date.now() / UNIT_TIME_CONVERSION[unit] + parseInt(num)) *
    UNIT_TIME_CONVERSION[unit]
  ).toString();
};

module.exports = {
  isFunction,
  getFunction,
};
