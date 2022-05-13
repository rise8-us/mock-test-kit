'use strict'

const mercurius = require('mercurius')

module.exports = async function (fastify, opts) {
    fastify.register(mercurius, JSON.parse(opts.config));
}
