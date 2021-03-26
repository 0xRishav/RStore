import React from "react";
import "./Product.css";

function Product({
  id,
  name,
  image,
  price,
  description,
  isInCart,
  isInWishlist,
  dispatch,
  quantity,
}) {
  return (
    <div className="Product">
      <img className="Product__image" src={image} alt="productImage" />
      <h3 className="Product__productName">{name}</h3>
      <p className="Product__price">Rs. {price}</p>
      <div className="Product__buttonWrapper">
        <button
          onClick={() => dispatch({ type: "TOGGLE_ITEM_IN_CART", payload: id })}
          className="Product__button--primary"
        >
          {isInCart ? "Remove From Cart" : "Add To Cart"}
        </button>
        <button
          onClick={() =>
            dispatch({ type: "TOGGLE_ITEM_IN_WISHLIST", payload: id })
          }
          className="Product__button--secondary"
        >
          {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default Product;
