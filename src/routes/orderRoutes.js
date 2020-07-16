const express = require("express");
const Product = require("../models/Products");
const Order = require("../models/Order");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.post("/product/orderProducts", requireAuth, async (req, res) => {
  const order = await Order(req.body);
  try {
    await order.save();
    res.status(200).send("Product ordered successfully!!!");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/product/orderedproducts', requireAuth, async (req, res) => {
  try {
      const orders = await Order.find({ email : req.user.email })

      if(orders === undefined) {
          throw new Error('Orderlist empty')
      }

      const products = []
      for (let i = 0; i < orders.length; i++) {
          const product = await Product.findOne({ _id : orders[i].productId})
          products.push(product)
      }

      res.send(products)
  } catch (e) {
      res.status(400).send()
  }
})

module.exports = router;
