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
   console.log(base32_secret);

    // Generate a QR code URL for the user to scan
    let totp = new OTPAuth.TOTP({
        issuer: "CryptoBros",
        label: "User",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });
  
    let otpauth_url = totp.toString();


  QRCode.toString(otpauth_url,function(err,url){console.log(url);})
  // QRCode.toDataURL //This version with some changes is needed to send it to the front end

};


// Checks 2FA 


async function faChecker(userID,token){

let usertoken = (await db.query('getUser2FAsalt',[userID]))[0].fasalt
console.log(usertoken);
  let totp = new OTPAuth.TOTP({
    issuer: "CryptoBros",
    label: "User",
    algorithm: "SHA1",
    digits: 6,
      secret: usertoken,
   });

   let currentToken = totp.generate() //Test to see what it thinks the current token is
   console.log(currentToken);
   console.log(token);

  let delta = totp.validate({token, window: 1});
  console.log(delta);

  if(currentToken == token){
    console.log('Valid 1');
    return true
  }else{
    if(delta){
      console.log('Valid 2');
      return true
    }else{
      console.log('False 3');
      return false
    }
  }

}
//faSetup('6b0a8513-3207-474b-a759-af5ab069d792')

//faChecker('6b0a8513-3207-474b-a759-af5ab069d792','137320')