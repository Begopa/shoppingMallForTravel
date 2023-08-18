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

module.exports = router;
