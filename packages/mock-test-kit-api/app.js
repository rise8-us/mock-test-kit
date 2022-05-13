'use strict'

const fs = require('fs');
const path = require('path');
const mercurius = require('mercurius')
const {setupGraphql} = require('@rise8/mock-test-kit-utils');
const AutoLoad = require('fastify-autoload');

module.exports = async function (fastify, opts) {
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    fastify.register(mercurius, {
        schema: fs.readFileSync(`/tmp/schema/${process.env.API_NAME}.graphql`, 'utf-8'),
        resolvers: setupGraphql(process.env.API_NAME, '/tmp/mock-data'),
        federationMetadata: true
    });
}
