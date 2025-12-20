/** @type {import('jest').Config} */
export default {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    transform: {},
    moduleFileExtensions: ['js', 'mjs', 'json'],
    snapshotFormat: {
        escapeString: false,
        printBasicPrototype: false
    }
};
