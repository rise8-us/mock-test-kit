'use strict';

const fs = require('fs');
const path = require('path');
const mercurius = require('mercurius');
const { setupGraphql } = require('@rise8/mock-test-kit-utils');
const AutoLoad = require('@fastify/autoload');

const { parseJsonContentType } = require('./lib/utils');

module.exports = async function (fastify, opts) {
  await fastify.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    parseJsonContentType,
  );
  fastify.register(require('@fastify/formbody'));
  fastify.register(require('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  fastify.register(require('@fastify/websocket'), {
    // eslint-disable-next-line no-unused-vars
    handle: (conn, req) => {
      conn.pipe(conn); // creates an echo server
    },
    options: {
      maxPayload: 1048576,
    },
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });

  const schemaPath = `/tmp/schema/${process.env.API_NAME}.graphql`;

  if (fs.existsSync(schemaPath)) {
    fastify.register(mercurius, {
      schema: fs.readFileSync(schemaPath, 'utf-8'),
      resolvers: setupGraphql(process.env.API_NAME, '/tmp/mock-data'),
      federationMetadata: true,
    });
  }
};
