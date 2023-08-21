const { default: mongoose, Schema } = require("mongoose");

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
  images: {
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

// 검색을 위한 인덱스
productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    // 중요도
    weights: {
      title: 5,
      description: 1,
    },
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
