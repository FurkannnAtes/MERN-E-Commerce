const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/Auth.js");
const productsRoutes = require("./routes/Products.js");
const basketRoutes = require("./routes/Basket.js");
const userRoutes = require("./routes/User.js");

const app = express();

const port = process.env.PORT || 8000;

mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connect Successfull");
  } catch (error) {
    console.log(error);
  }
};
//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/basket", basketRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  connect();
  console.log("Server is running on " + port);
});
