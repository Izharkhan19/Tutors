const CryptoJS = require("crypto-js");
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY

// Function to decrypt the encrypted data
function CryptoDecryption(encryptedData) {
    try {
        const bytes = CryptoJS.AES.decrypt(
            encryptedData,
            SECRET_KEY
        );
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (error) {
        console.error("Error decrypting data:", error);
        throw error;
    }
}

module.exports = CryptoDecryption;
