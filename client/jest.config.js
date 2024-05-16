/** @type {import('jest').Config} */

module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/__tests__/**/*.test.js'],
    globals: { URL: "http://127.0.0.1:3000" },
    verbose: true,
};
