const mongoose = require("mongoose");

const SignInUserSchema = mongoose.Schema(
    {
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SignInUser", SignInUserSchema);
