const db = require('../database/index.js');
const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');
const crypto = require("crypto");




const generateBase32Secret = () => {
    const buffer = crypto.randomBytes(15);
    const base32 = encode.encode(buffer).replace(/=/g, "").substring(0, 24);
    return base32;
  };


async function faSetup(userID){
    const base32_secret = generateBase32Secret();  //store in database
  
   (await db.query('addUser2FA',[base32_secret,userID]))
   let username =  (await db.query('getUsername',[userID]))[0].username


    // Generate a QR code URL for the user to scan
    let totp = new OTPAuth.TOTP({
        issuer: "CryptoBros",
        label: username,
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });
  
    let otpauth_url = totp.toString();


 // QRCode.toString(otpauth_url,function(err,url){console.log(url);}) //this line is what prints to terminal. will need to edit it for requests
 


let qr_data = {
  "OTP_SECRET": base32_secret,
  "QR": (await QRCode.toDataURL(otpauth_url))
}

console.log(qr_data);
return data  //This returns the secret and the url for the QR code

};


// Checks 2FA token 
async function faChecker(userID,token){

  //checks that the userID is valid
  if ((await(db.query('isUUIDtaken',[userID])))[0].count == 0){
    return "UserID no valid"  //edit this error response
}

//Gets the user secret from database
let usertoken = (await db.query('getUser2FAsalt',[userID]))[0].fasalt

//Recreates the OTP Auth to allow us to recreate that users token
  let totp = new OTPAuth.TOTP({
    issuer: "CryptoBros",
    label: "User",
    algorithm: "SHA1",
    digits: 6,
      secret: usertoken,
   });

   let currentToken = totp.generate() //Test to see what it thinks the current token is


  let delta = totp.validate({token, window: 1});

 //Compares the users given token to the current and then 1 delta back
  if(currentToken == token){

    return true
  }else{
    if(delta){

      return true
    }else{

      return false
    }
  }

}

//Added flag in db for 2fa validation checker and flip if this function passes and if not left 2fasetup be rerun
async function firstFAsetup(userID, token){
  if ((await faChecker(userID,token))){
    (await db.query('update2FAstatus',[userID]))
   
    return true;
  }else{
    return false;
  }
}
//faSetup('435df2f4-95fd-4532-95cc-8576224b7fc7')

//faChecker('435df2f4-95fd-4532-95cc-8576224b7fc7','399142')
//firstFAsetup('435df2f4-95fd-4532-95cc-8576224b7fc7','758112')

