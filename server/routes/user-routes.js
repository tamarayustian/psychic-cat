const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

//create tokens
const maxAge = 24 * 60 * 60; // 1 day
const createToken = (email) => {
  return jwt.sign({ email: email }, process.env.COOKIE_KEY, {
    expiresIn: maxAge,
  });
};

//user signup/register
router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  try {
    // validation check
    if (!email || !password) {
      res.status(400).json("please pass in email and password");
    }
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      res.status(400).json("email has been registered");
    }

    // keep email and password consistent and secure
    email = email.toLowerCase();
    password = await User.genPassword(password);

    let newUser = await User.create({ email, password });

    // create token and cookie to keep session
    const token = createToken(newUser.email);
    await res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "user registration successful",
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//user login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    // validation check
    if (!email || !password) {
      res.status(400).json("please pass in email and password");
    }

    // generate token and login
    email = email.toLowerCase();
    const user = await User.login(email, password);
    const token = createToken(newUser.email);
    await res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      message: "user login successful",
      email: user.email,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//user logout
router.get("/logout", async (req, res) => {
  req.logout();
  res.cookie("token", "", { httpOnly: true, maxAge: 0 });
  res.clearCookie("token");
  res.status(200).json({ message: "logged out" });
});

module.exports = router;
