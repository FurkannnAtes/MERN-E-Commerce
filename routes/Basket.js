const router = require("express").Router();
const User = require("../models/User.js");
const Product = require("../models/Product.js");

//Add Basket
router.put("/add/:id", async (req, res) => {
  try {
    const { userId } = await req.body;
    const userBasket = await User.findById(userId);
    const product = await Product.findById(req.params.id);

    const basketItemAmount = await userBasket.basket.find(
      (item) => item.id == product.id
    );

    if (userBasket.basket.find((item) => item.id == product.id)) {
      let newAmount = await (basketItemAmount.amount += 1);

      await User.findOneAndUpdate(userId, {
        basket: [
          ...userBasket.basket.filter((item) => item.id != product.id),
          {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            amount: newAmount,
          },
        ],
      });

      res.status(200).send("The product has been add basket");
    } else {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          basket: [
            ...userBasket.basket,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              image: product.image,
              amount: 1,
            },
          ],
        }
      );
      res.status(200).send("The product has been add basket ");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//Delete Basket
router.put("/delete/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const userBasket = await User.findOne({ id: userId });
    const product = await Product.findById(req.params.id);

    const basketItemAmount = await userBasket.basket.find(
      (item) => item.id == product.id
    );

    if (
      userBasket.basket.find((item) => item.id == product.id) &&
      basketItemAmount.amount > 1
    ) {
      let newAmount = await (basketItemAmount.amount -= 1);
      await User.findOneAndUpdate(userId, {
        basket: [
          ...userBasket.basket.filter((item) => item.id != product.id),
          {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            amount: newAmount,
          },
        ],
      });

      res.status(200).send("The product has been delete basket");
    } else {
      await User.findOneAndUpdate(userId, {
        basket: [...userBasket.basket.filter((item) => item.id != product.id)],
      });
      res.status(200).send("The product has been delete basket");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Buy Basket
router.put("/buy/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      basket: [],
    });
    res.status(200).send("Successful purchase");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
