const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [8, "Minimum password length is 8 characters"],
  },
  fullName: String,
  phoneNumber: Number,
});

// static function to generate encrypted password
userSchema.statics.genPassword = async function (password) {
  const salt = await bcryptjs.genSalt();
  password = await bcryptjs.hash(password, salt);
  return password;
};

// static function to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("users", userSchema);
