const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.status(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

router.delete("/image", auth, async (req, res) => {
  const imageName = req.query.imageName;

  if (imageName) {
    const imagePath = `uploads/${imageName}`;
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
        console.log("Image deleted:", imageName);
        return res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to delete image." });
      }
    } else {
      return res.status(404).json({ error: "Image not found." });
    }
  } else {
    return res.status(400).json({ error: "Image name not provided." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res, next) => {
  // asc 오름차순, desc 내림차순
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      findArgs[key] = req.query.filters[key];
    }
  }

  try {
    const products = await Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal;

    return res.status(200).json({ products, hasMore });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
