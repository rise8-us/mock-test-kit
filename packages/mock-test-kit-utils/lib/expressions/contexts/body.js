const isContext = (expression) => new RegExp('body.w*').test(expression);

const getContext = (context, request) => {
  if (!isContext(context)) {
    throw new Error(
      `The expression ${context} is not a valid body param context.`,
    );
  }

  if (!request.body) {
    throw new Error('Request does not have body');
  }

  const body = request.body[context.split('.')[1]];

  if (!body) {
    throw new Error(`Request does not have body ${context.split('.')[1]}.`);
  }

  return body;
};

module.exports = {
  isContext,
  getContext,
};
