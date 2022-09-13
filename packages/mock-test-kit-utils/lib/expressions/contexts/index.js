const { isContext: isHeader, getContext: getHeader } = require('./headers');
const { isContext: isParam, getContext: getParam } = require('./params');
const {
  isContext: isQueryParam,
  getContext: getQueryParam,
} = require('./query');
const { isContext: isBodyParam, getContext: getBodyParam } = require('./body');

const isContext = (expression) => new RegExp(/([^{]*\.[^}]*)/).test(expression);

const getContext = (context, request) => {
  if (isHeader(context)) {
    return getHeader(context.trim(), request);
  }

  if (isParam(context)) {
    return getParam(context.trim(), request);
  }

  if (isQueryParam(context)) {
    return getQueryParam(context.trim(), request);
  }

  if (isBodyParam(context)) {
    return getBodyParam(context.trim(), request);
  }
};

module.exports = {
  isContext,
  getContext,
};
