const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { validateCookie } = require('@/utils/cookie'); 

const csrfProtection = csrf({ cookie: true });

function withCSRF(handler) {
  return async (req, res) => {
    await new Promise((resolve, reject) => {
      cookieParser()(req, res, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    const isValid = await validateCookie(req, res);
    if (!isValid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await new Promise((resolve, reject) => {
      csrfProtection(req, res, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });
    res.setHeader('X-CSRF-Token', req.csrfToken());

    return handler(req, res);
  };
}

module.exports = withCSRF;