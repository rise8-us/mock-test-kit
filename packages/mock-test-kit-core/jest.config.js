module.exports = {
  coverageDirectory: '/tmp/mock-test-kit-core/coverage',
  collectCoverageFrom: [
    '**/*.{ts}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
