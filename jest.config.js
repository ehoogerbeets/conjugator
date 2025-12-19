/** @type {import('jest').Config} */
export default {
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.js'],
    transform: {},
    moduleFileExtensions: ['js', 'mjs', 'json'],
    testPathIgnorePatterns: ['/node_modules/', '/test-e2e/']
};
