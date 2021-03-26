import React, { createContext, useState, useEffect, useReducer } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const initialState = {
    products: [],
    isLoading: false,
    productsToShow: "All Products",
    isErr: false,
    sortBy: null,
  };

  const ProductsReducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };

      case "TOGGLE_LOADING":
        return { ...state, isLoading: !state.isLoading };

      case "PRODUCTS_TO_SHOW":
        return { ...state, productsToShow: action.payload };

      case "SORT_BY":
        if (action.payload === "LOW_TO_HIGH") {
          state.products.sort((a, b) => {
            return a.price - b.price;
          });
        } else if (action.payload === "HIGH_TO_LOW") {
          state.products.sort((a, b) => {
            return b.price - a.price;
          });
        }
        return { ...state, sortBy: action.payload };

      case "TOGGLE_ERR":
        return { ...state, isErr: !state.isErr };

      case "TOGGLE_ITEM_IN_CART":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, isInCart: !ele.isInCart }
              : ele
          ),
        };

      case "TOGGLE_ITEM_IN_WISHLIST":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, isInWishlist: !ele.isInWishlist }
              : ele
          ),
        };

      case "INCREASE_QUANTITY":
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, quantity: ele.quantity + 1 }
              : ele
          ),
        };

      case "DECREASE_QUANTITY":
        const index = state.products.findIndex(
          (ele, index) => ele.id === action.payload
        );
        if (state.products[index].quantity < 2) {
          return state;
        }
        return {
          ...state,
          products: state.products.map((ele) =>
            ele.id === action.payload
              ? { ...ele, quantity: ele.quantity - 1 }
              : ele
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const prods = await axios.get("/api/products");
        dispatch({ type: "SET_PRODUCTS", payload: prods.data.products });
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }
      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, []);

  return (
    <ProductsContext.Provider value={{ products: { ...state, dispatch } }}>
      {children}
    </ProductsContext.Provider>
  );
};
