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
   //console.log(base32_secret);

    // Generate a QR code URL for the user to scan
    let totp = new OTPAuth.TOTP({
        issuer: "CryptoBros",
        label: username,
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });
  
    let otpauth_url = totp.toString();


  QRCode.toString(otpauth_url,function(err,url){console.log(url);})
  // QRCode.toDataURL //This version with some changes is needed to send it to the front end

};


// Checks 2FA token 
async function faChecker(userID,token){

  //checks that the userID is valid
  if ((await(db.query('isUUIDtaken',[userID])))[0].count == 0){
    return "UserID no valid"  //edit this error response
}

//Gets the user secret from database
let usertoken = (await db.query('getUser2FAsalt',[userID]))[0].fasalt
//console.log(usertoken);

//Recreates the OTP Auth to allow us to recreate that users token
  let totp = new OTPAuth.TOTP({
    issuer: "CryptoBros",
    label: "User",
    algorithm: "SHA1",
    digits: 6,
      secret: usertoken,
   });

   let currentToken = totp.generate() //Test to see what it thinks the current token is
   console.log('Current:',currentToken);
   console.log('Input:',token);

  let delta = totp.validate({token, window: 1});
  console.log(delta);

  if(currentToken == token){
    console.log('Valid 0');
    return true
  }else{
    if(delta){
      console.log('Valid 1');
      return true
    }else{
      console.log('False');
      return false
    }
  }

}

//Added flag in db for 2fa validation checker and flip if this function passes and if not left 2fasetup be rerun
async function firstFAsetup(userID, token){
  if ((await faChecker(userID,token))){
    (await db.query('update2FAstatus',[userID]))
    console.log('all good');
    return true;
  }else{
    return false;
  }
}
faSetup('435df2f4-95fd-4532-95cc-8576224b7fc7')

//faChecker('da1765fa-6a5a-4e07-b136-04aa789db69f','201093')
//firstFAsetup('aa36efe2-e328-4c8f-94a5-166546238750','920571')

