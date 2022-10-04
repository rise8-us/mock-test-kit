const { isContext, getContext } = require('./contexts');
const { isFunction, getFunction } = require('./functions');

const INNER_REGEX = /\${{([^${}]*)}}/g;
const OUTER_REGEX = /\${{(.*)}}/g;

const apply = (value, request) => {
  let newValue = value;
  let regex = INNER_REGEX;
  let expressions = newValue.match(regex);

  if (!expressions) {
    regex = OUTER_REGEX;
    expressions = newValue.match(regex);
    if (!expressions) {
      return newValue;
    }
  }

  expressions.forEach((expression) => {
    let expr = expression.replace(regex, '$1');

    if (isFunction(expr)) {
      const func = getFunction(expr);
      const newerValue = newValue.replace(expression, func);
      newValue = newerValue;
    }

    if (isContext(expr)) {
      newValue = newValue.replace(expression, getContext(expr, request));
    }
  });

  return apply(newValue, request);
};

const traverseResponseAndApply = (response, request) => {
  const newResponse = JSON.parse(JSON.stringify(response));
  if (typeof newResponse === 'string') {
    return apply(newResponse, request);
  }

  for (const key of Object.keys(newResponse)) {
    if (!newResponse[key]) continue;

    if (typeof newResponse[key] === 'object') {
      newResponse[key] = traverseResponseAndApply(newResponse[key], request);
    }

    if (typeof newResponse[key] === 'string') {
      newResponse[key] = apply(newResponse[key], request);
    }
  }

  return newResponse;
};

module.exports = {
  apply,
  traverseResponseAndApply,
};
