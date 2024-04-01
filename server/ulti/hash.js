require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");

//Generates a random salt and returns it.
function makeSalt() {
  return crypto.randomBytes(64).toString("hex");
}

//Hashes the Password with the salt using SHA256. Hashing it 600,000 times. Returning a string. 
function saltNhash(password, salt) {
    //Meat is the PEPPER combined with the Password to be hashed
    const meat = process.env.PEPPER + password;
  return crypto.pbkdf2Sync(meat, salt, 600000, 64, "SHA256").toString("hex");
}

module.exports = { makeSalt, saltNhash };
