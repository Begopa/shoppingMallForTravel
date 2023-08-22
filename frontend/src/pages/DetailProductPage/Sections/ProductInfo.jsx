import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions.js";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };

  return (
    <section>
      <p className="text-xl text-bold">상품 정보</p>
      <ul>
        <li>
          <span className="font-semibold text-gray-900">가격: </span>{" "}
          {product.price} 원
        </li>
        <li>
          <span className="font-semibold text-gray-900">팔린 개수:</span>{" "}
          {product.sold} 개
        </li>
        <li>
          <span className="font-semibold text-gray-900">설명:</span>{" "}
          {product.description}
        </li>
      </ul>

      <div className="mt-3">
        <button
          className="w-full px-4 py-2 text-white bg-black hover:bg-gray-700 rounded-md"
          onClick={handleClick}
        >
          장바구니로
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;
