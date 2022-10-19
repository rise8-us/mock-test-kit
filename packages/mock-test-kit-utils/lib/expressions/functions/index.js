const { isFunction: isJwt, getFunction: getJwt } = require('./jwt');
const { isFunction: isNow, getFunction: getNow } = require('./now');
const {
  isFunction: isBase64Encode,
  getFunction: getBase64Encode,
} = require('./base64Encode');

const isFunction = (expression) => new RegExp(/\w*\(.*\)/).test(expression);

const getFunction = (func) => {
  if (isJwt(func)) {
    return getJwt(func);
  }

  if (isNow(func)) {
    return getNow(func);
  }

  if (isBase64Encode(func)) {
    return getBase64Encode(func);
  }
};

module.exports = {
  isFunction,
  getFunction,
};
