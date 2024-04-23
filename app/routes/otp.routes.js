const express = require("express");
const checkVerificationOTP = require("../controllers/verifyOTP.controller.js");
const app = express();

// Verify OTP :
app.post("/verifyWithOtp", checkVerificationOTP.create);

module.exports = app;
