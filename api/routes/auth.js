const router = require("express").Router();
const User = require("../models/User");
const brcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await brcrypt.genSalt(10);
    const hashedPassword = await brcrypt.hash(req.body.password, salt);
    const alreadyUsername = await User.findOne({ username: req.body.username });
    if (alreadyUsername) {
      return res.status(400).json("Username already exists!");
    }
    const alreadyEmail = await User.findOne({ email: req.body.email });
    if (alreadyEmail) {
      return res
        .status(400)
        .json("A user with this email is already registered!");
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username:req.body.username });
    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validatePassword = await brcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(400).json("Wrong credentials!");
    }
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;
