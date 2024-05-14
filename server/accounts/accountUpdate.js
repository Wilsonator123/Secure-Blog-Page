const db = require("../database/index.js");
const hash = require("../utils/hash.js");
const validator = require("email-validator");
const { checkPasswordStrength } = require("../utils/password.js");

async function verifyCredentials(userid, password) {
	const currentPassword = (await db.query("getUserPassword", [userid]))[0]
		?.password;
	const salt = (await db.query("getUserSalt", [userid]))[0]?.salt;

	if (!currentPassword || !salt) return false;
	return hash.verifyHash(password, currentPassword, salt);
}

// Update Account
async function updateUserInfo(userid, currentPassword, updates) {
	const user = await db.query("getUser", [userid]);
	if (!user || user.length === 0) {
		return { success: false, message: "User not found" };
	}

	const verified = await verifyCredentials(userid, currentPassword);
	if (!verified) {
		return { success: false, message: "Current password incorrect" };
	}

	for (const [column, value] of Object.entries(updates)) {
		// Email validation
		if (column === "email") {
			if (!validator.validate(value)) {
				return { success: false, message: "Email is not valid" };
			}
			const emailCheck = await db.query("isEmail", [value]);
			if (emailCheck[0].count != 0) {
				return { success: false, message: "Email taken" };
			}
			await db.query("updateUser", [column, value, userid]);
		}

		// Password + hashing
		if (column === "password") {
			// Check password strength
			if ((await checkPasswordStrength(value)) === false) {
				return {
					success: false,
					message: "Password is not strong enough",
				};
			}

			let salt = hash.makeSalt();
			let hashedPassword = hash.saltNhash(value, salt);
			// Table change 'Password'

			await db.query("updatePassword", [column, hashedPassword, userid]);

			// Update salt
			await db.query("updatePassword", ["salt", salt, userid]);
		}

		// General updat
	}

	return { success: true, message: "User updated successfully" };
}

// Bye Account
async function deleteAccount(userid, currentPassword) {
	const verified = await verifyCredentials(userid, currentPassword);
	if (!verified) {
		return { success: false, message: "Current password incorrect" };
	}

	await db.query("deleteUser", [userid]);
	return { success: true, message: "Account deleted successfully" };
}

module.exports = {
	updateUserInfo,
	deleteAccount,
};
