const {
  createHandler,
  createResolver,
  setupGraphql,
  setupRest,
} = require('../lib/index');

const {
  createResolver: createResolverUtil,
  setupGraphql: setupGraphqlUtil,
} = require('../lib/setup-graphql-resolvers');
const {
  createHandler: createHandlerUtil,
  setupRest: setupRestUtil,
} = require('../lib/setup');

jest.mock('../lib/setup-graphql-resolvers');
jest.mock('../lib/setup');

describe('index.js', () => {
  it('should call createHandler', () => {
    createHandler();

    expect(createHandlerUtil).toHaveBeenCalledTimes(1);
  });

  it('should call createResolver', () => {
    createResolver();

    expect(createResolverUtil).toHaveBeenCalledTimes(1);
  });

  it('should call setupGraphql', () => {
    setupGraphql();

    expect(setupGraphqlUtil).toHaveBeenCalledTimes(1);
  });

  it('should call setupRest', () => {
    setupRest();

    expect(setupRestUtil).toHaveBeenCalledTimes(1);
  });
});
