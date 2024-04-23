const generateToken = require("../Common/GenerateJwtToken");
const sendConfirmationEmail = require("../Common/SendEmail");
const signupUserModel = require("../models/signup.model");

// const checkVerificationOTP = async (req, res) => {
//     try {
//         const {
//             email,
//             otp
//         } = req.body;

//         // Get all reg. users :
//         let unVerifiedUsers = await signupUserModel.find();

//         if (!unVerifiedUsers.length) {
//             return res.status(404).json({ message: "No user's found...!" });
//         }
//         const filteredRegUser = unVerifiedUsers.filter((itm) => {
//             return itm.email === email;
//         });

//         if (!filteredRegUser.length) {
//             return res
//                 .status(404)
//                 .json({ statusCode: 404, message: "No register user found...!" });
//         }

//         signupUserModel.findByIdAndUpdate(
//             filteredRegUser[0]._id,
//             {
//                 email: filteredRegUser[0].email,
//                 firstname: filteredRegUser[0].firstname,
//                 lastname: filteredRegUser[0].lastname,
//                 profilePic: filteredRegUser[0].profilePic,
//                 DOB: filteredRegUser[0].DOB,
//                 phone: filteredRegUser[0].phone,
//                 password: filteredRegUser[0].password,
//                 userType: filteredRegUser[0].userType,
//                 otp: filteredRegUser[0].otp,
//                 isVerified: true,
//             },
//             { new: true }
//         )
//             .then((reguser) => {
//                 if (!reguser) {
//                     return res.status(404).send({
//                         message: "Register User not found" + filteredRegUser[0]._id,
//                     });
//                 }
//                 sendConfirmationEmail(
//                     reguser.email,
//                     "Email Varification.",
//                     `Email Varification Successfully.`
//                 );

//                 // encrypt password :
//                 const jwtToken = generateToken({ email: reguser.email, id: reguser._id })

//                 res.status(201).json({
//                     user: reguser,
//                     token: jwtToken,
//                     message: "User verified Successfully",
//                 });

//                 // res.send({ data: reguser, token: jwtToken });
//             })
//             .catch((err) => {
//                 if (err.kind === "ObjectId") {
//                     return res.status(404).send({
//                         message: "Reguser User Not found" + filteredRegUser[0]._id,
//                     });
//                 }
//                 return res.status(500).send({
//                     message: "Error Updation Reguser user with id :" + filteredRegUser[0]._id,
//                 });
//             });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong." });
//     }
// };

// module.exports = checkVerificationOTP;

exports.create = async (req, res) => {
    try {
        const {
            email,
            otp
        } = req.body;

        // Get all reg. users :
        let unVerifiedUsers = await signupUserModel.find();

        if (!unVerifiedUsers.length) {
            return res.status(404).json({ message: "No user's found...!" });
        }
        const filteredRegUser = unVerifiedUsers.filter((itm) => {
            return itm.email === email;
        });

        if (!filteredRegUser.length) {
            return res
                .status(404)
                .json({ statusCode: 404, message: "No register user found...!" });
        }

        signupUserModel.findByIdAndUpdate(
            filteredRegUser[0]._id,
            {
                email: filteredRegUser[0].email,
                firstname: filteredRegUser[0].firstname,
                lastname: filteredRegUser[0].lastname,
                profilePic: filteredRegUser[0].profilePic,
                DOB: filteredRegUser[0].DOB,
                phone: filteredRegUser[0].phone,
                password: filteredRegUser[0].password,
                userType: filteredRegUser[0].userType,
                otp: filteredRegUser[0].otp,
                isVerified: true,
            },
            { new: true }
        )
            .then((reguser) => {
                if (!reguser) {
                    return res.status(404).send({
                        message: "Register User not found" + filteredRegUser[0]._id,
                    });
                }
                sendConfirmationEmail(
                    reguser.email,
                    "Email Varification.",
                    `Email Varification Successfully.`
                );

                // encrypt password :
                const jwtToken = generateToken({ email: reguser.email, id: reguser._id })

                res.status(201).json({
                    user: reguser,
                    token: jwtToken,
                    message: "User verified Successfully",
                });

                // res.send({ data: reguser, token: jwtToken });
            })
            .catch((err) => {
                if (err.kind === "ObjectId") {
                    return res.status(404).send({
                        message: "Reguser User Not found" + filteredRegUser[0]._id,
                    });
                }
                return res.status(500).send({
                    message: "Error Updation Reguser user with id :" + filteredRegUser[0]._id,
                });
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
};