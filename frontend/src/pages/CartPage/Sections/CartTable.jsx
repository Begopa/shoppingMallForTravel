import React from "react";

const CartTable = ({ products, onRemoveItem }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${import.meta.env.VITE_SERVER_URL}/${image}`;
    }
  };
  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <tr className="border-b" key={product._id}>
        <td>
          <img
            className="w-[70px] h-[60px]"
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td>{product.quantity} 개</td>
        <td>{product.price} 개</td>
        <td>
          <button onClick={() => onRemoveItem(product._id)}>지우기</button>
        </td>
      </tr>
    ));
  return (
    <section>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="border-[1px]">
          <tr>
            <th>사진</th>
            <th>개수</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>

        <tbody>{renderItems}</tbody>
      </table>
    </section>
  );
};

export default CartTable;
