'use strict'

const handler = require('../../routes/root');
const {setupRest} = require('@rise8/mock-test-kit-utils');

jest.mock('@rise8/mock-test-kit-utils');

describe('Mock API', () => {
    global.process.env.API_NAME = 'mock-api';

    it('should call using /tmp/mock-data', async () => {
        const fastify = {};

        await handler(fastify);

        expect(setupRest).toHaveBeenCalledWith('mock-api', '/tmp/mock-data', fastify);
    });
});

