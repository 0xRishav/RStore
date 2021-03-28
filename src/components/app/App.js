import React, { useContext, useEffect, useState } from "react";
import {
  Loader,
  Navbar,
  Product,
  CartProduct,
  Checkbox,
  SortRadioBtns,
} from "../index";
import { ProductsContext } from "../../contexts/productsContext";
import "./App.css";

function App() {
  const {
    products,
    isLoading,
    productsToShow,
    isErr,
    sortBy,
    dispatch,
  } = useContext(ProductsContext).products;

  const productButtons = ["All Products", "Cart", "Wishlist"];

  const getTotalPriceReducer = (acc, val) => {
    return acc + val.price * val.quantity;
  };

  const getTotalPrice = () => {
    const totalPrice = products
      .filter((product) => product.isInCart === true)
      .reduce(getTotalPriceReducer, 0);

    return totalPrice;
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="App__wrapper">
      <Navbar />
      <div className="App">
        {productsToShow === "All Products" && <SortRadioBtns />}
        {isLoading && <Loader />}
        <div className="products-wrapper">
          {productsToShow === "All Products" &&
            products.map((product) => (
              <Product {...product} dispatch={dispatch} />
            ))}

          {productsToShow === "Wishlist" &&
            products
              .filter((product) => product.isInWishlist === true)
              .map((product) => <Product {...product} dispatch={dispatch} />)}
        </div>

        {productsToShow === "Cart" &&
          products
            .filter((product) => product.isInCart === true)
            .map((product) => (
              <CartProduct
                {...product}
                dispatch={dispatch}
                getTotalPrice={getTotalPrice}
              />
            ))}
        {productsToShow === "Wishlist" &&
          products.filter((product) => product.isInWishlist === true).length ===
            0 && (
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              wishlist is empty
            </div>
          )}

        {productsToShow === "Cart" &&
          products.filter((ele) => ele.isInCart === true).length !== 0 && (
            <div className="hr-div"></div>
          )}
        {productsToShow === "Cart" &&
          products.filter((ele) => ele.isInCart === true).length !== 0 && (
            <div className="App__totalCartPrice">Total: Rs. {totalPrice}</div>
          )}
        {productsToShow === "Cart" &&
          products.filter((ele) => ele.isInCart === true).length === 0 && (
            <div className="App__totalCartPrice">Cart Is Empty</div>
          )}
      </div>
    </div>
  );
}

export default App;
