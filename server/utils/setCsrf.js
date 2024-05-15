const { generateCsrfToken } = require('./genCsrf');
const cookieParser = require('cookie-parser');
const tokens = require('csrf');
const cookieName = 'csrfSecret'; // Name of secret cookie

function setCsrfToken(req, res, next) {
  // Parse cookies
  cookieParser()(req, res, () => {
    // Generate CSRF secret if not present
    let csrfSecret = req.cookies[cookieName];
    if (!csrfSecret) {
      csrfSecret = tokens.secretSync();
      res.cookie(cookieName, csrfSecret);
    }

    // Generate CSRF token
    const csrfToken = generateCsrfToken(csrfSecret);
    res.setHeader('X-CSRF-Token', csrfToken);
    next();
  });
}

module.exports = setCsrfToken;