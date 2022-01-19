const express = require("express");
const router = express.Router();

const {
 login,
 register,
 resetpassword,
 forgotpassword,
} = require("../controllers/auth.js");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/forgotpassword").post(forgotpassword);

module.exports = router;
