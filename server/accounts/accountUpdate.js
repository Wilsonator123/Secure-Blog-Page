const db = require('../database/index.js');
const hash = require('../utils/hash.js');
const validator = require("email-validator");
const { checkPasswordStrength } = require("../utils/password.js");

async function verifyCredentials(userid, password) {
    const userData = await db.query('getUserPassword', [userid]); 

    if (!userData.length) return false;
    return hash.verifyHash(password, userData[0].password_hash, userData[0].salt);
}

// Update Account
async function updateUserInfo(userid, currentPassword, updates) {
    (console.log(userid, currentPassword, updates));
    const verified = await verifyCredentials(userid, currentPassword);
    if (!verified) {
        return { success: false, message: "Current password incorrect" };
    }


    let table = 'User';  // Default table

    for (const [column, value] of Object.entries(updates)) {
        // Email validation 
        if (column === 'email') {
            if (!validator.validate(value)) {
                return { success: false, message: "Email is not valid" };
            }
            const emailCheck = await db.query("isEmail", [value]);
            if (emailCheck[0].count != 0) {
                return { success: false, message: "Email taken" };
            }
        }

        // Password + hashing
        if (column === 'password') {
            if (!updates.email || !validator.validate(updates.email)) {
                return { success: false, message: "A valid email is required to change the password" };
            }

            // Verify email matches the user's email
            const emailCheck = await db.query("getUserEmail", [userid]);
            if (emailCheck[0].email !== updates.email) {
                return { success: false, message: "Email does not match the account email" };
            }

            // Check password strength
            if ((await checkPasswordStrength(value)) === false) {
                return { success: false, message: "Password is not strong enough" };
            }

            let salt = hash.makeSalt();
            let hashedPassword = hash.saltNhash(value, salt);
            table = 'Password';  // Table change 'Password'

            await db.query('updateUser', [table, column, hashedPassword, userid]);

            // Update salt
            await db.query('updateUser', [table, 'salt', salt, userid]);
            continue;
        }

        // General update
        await db.query('updateUser', [table, column, value, userid]);
    }

    return { success: true, message: "User updated successfully" };
}

// Bye Account
async function deleteAccount(userid, currentPassword) {
    const verified = await verifyCredentials(userid, currentPassword);
    if (!verified) {
        return { success: false, message: "Current password incorrect" };
    }

    await db.query('deleteUser', [userid]);
    return { success: true, message: "Account deleted successfully" };
}

module.exports = {
    updateUserInfo,
    deleteAccount
};