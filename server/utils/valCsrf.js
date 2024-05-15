const { validateCsrfToken } = require('../utils/genCsrf');
const cookieParser = require('cookie-parser');
const cookieName = 'csrfSecret'; // Name for the CSRF secret cookie

function validateCsrf(req, res, next) {
  cookieParser()(req, res, () => {
    const csrfSecret = req.cookies[cookieName];
    const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;

    if (!csrfSecret || !csrfToken || !validateCsrfToken(csrfSecret, csrfToken)) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }

    next();
  });
}

module.exports = validateCsrf;