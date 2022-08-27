const mercurius = require('mercurius');
const { readFiles } = require('./utils/file');
const { ErrorWithProps } = mercurius;

const createResolver = (resolvers, type, resolver) => async (_, params) => {
  for (const { request, response } of resolvers[type][resolver]) {
    if (JSON.stringify(params) === JSON.stringify(request.params)) {
      if (response.error) {
        throw new ErrorWithProps(
          response.error.message,
          response.error,
          response.error.statusCode,
        );
      }

      if (Array.isArray(response)) {
        response.push(response.shift());

        return response[response.length - 1].body;
      }

      return response.body;
    }
  }

  throw new ErrorWithProps('Not Found', {}, 404);
};

const collectResolvers = (name, dir) => {
  const resolvers = {};

  readFiles(dir, (filename, content) => {
    JSON.parse(content).forEach(({ api, endpoint, request, response }) => {
      if (api === name && endpoint === '/graphql') {
        if (
          resolvers[request.type] &&
          resolvers[request.type][request.resolver]
        ) {
          resolvers[request.type][request.resolver].push({ request, response });
        } else if (resolvers[request.type]) {
          resolvers[request.type][request.resolver] = [{ request, response }];
        } else {
          resolvers[request.type] = {
            [request.resolver]: [{ request, response }],
          };
        }
      }
    });
  });

  return resolvers;
};

const generateResolvers = (resolvers) => {
  const resolverMap = {};

  Object.keys(resolvers).forEach((type) => {
    resolverMap[type] = {};
    Object.keys(resolvers[type]).forEach((resolver) => {
      resolverMap[type][resolver] = createResolver(resolvers, type, resolver);
    });
  });

  return resolverMap;
};

const setupGraphql = (name, dir) =>
  generateResolvers(collectResolvers(name, dir));

module.exports = {
  setupGraphql,
  createResolver,
};
