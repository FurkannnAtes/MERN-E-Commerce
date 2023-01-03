const router = require("express").Router();
const User = require("../models/User.js");
const mongoose = require("mongoose");

//Single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
