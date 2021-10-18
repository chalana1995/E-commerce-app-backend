const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.MONGO_SECRET
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401).json("Wrong Credintials");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.MONGO_SECRET
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Password does not match");
    }

    const { password, ...other } = user._doc;

    res.json(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
