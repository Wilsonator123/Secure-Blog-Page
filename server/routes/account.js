const express = require("express");
const router = express.Router();
const account = require("../accounts/account.js");
const { cookie, validationResult } = require("express-validator");
const { setCookie, validateCookie } = require("../utils/cookie.js");

router.get("/", (req, res) => {
	res.send({ data: "Account route" });
});

router.post(
	"/getUser",
	cookie("id").custom((value, { req }) => {
		const cookie = req.cookies.id;
		if (!cookie) {
			throw new Error("Cookie 'id' not found");
		}
		return true;
	}),

	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array().map((error) => {
						return error.msg;
					}),
				});
			}

			const id = await validateCookie(req, res);

			if (id) {
				const result = await account.getUser(req.cookies.id);
				if (result) {
					res.status(200).json({ data: result });
				} else {
					res.status(401).json({ errors: "User not found" });
				}
			} else {
				res.status(401).json({ errors: "Unauthorized" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ errors: "Internal Server Error" });
		}
	}
);

module.exports = router;
