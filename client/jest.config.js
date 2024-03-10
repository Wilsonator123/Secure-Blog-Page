/** @type {import('jest').Config} */

module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/__tests__/**/*.test.js'],
    globals: { URL: "http://localhost:3000" },
    verbose: true,
};
