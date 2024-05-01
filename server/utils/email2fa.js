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
        issuer: "cryptobros.com",
        label: "CryptoBros",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });
  
    let otpauth_url = totp.toString();


  QRCode.toString(otpauth_url,function(err,url){console.log(url);})

};

faSetup('"4fd676d3-3469-4653-96fc-5c93e029df22"')