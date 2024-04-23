const mongoose = require("mongoose");

const OtpSchema = mongoose.Schema(
    {
        email: String,
        otp: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("OTP", OtpSchema);
