const db = require('../database/index.js');
const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');
const crypto = require("crypto");

function generateUniqueCode(length) {
    return (Math.random().toString().slice(2,10)+Math.random().toString().slice(2,10)).slice(4, 4+length);
  }

  console.log(generateUniqueCode(6));