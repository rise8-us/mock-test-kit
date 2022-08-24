module.exports = {
	"coverageDirectory": "/tmp/mock-test-kit-gateway/coverage",
	'collectCoverageFrom': [
		'app.{js,jsx}',
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/coverage/**',
		'!jest.config.js'
	]
};
