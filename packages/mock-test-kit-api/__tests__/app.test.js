const fs = require('fs');

const handler = require('../app');
const {setupGraphql} = require('@rise8/mock-test-kit-utils');

jest.mock('fs', () => ({
	readFileSync: jest.fn(),
	readdirSync: jest.fn(() => [])
})) ;
jest.mock('fastify-autoload', () => ({
	__esModule: true,
	default: jest.fn()
}));
jest.mock('@rise8/mock-test-kit-utils');

describe('app', () => {
	global.process.env.API_NAME = 'mock-api';

	const fastify = {
		register: jest.fn()
	};
	beforeAll(async () => {
		await handler(fastify, {config: JSON.stringify({})})
	});

	it('should register rest and graphQL', () => {
		expect(fastify.register).toHaveBeenCalledTimes(2);

		expect(fs.readFileSync).toHaveBeenCalledWith('/tmp/schema/mock-api.graphql', 'utf-8')
		expect(setupGraphql).toBeCalledWith('mock-api', '/tmp/mock-data')
	});
});
