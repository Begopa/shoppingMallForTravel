const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  description: String,
  price: {
    type: Number,
    default: 0,
  },
  image: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  },
  // 상품 카테고리
  continents: {
    type: Number,
    default: 1,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
