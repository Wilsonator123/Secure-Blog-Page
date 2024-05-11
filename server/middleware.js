const { validateCookie } = require("./utils/cookie.js");
const { readJWT } = require("./utils/auth.js");
const db = require("./database/index.js");

const authorize = (requiredPermission = []) => {
	return async (req, res, next) => {
		const validCookie = await validateCookie(req, res);

		if (requiredPermission.length === 0) {
			return next();
		}

		let permissions = [];

		if (validCookie) {
			const payload = await readJWT(req.cookies.id);
			const id = payload.sub;
			if (!id) {
				return res.status(403).send("Forbidden");
			}
			permissions = payload.scopes;
		} else {
			return res.status(403).send("Forbidden");
		}

		if (requiredPermission.every((scope) => permissions.includes(scope))) {
			return next();
		} else {
			return res.status(403).send("Forbidden");
		}
	};
};

module.exports = { authorize };
