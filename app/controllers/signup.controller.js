const sendConfirmationEmail = require("../Common/SendEmail.js");
const CryptoJS = require("crypto-js");
const signupUserModel = require("../models/signup.model.js");
const generateOTP = require("../Common/OtpGenerater.js");
const CryptoEncryption = require("../Common/CryptoEncryption.js");

exports.create = async (req, res) => {
  // Validate request

  if (!req.body.firstname) {
    return res.status(400).send({
      message: "firstname can't be empty",
    });
  }
  if (!req.body.lastname) {
    return res.status(400).send({
      message: "lastname can't be empty",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "email can't be empty",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password can't be empty",
    });
  }

  let signedUser = await signupUserModel.find();

  let result = false;
  signedUser.map((itm) => {
    if (itm.email === req.body.email) {
      // console.log(itm.email);
      result = true;
    } else {
      // console.log(itm.email);
      result = false;
    }
  });

  if (result === false) {
    // encrypt password :
    const encryptedPassword = CryptoEncryption(req.body.password)

    // OTP Generation
    const otp = generateOTP();

    // Create a User
    const userReg = new signupUserModel({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      profilePic: req.body.profilePic,
      DOB: req.body.DOB,
      phone: req.body.phone,
      password: encryptedPassword,
      userType: req.body.userType,
      latitude: req.body.latitude || "",
      longitude: req.body.longitude || "",
      isActive: true,
      otp: otp,
      isVerified: false,
    });

    userReg
      .save()
      .then((data) => {
        // Send Email Confirmation for successfull registration.
        sendConfirmationEmail(
          req.body.email,
          "Your OTP",
          `Your OTP is: ${otp}`
        );

        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some thing wrong.",
        });
      });
  } else {
    res.status(409).send({
      message: "This email is already registered.",
    });
  }
};

exports.findAll = (req, res) => {
  signupUserModel.find()
    .then((regUsers) => {
      res.send(regUsers);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  signupUserModel.findById(req.params.regUserId)
    .then((regUser) => {
      if (!regUser) {
        return res.status(404).send({
          message: "Register User Not found" + req.params.regUserId,
        });
      } else {
        res.send(regUser);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with" + req.params.regUserId,
        });
      }

      return res.status(500).send({
        message: "Error retriving user with id " + req.params.regUserId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Register User cant be empty.",
    });
  }
  signupUserModel.findByIdAndUpdate(
    req.params.regUserId,
    {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((reguser) => {
      if (!reguser) {
        return res.status(404).send({
          message: "Register User not found" + req.params.regUserId,
        });
      }
      res.send(reguser);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reguser User Not found" + req.params.regUserId,
        });
      }
      return res.status(500).send({
        message: "Error Updation Reguser user with id :" + req.params.regUserId,
      });
    });
};

exports.delete = (req, res) => {
  signupUserModel.findByIdAndRemove(req.params.regUserId)
    .then((regUser) => {
      if (!regUser) {
        return res.status(404).send({
          message: "User not Found" + req.params.regUserId,
        });
      }
      res.send({
        message: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User Not Found" + res.params.regUserId,
        });
      }
      return res.status(500).send({
        message: "Could nt delete this user with id :" + req.params.regUserId,
      });
    });
};
