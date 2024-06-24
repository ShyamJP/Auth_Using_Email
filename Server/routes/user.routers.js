const express = require("express");
const { forgetPassword,
    resetPassword } = require("../controllers/forgetPassword.controller.js");
const register = require('../controllers/user.js')
const router = express.Router();

router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/register",register);

module.exports =  router;