const mercurius = require('mercurius')

const handler = require('../app');

describe('app', () =>  {
	const fastify = {
		register: jest.fn()
	};

	it('should register fastify graphql', async () => {
		await handler(fastify, {config: JSON.stringify({})})

		expect(fastify.register).toHaveBeenCalledTimes(1);
		expect(fastify.register).toHaveBeenCalledWith(mercurius, {});
	});
});