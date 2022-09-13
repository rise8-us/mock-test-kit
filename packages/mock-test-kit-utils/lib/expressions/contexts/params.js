const isContext = (expression) => new RegExp('params.w*').test(expression);

const getContext = (context, request) => {
  if (!isContext(context)) {
    throw new Error(`The expression ${context} is not a valid param context.`);
  }

  if (!request.params) {
    throw new Error('Request does not have params.');
  }

  const param = request.params[context.split('.')[1]];

  if (!param) {
    throw new Error(`Request does not have param ${context.split('.')[1]}.`);
  }

  return param;
};

module.exports = {
  isContext,
  getContext,
};
