import React from "react";
import "./Product.css";
import { AiFillTag } from "react-icons/ai";
import { Link } from "react-router-dom";

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
  fastDelivery,
  freeShipping,
}) {
  return (
    <div className="Product">
      <Link to={`/product/${id}`}>
        <img className="Product__image" src={image} alt="productImage" />
      </Link>
      <h3 className="Product__productName">{name}</h3>
      <p className="Product__price">Rs. {price}</p>
      <div className="Product__offerWrapper">
        {fastDelivery && (
          <span className="Product__offer">
            <AiFillTag />
            Fast Delivery
          </span>
        )}
        {freeShipping && (
          <span className="Product__offer">
            <AiFillTag /> Free Shipping
          </span>
        )}
      </div>
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
