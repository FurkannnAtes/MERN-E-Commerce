const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  agree: {
    type: Boolean,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  basket: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  money: {
    type: Number,
    default: 10000,
  },
});

module.exports = mongoose.model("User", UserSchema);
