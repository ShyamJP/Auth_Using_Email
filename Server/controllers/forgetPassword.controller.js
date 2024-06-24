const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT_SECRET_KEY = process.env.SECRETE_KEY;

// Logic for forget password
const forgetPassword = async (req,res) => {
  try{
    // find user by email
    const user = await User.findOne({ email: req.body.email });

    // if user not exist
    if (!user) {
      return res.json({ message: "user not not! " });
    }

    // generate unique jwt token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    //send the token to the user's mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });
    const sortToken = token.split(".")[1]
    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset/${sortToken}">http://localhost:5173/reset/${sortToken}</a>
        <h3>Token : ${token}</h3>
        <p>The link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Email sent" });
    });
  }catch(err){
    res.status(500).json({message: err.message})
  }
};

// Logic for reset password
const resetPassword = async(req,res) => {
    try{
        // verify the token sent by the user
        const decodeToken = jwt.verify(req.params.token , JWT_SECRET_KEY);

        // if the token is invalid return the error
        if(!decodeToken){
            return res.status(500).json({message : "Invalid Token"})
        }

        // find the user with the id from token
        const user = await User.findOne({_id : decodeToken.userId})
        if (!user) {
            return res.status(401).send({ message: "no user found" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        req.body.newPassword = await bcrypt.hash(req.body.newPassword , salt);

        // Update user's password, clear reset token and expiration time
        user.password = req.body.newPassword;
        await user.save()

        // send success response
        res.status(200).send({ message: "Password updated" });
    }catch(err){
        res.status(500).json({message : err.message})
    }   
};

module.exports = { forgetPassword, resetPassword };
