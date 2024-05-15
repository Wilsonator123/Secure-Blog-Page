const db = require("../database/index.js");
const { readJWT } = require("../utils/auth.js");

async function getUser(userID) {
	const payload = await readJWT(userID);
	const id = payload.sub;

	let result = await db.query("getUser", [id]);

	if (result.length === 0) {
		return false;
	} else {
		return result[0];
	}
}

async function getUserByUsername(username) {
	let result = await db.query("getUserByUsername", [username]);

	if (result.length === 0) {
		return false;
	} else {
		return result[0];
	}
}

module.exports = {
	getUser,
	getUserByUsername,
};
