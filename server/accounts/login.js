const db = require('../database/index.js');
const hash = require('../utils/hash.js')
var validator = require("email-validator");

async function login(email,password){
   
     //Checks if the email is valid using regex (library)
     if (validator.validate(email) == false){
        return "Email is not valid"
    }

    //Checks to see if the email has been taken.
    if ((await db.query("isEmail", [email]))[0].count == 0){
        return "Email or Password incorrect"
    } 

    let userID = (await db.query("getUserID",[email]))[0].userid

    //Gets the users salt and hashed password based on the UserID their email gave
    let userSalt = (await db.query("getUserSalt",[userID]))[0].salt
    let userHashedPassword = (await db.query("getUserPassword",[userID]))[0].password

    //Hashes the password Attempt using the stored salt
    let passwordAttempt = hash.saltNhash(password,userSalt);

    //Compares the hash password Attempt with the Stored hashed password.
    if (userHashedPassword != passwordAttempt){
        return "Inccorect Username and Password"
    }

    return "Correct Username and Password"

}

//login("test@tessst.om","nuts123").then((result) => console.log(result)).catch((err) => console.error(err));