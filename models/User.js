const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, "Please provide a username"],
 },
 email: {
  type: String,
  required: [true, "Please provide an email"],
  unique: true,
 },
 password: {
  type: String,
  required: [true, "Please add a password"],
  minlength: 6,
  select: false,
 },
 resetPasswordToken: String,
 resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
 if (!this.isModified("password")) {
  next();
 }
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
 next();
});

UserSchema.methods.matchPasswords = async function (password) {
 return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
 return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE,
 });
};

UserSchema.methods.getResetPasswordToken = function () {
 const resetToken = crypto.randomBytes(20).toString("hex");

 this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");
 // set the expiration of the reset to 10mins
 this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

 return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

// the select option is for the request i.e. when we request for the user do we want the password to be sent along with the request and the answer is no. We don't want the password to be sent back to us unless we specifically ask for it.
