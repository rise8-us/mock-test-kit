const fs = require('fs');
const path = require('path')

const {isMatch} = require('./services/matching');
const {substituteResponse} = require('./services/substitutions');
const {readFiles} = require('./utils/file');

const replyWithResponse = (reply, response) => {
  if (response.status >= 300 && response.status < 400) {
    reply.code(response.status).headers(response.headers || {}).redirect(response.redirect);
  } else {
    reply.code(response.status).headers(response.headers || {}).send(response.body);
  }
}

const createHandler = (endpoint, method) => async (request, reply) => {
  const mocks = endpoint[method].data;

  const mock = mocks.find(({request: req, response: res}) => {
    // istanbul ignore next
    return req && request && isMatch(request.query || {}, req.query || {}) &&
        isMatch(request.params || {}, req.params || {}) && isMatch(
            request.body || {}, req.body || {});
  });

  if (mock) {
    let response;

    if (Array.isArray(mock.response) && mock.response.length > 0) {
      response = substituteResponse(mock.response[0], request);
      mock.response.push(mock.response.shift());
    } else {
      response = substituteResponse(mock.response, request);
    }

    replyWithResponse(reply, response);
  } else {
    reply.code(404).send(
        {error: 'Not found.', message: 'Not found.', statusCode: 404});
  }
}

const collectEndpoints = (name, dir) => {
  const endpoints = {};

  readFiles(dir, (filename, content) => {
    JSON.parse(content).forEach(
        ({api, endpoint, httpMethod, request, response}) => {
          if (api === name && endpoint !== '/graphql') {
            if (endpoints[endpoint] && endpoints[endpoint][httpMethod]) {
              endpoints[endpoint][httpMethod].data.push({request, response});
            } else {
              endpoints[endpoint] = {
                ...endpoints[endpoint],
                [httpMethod]: {
                  data: [{request, response}],
                },
              }
            }
          }
        });
  });

  return endpoints;
}

const generateHandlers = (endpoints, fastify) => {
  Object.keys(endpoints).forEach((path) => {
    const endpoint = endpoints[path];
    const httpMethods = Object.keys(endpoint);

    httpMethods.forEach((method) => {
      fastify[method.toLowerCase()](path, createHandler(endpoint, method));
    });
  });
}

const setupRest = (name, dir, fastify) => generateHandlers(
    collectEndpoints(name, dir), fastify);

module.exports = {
  createHandler,
  setupRest,
};
