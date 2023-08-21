import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider.jsx";

const CardItem = ({ product }) => {
  return (
    <div>
      <div className="border-[1px] border-gray-300">
        <ImageSlider images={product.images} />
        <Link to={`/product/${product._id}`}>
          <p className="p-1">{product.title}</p>
          <p className="p-1">{product.continents}</p>
          <p className="p-1 text-xs text-gray-500">{product.price}</p>
        </Link>
      </div>
    </div>
  );
};

export default CardItem;
