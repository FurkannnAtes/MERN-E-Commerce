const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
