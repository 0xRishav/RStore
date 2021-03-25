import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Loader, Product } from "../index";
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

  const handleProductsBtnClick = (e) => {
    console.log(e.target.innerText);
    dispatch({ type: "PRODUCTS_TO_SHOW", payload: e.target.innerText });
  };

  return (
    <div className="App">
      <h1> Cart App </h1>
      {productButtons.map((button) => (
        <button
          className={
            productsToShow === button
              ? "Product__button--primary"
              : "Product__button--secondary"
          }
          onClick={handleProductsBtnClick}
        >
          {button}
        </button>
      ))}

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
      {isLoading && <Loader />}
      <div className="products-wrapper">
        {productsToShow === "All Products" &&
          products.map((product) => (
            <Product {...product} dispatch={dispatch} />
          ))}

        {productsToShow === "Cart" &&
          products
            .filter((product) => product.isInCart === true)
            .map((product) => <Product {...product} dispatch={dispatch} />)}

        {productsToShow === "Wishlist" &&
          products
            .filter((product) => product.isInWishlist === true)
            .map((product) => <Product {...product} dispatch={dispatch} />)}
      </div>
    </div>
  );
}

export default App;
