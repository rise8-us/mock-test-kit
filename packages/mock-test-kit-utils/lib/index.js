'use strict';

const {createResolver, setupGraphql} = require('./setup-graphql-resolvers');
const {createHandler, setupRest} = require('./setup');

module.exports = {
    createHandler,
    createResolver,
    setupGraphql,
    setupRest
};
