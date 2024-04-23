const CryptoJS = require("crypto-js");
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY

// Function to generate random 6-digit OTP
function CryptoEncryption(data) {

    const encrypted = CryptoJS.AES.encrypt(
        data,
        SECRET_KEY
    ).toString();

    return encrypted
}

module.exports = CryptoEncryption;