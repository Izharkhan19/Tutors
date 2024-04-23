const CryptoDecryption = require("../Common/CryptoDecryption");
const generateToken = require("../Common/GenerateJwtToken");
const signupUserModel = require("../models/signup.model");

// const signInUser = async (req, res) => {
//     //Test CASES Keep in mind :
//     // Existing check
//     // decrypt db Hash password
//     // User create step
//     // Token Generate
//     const { email, password } = req.body;

//     try {
//         const existingUser = await signupUserModel.findOne({ email: email });
//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         const decryptPassword = CryptoDecryption(existingUser.password)
//         // console.log("decryptPassword", decryptPassword)
//         // console.log("password", password)

//         if (email !== existingUser.email) {
//             return res.status(400).json({ message: "Invalid credentials." });
//         }
//         if (decryptPassword !== password) {
//             return res.status(400).json({ message: "Invalid credentials." });
//         }

//         const token = generateToken({ email: existingUser.email, id: existingUser._id })

//         res.status(200).json({
//             user: existingUser,
//             token: token,
//             message: "logged in Successfully",
//         });
//     } catch (error) {
//         console.log("Login Err... :", error);
//         res.status(500).json({ message: "Something went wrong." });
//     }
// };

// module.exports = signInUser

exports.create = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await signupUserModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const decryptPassword = CryptoDecryption(existingUser.password)
        // console.log("decryptPassword", decryptPassword)
        // console.log("password", password)

        if (email !== existingUser.email) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        if (decryptPassword !== password) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = generateToken({ email: existingUser.email, id: existingUser._id })

        res.status(200).json({
            user: existingUser,
            token: token,
            message: "logged in Successfully",
        });
    } catch (error) {
        console.log("Login Err... :", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};