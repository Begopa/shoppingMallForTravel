const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
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
