const router = require("express").Router();
const User = require("../models/user-model");

router.get("/get", async (req, res) => {
  let { userId } = req.query;
  let userList;

  try {
    if (userId) {
      userList = await User.find({ _id: userId });
      if (userList.length === 0) throw "user not found";
    } else {
      userList = await User.find();
    }

    res.status(200).json(userList);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/create", async (req, res) => {
  let { email, fullName, phoneNumber } = req.body;

  try {
    let newUser = await User.create({
      email,
      fullName,
      phoneNumber,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/update", async (req, res) => {
  let { userId, ...toUpdate } = req.body;

  try {
    if (userId) {
      let data = await User.updateOne({ _id: userId }).set(toUpdate);
      res.status(200).json(data);
    } else {
      throw "no user found";
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
