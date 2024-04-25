const passport = require('./passport-config');
const db = require('./database/index.js');
const authenticate = passport.authenticate('jwt', { session: false });

const authorize = (requirePermission) => {
    return (req, res, next) => {
        const id = req.id?.userId;
        if (!id) {
            res.status(401).send('Unauthorized');
        }
        const permissions = db.query('getPermissions', [id]);
        if (permissions.includes(requirePermission)) {
            next();
        }
        else {
            res.status(403).send('Forbidden');
        }
    }
}

module.exports = { authenticate, authorize };