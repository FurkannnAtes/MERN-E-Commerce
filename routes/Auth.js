const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

//register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, agree, gender } = req.body;
    const emailFind = await User.findOne({ email: req.body.email });
    if (emailFind) {
      res.status(500).send("This email is already in use");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        agree,
        gender,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(404).send("user not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(403).send("Invalid Password!");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
