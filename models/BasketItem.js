const mongoose = require("mongoose");

const BasketItemSchema = new mongoose.Schema({
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
  amount: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("BasketItem", BasketItemSchema);
