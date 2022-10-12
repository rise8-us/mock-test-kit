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

const matchRequest =
  (actualRequest) =>
  ({ request: mockRequest }) => {
    let headersMatch = true;
    if (process.env.HEADERS === 'true') {
      headersMatch = isMatch(
        actualRequest.headers || {},
        mockRequest.headers || {},
      );
    }

    return (
      mockRequest &&
      actualRequest &&
      headersMatch &&
      isMatch(actualRequest.params || {}, mockRequest.params || {}) &&
      isMatch(actualRequest.query || {}, mockRequest.query || {}) &&
      isMatch(actualRequest.body || {}, mockRequest.body || {})
    );
  };

const createWebsocketHandler = (endpoint, method) => {
  return (connection, request) => {
    connection.setEncoding('utf8');
    const mocks = endpoint[method].data;
    const mock = mocks && mocks.find(matchRequest(request));

    if (mock) {
      const response = traverseResponseAndApply(mock.response[0], request);
      mock.response.push(mock.response.shift());

      const messageHandler = (message) => {
        if (response.messages?.[message.toString()]) {
          const responseMessage = traverseResponseAndApply(
            mock.response[0].messages[message.toString()][0],
            request,
          );
          mock.response[0].messages[message.toString()].push(
            mock.response[0].messages[message.toString()].shift(),
          );

          connection.socket.send(responseMessage);
        }
      };

      connection.socket.on('message', messageHandler);

      if (response.interval) {
        let interval = setInterval(() => {
          connection.socket.send(response.body[0]);
          response.body.push(response.body.shift());
        }, response.interval);
        connection.socket.on('close', () => {
          clearInterval(interval);
        });
      } else {
        connection.socket.send(response.body);
      }
    } else {
      connection.socket.send('No mock found.');
    }
  };
};

const createHandler = (endpoint, method) => {
  const mocks = endpoint[method].data;
  return async (request, reply) => {
    const mock = mocks && mocks.find(matchRequest(request));

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
};

const collectEndpoints = (name, dir) => {
  const endpoints = {};

  readFiles(dir, (filename, content) => {
    JSON.parse(content).forEach(
      ({ service, path, method, request, response, protocol }) => {
        if (service === name && path !== '/graphql') {
          if (endpoints[path] && endpoints[path][method]) {
            endpoints[path][method].data.push({ request, response, protocol });
          } else {
            endpoints[path] = {
              ...endpoints[path],
              [method]: {
                data: [{ request, response, protocol }],
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
      if (method.toLowerCase() === 'get') {
        let rest = endpoint[method].data.filter(
          (d) => !d.protocol || d.protocol === 'http',
        );
        let websockets = endpoint[method].data.filter(
          (d) => d.protocol === 'ws',
        );
        let handler = rest
          ? createHandler(
              { ...endpoint, [method]: { ...endpoint[method], data: rest } },
              method,
            )
          : undefined;
        let wsHandler = websockets
          ? createWebsocketHandler(
              {
                ...endpoint,
                [method]: { ...endpoint[method], data: websockets },
              },
              method,
            )
          : undefined;
        fastify.route({
          method: 'GET',
          url: path,
          handler,
          wsHandler,
        });
      } else {
        fastify[method.toLowerCase()](path, createHandler(endpoint, method));
      }
    });
  });
};

const setupRest = (name, dir, fastify) =>
  generateHandlers(collectEndpoints(name, dir), fastify);

module.exports = {
  createHandler,
  setupRest,
};
