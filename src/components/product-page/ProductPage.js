import React, { useContext } from "react";
import { useParams } from "react-router";
import { Navbar } from "..";
import { ProductsContext } from "../../contexts/productsContext";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const { products, dispatch } = useContext(ProductsContext).products;

  const {
    name,
    image,
    price,
    description,
    isInCart,
    isInWishlist,
    fastDelivery,
    freeShipping,
  } = products.find((product) => product.id === id);

  return (
    <div className="productPage">
      <Navbar />
      <div className="productPage__wrapper">
        <img className="productPage__image" src={image} alt={`${name}-Image`} />
        <div className="ProductPage__rightContainer">
          <div className="productPage__name">{name}</div>
          <div className="productPage__description">{description}</div>
          <div className="productPage__offerWrapper">
            {fastDelivery && (
              <div className="productPage__offer">Fast Delivery</div>
            )}
            {freeShipping && (
              <div className="productPage__offer">Free Shipping</div>
            )}
          </div>
            <div className="ProductPage__buttonWrapper">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_ITEM_IN_CART", payload: id })
                }
                className="ProductPage__button--primary"
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
      </div>
    </div>
  );
}

export default ProductPage;
