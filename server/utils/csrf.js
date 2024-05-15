const csrf = require("csrf");
const cookieParser = require("cookie-parser");
const { validateCookie } = require("./cookie");
const tokens = new csrf();
const csrfProtection = csrf({ cookie: true });
const tokens = require("csrf");
`// Name of secret cookie`;

function setCsrfToken(req, res, next) {
	let csrfSecret = req.cookies["crsfSecret"];
	if (!csrfSecret) {
		csrfSecret = tokens.secretSync();
		res.cookie(cookieName, csrfSecret);
	}

	// Generate CSRF token
	const csrfToken = token.create(csrfSecret);
	res.setHeader("X-CSRF-Token", csrfToken);
	return res.status(200).send("CSRF Token Generated");
}

function validateCsrfToken(secret, token) {
	return tokens.verify(secret, token);
}

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
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		await new Promise((resolve, reject) => {
			csrfProtection(req, res, (error) => {
				if (error) return reject(error);
				resolve();
			});
		});
		res.setHeader("X-CSRF-Token", req.csrfToken());

		return handler(req, res);
	};
}

module.exports = {
	setCsrfToken,
	withCSRF,
	generateCsrfToken,
	validateCsrfToken,
};
