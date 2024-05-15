const csrf = require('csrf');
const tokens = new csrf();

function generateCsrfToken(secret) {
  return tokens.create(secret);
}

function validateCsrfToken(secret, token) {
  return tokens.verify(secret, token);
}

module.exports = { generateCsrfToken, validateCsrfToken };