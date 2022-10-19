const REGEX = /base64Encode\((.*\n*)\)/;

const isFunction = (expression) => new RegExp(REGEX).test(expression);

const getFunction = (func) => {
  if (!isFunction(func)) {
    throw new Error(
      `The expression ${func} is not a valid base64Encode function.`,
    );
  }

  const stringToEncode = func.replace(REGEX, '$1');

  return Buffer.from(stringToEncode).toString('base64');
};

module.exports = {
  isFunction,
  getFunction,
};
