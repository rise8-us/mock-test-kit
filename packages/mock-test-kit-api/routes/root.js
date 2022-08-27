'use strict';

const { setupRest } = require('@rise8/mock-test-kit-utils');

module.exports = async (fastify) =>
  setupRest(process.env.API_NAME, '/tmp/mock-data', fastify);
