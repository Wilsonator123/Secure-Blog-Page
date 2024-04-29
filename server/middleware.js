const { validateCookie } = require('./utils/cookie.js');
const { readJWT } = require('./utils/auth.js');
const db = require('./database/index.js');

const authorize = (requiredPermission=[], cookie=false, userID=null) => {
    return async (req, res, next) => {
        if (requiredPermission.length === 0) {
            return next();
        }

        if (!cookie && !userID) {
            return res.status(403).send('Forbidden');
        }

        let permissions = [];

        if (cookie) {
            const validCookie = await validateCookie(req, res);

            if (validCookie) {
                const payload = await readJWT(req.cookies.id);
                const id = payload.sub
                if (!id) {
                    return res.status(403).send('Forbidden');
                }
                permissions = payload.scopes;
            } else {
                return res.status(403).send('Forbidden');
            }
        } else {
            permissions = db.query('getPermissions', [userID]);
        }

        if (permissions.every(scope => requiredPermission.includes(scope))) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    }
}

module.exports = { authorize };