const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
