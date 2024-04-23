
const jwt = require("jsonwebtoken");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(dataToBePass) {
    const token = jwt.sign(
        dataToBePass,
        JWT_SECRET
    );
    return token
}

module.exports = generateToken;


