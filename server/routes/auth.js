const express = require("express");
const router = express.Router();
const { setCookie, validateCookie } = require("../utils/cookie");
const { readJWT } = require("../utils/auth");
const { authorize } = require("../middleware");

router.get("/createID", async (req, res) => {
	await setCookie(res, "Unauthorized").then(() =>
		res.status(200).send("Cookie Created")
	);
});

router.get("/validateID", authorize([]), async (req, res) => {
	const result = await validateCookie(req, res);
	if (result) {
		return res.status(200).send("Authorized");
	} else {
		return res.status(401).send("Unauthorized");
	}
});

router.post("/hasPermission", authorize([]), async (req, res) => {
	if (!req.body.scope) {
		return res.status(400).send("Scope not provided");
	}
	const jwt = req.cookies.id;
	const result = await readJWT(jwt);
	if (!result) {
		return res.status(401).send("Unauthorized");
	} else {
		if (req.body.scope.every((scope) => result.scopes.includes(scope))) {
			return res.status(200).send("Authorized");
		} else {
			return res.status(401).send("Unauthorized");
		}
	}
});

router.get("/logout", (req, res) => {
    res.clearCookie('id'); 
    res.status(200).send("Logged out successfully");
});

module.exports = router;
