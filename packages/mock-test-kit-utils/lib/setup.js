const { isMatch } = require('./request/matcher');
const { readFiles } = require('./utils/file');
const { traverseResponseAndApply } = require('./expressions');

const replyWithResponse = (reply, response) => {
  if (response.status >= 300 && response.status < 400) {
    reply
      .code(response.status)
      .headers(response.headers || {})
      .redirect(response.redirect);
  } else {
    reply
      .code(response.status)
      .headers(response.headers || {})
      .send(response.body);
  }
};

const createHandler = (endpoint, method) => async (request, reply) => {
  const mocks = endpoint[method].data;

  // eslint-disable-next-line no-unused-vars
  const mock = mocks.find(({ request: req, response: res }) => {
    // istanbul ignore next
    let headersMatch = true;
    if (process.env.HEADERS === 'true') {
      headersMatch = isMatch(request.headers || {}, req.headers || {});
    }

    return (
      req &&
      request &&
      headersMatch &&
      isMatch(request.params || {}, req.params || {}) &&
      isMatch(request.query || {}, req.query || {}) &&
      isMatch(request.body || {}, req.body || {})
    );
  });

  if (mock) {
    const response = traverseResponseAndApply(mock.response[0], request);
    mock.response.push(mock.response.shift());

    replyWithResponse(reply, response);
  } else {
    reply
      .code(404)
      .send({ error: 'Not found.', message: 'Not found.', statusCode: 404 });
  }
};

const collectEndpoints = (name, dir) => {
  const endpoints = {};

  readFiles(dir, (filename, content) => {
    JSON.parse(content).forEach(
      ({ service, path, method, request, response }) => {
        if (service === name && path !== '/graphql') {
          if (endpoints[path] && endpoints[path][method]) {
            endpoints[path][method].data.push({ request, response });
          } else {
            endpoints[path] = {
              ...endpoints[path],
              [method]: {
                data: [{ request, response }],
              },
            };
          }
        }
      },
    );
  });

  return endpoints;
};

const generateHandlers = (endpoints, fastify) => {
  Object.keys(endpoints).forEach((path) => {
    const endpoint = endpoints[path];
    const httpMethods = Object.keys(endpoint);

    httpMethods.forEach((method) => {
      fastify[method.toLowerCase()](path, createHandler(endpoint, method));
    });
  });
};

const setupRest = (name, dir, fastify) =>
  generateHandlers(collectEndpoints(name, dir), fastify);

module.exports = {
  createHandler,
  setupRest,
};
