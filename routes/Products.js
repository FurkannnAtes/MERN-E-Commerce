const router = require("express").Router();
const Product = require("../models/Product.js");
const mongoose = require("mongoose");
//All Products
router.get("/", async (req, res) => {
  try {
    Product.find({}, (err, products) => {
      res.json(products);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Single product
router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);

    res.status(200).send(singleProduct);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Create new Product
router.post("/createProduct", async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;
    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
    });
    const product = await newProduct.save();
    res.status(200).send("The product has been created");
  } catch (error) {
    res.status(500).send(error);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send("The product has been updated");
  } catch (error) {
    res.status(500);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("The product has been deleted");
  } catch (error) {
    res.status(500);
  }
});
module.exports = router;
