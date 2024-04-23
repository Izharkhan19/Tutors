const mongoose = require("mongoose");

const SignUpUserSchema = mongoose.Schema(
  {
    email: String,
    firstname: String,
    lastname: String,
    profilePic: String,
    DOB: { type: Date },
    phone: String,
    password: String,
    userType: String,
    latitude: String,
    longitude: String,
    isActive: Boolean,
    otp: String,
    isVerified: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SignUpUser", SignUpUserSchema);
