const isContext = (expression) => new RegExp('headers.w*').test(expression);

const getContext = (context, request) => {
  if (!isContext(context)) {
    throw new Error(`The expression ${context} is not a valid header context.`);
  }

  if (!request.headers) {
    throw new Error('Request does not have headers.');
  }

  const header = request.header[context.split('.')[1]];

  if (!header) {
    throw new Error(`Request does not have header ${context.split('.')[1]}.`);
  }

  return header;
};

module.exports = {
  isContext,
  getContext,
};
