const nodemailer = require("nodemailer");

// Function to send registration confirmation email
function sendConfirmationEmail(email, subject, text) {
  // Must To On Less Secure :
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "izhar.khan@softqubes.com",
      pass: "SQT12345@",
    },
  });
  let mailOptions = {};

  mailOptions = {
    from: "izhar.khan@softqubes.com",
    to: email,
    subject: subject,
    text: text,
    // text: `Hello ${username},\nYour credentials -\n    Username : "${username}",\n    Password :"${password}"\nThank you for registering with us!`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending registration confirmation email:", error);
    } else {
      console.log("Registration confirmation email sent:", info.response);
    }
  });
}

module.exports = sendConfirmationEmail;
