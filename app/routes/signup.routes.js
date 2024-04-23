const express = require("express");
const app = express();
const signupUser = require("../controllers/signup.controller.js");

// Create ;
app.post("/signup", signupUser.create);

// Get all Reg. Users ;
app.get("/signuplist", signupUser.findAll);

// Get User by ID ;
app.get("/signupById/:signupId", signupUser.findOne);

// Update by ID:
app.put("/signupUpdateById/:signupId", signupUser.update);

// Delete user By ID
app.delete("/signupDeleteById/:userId", signupUser.delete);

module.exports = app;
