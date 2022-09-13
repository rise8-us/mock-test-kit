const isContext = (expression) => new RegExp('query.w*').test(expression);

const getContext = (context, request) => {
  if (!isContext(context)) {
    throw new Error(
      `The expression ${context} is not a valid query param context.`,
    );
  }

  if (!request.query) {
    throw new Error('Request does not have query params.');
  }

  const queryParam = request.query[context.split('.')[1]];

  if (!queryParam) {
    throw new Error(
      `Request does not have query param ${context.split('.')[1]}.`,
    );
  }

  return queryParam;
};

module.exports = {
  isContext,
  getContext,
};
