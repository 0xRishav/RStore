import React, { useContext, useEffect, useState } from "react";
import { Loader, Navbar, Product, CartProduct, Checkbox } from "../index";
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
        <div className="radio-btn-wrapper">
          <h5>Sort By Price: </h5>

          <label className="radio-btn-container" for="low-to-high">
            <input
              type="radio"
              id="low-to-high"
              value="sort"
              name="sort"
              onChange={() => {
                dispatch({ type: "SORT_BY", payload: "LOW_TO_HIGH" });
              }}
              checked={sortBy && sortBy === "LOW_TO_HIGH"}
              className="radio-btn"
            />
            <span class="checkmark"></span>
            Low To High
          </label>

          <label for="high-to-low" className="radio-btn-container">
            <input
              type="radio"
              id="high-to-low"
              value="sort"
              name="sort"
              onChange={() => {
                dispatch({ type: "SORT_BY", payload: "HIGH_TO_LOW" });
              }}
              checked={sortBy && sortBy === "HIGH_TO_LOW"}
              className="radio-btn"
            />
            <span class="checkmark"></span>
            High To Low
          </label>
        </div>
        <div className="App__filterCheckboxWrapper">
          <h5>Filter By: </h5>
          <div className="App__filterCheckboxContainer"></div>
        </div>
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
        {productsToShow === "Cart" && <div className="hr-div"></div>}
        {productsToShow === "Cart" && (
          <div className="App__totalCartPrice">Total: Rs. {totalPrice}</div>
        )}
      </div>
    </div>
  );
}

export default App;
