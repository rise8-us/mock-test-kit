const { isFunction: isJwt, getFunction: getJwt } = require('./jwt');
const { isFunction: isNow, getFunction: getNow } = require('./now');

const isFunction = (expression) => new RegExp(/\w*\(.*\)/).test(expression);

const getFunction = (func) => {
  if (isJwt(func)) {
    return getJwt(func);
  }

  if (isNow(func)) {
    return getNow(func);
  }
};

module.exports = {
  isFunction,
  getFunction,
};
