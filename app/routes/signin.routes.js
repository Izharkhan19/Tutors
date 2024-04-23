const express = require("express");
const signInUser = require("../controllers/signin.controller.js");
const app = express();

// Sign In user ;
app.post("/signin", signInUser.create);

module.exports = app;
