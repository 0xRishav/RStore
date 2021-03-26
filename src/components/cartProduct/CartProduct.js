import React from "react";
import "./CartProduct.css";

function CartProduct({
  id,
  name,
  image,
  price,
  description,
  isInCart,
  isInWishlist,
  dispatch,
  quantity,
  getTotalPrice,
}) {
  const TotalPrice = getTotalPrice();

  return (
    <div className="cartProduct">
      <div className="hr-div"></div>
      <div className="cartProduct__wrapper">
        <img className="cartProduct__image" src={image} alt={`${name}image`} />
        <div className="cartProduct__name">{name}</div>
        <div className="cartProduct__quantityWrapper">
          <button
            className="Product__button--secondary"
            onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: id })}
          >
            +
          </button>
          {quantity}
          <button
            className="Product__button--secondary"
            onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: id })}
          >
            -
          </button>
        </div>
        <div className="cartProduct__subTotal">Rs. {price * quantity}</div>
        <div
          className="CartProduct__removeProuctLink"
          onClick={() => dispatch({ type: "TOGGLE_ITEM_IN_CART", payload: id })}
        >
          Remove
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
