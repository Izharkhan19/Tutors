const express = require("express");
const app = express();
const checkVerificationOTP = require("../controllers/verifyOTP.controller");
const signInUser = require("../controllers/signin.controller");

// module.exports = (app) => {

app.use("/api", require("./signup.routes"));
app.use("/api", require("./signin.routes"));
app.use("/api", require("./otp.routes"));
// app.use("/api", );
// };

module.exports = app;

