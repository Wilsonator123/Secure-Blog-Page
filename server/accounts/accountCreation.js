const db = require('../database/index.js');
const newUUID = require("../utils/uuid.js");
const hash = require('../utils/hash.js')
var validator = require("email-validator");
const username = require("../utils/username.js");

async function makeUser(email,fname,lname,dob,password){

    // Makes users UUID
    const userID = await newUUID.genUUID()

    //Makes username
    const newUsername = await username.uniqUsername() 


    //Makes the salt and hased password based of the salt generated.
    let salt = hash.makeSalt();
    let hashedPassword = hash.saltNhash(password,salt);
    

    //Checks if the email is valid using regex (library)
    if (validator.validate(email) == false){
        return "Email is not valid"
    }

    //Checks to see if the email has been taken.
    if ((await db.query("isEmail", [email]))[0].count != 0){
        return "Email taken"
    }


    //Runs the query to insert the user and then the password.
    (await db.query('addUser',[userID, newUsername,email,fname,lname,dob]))

    //Checks that the user has been added via their userID, and then inserts in to the Password table
    if ((await(db.query('isUUIDtaken',[userID])))[0].count != 0){
        (await db.query('addPassword',[userID,hashedPassword,salt]))
        return "User Created Successfully"
    }

    return "Error adding User"
   
};

module.exports= {
    makeUser
};

makeUser('nonce@tet.com','first','notfirst',"2022-12-20","nuts123").then((result) => console.log(result)).catch((err) => console.error(err));