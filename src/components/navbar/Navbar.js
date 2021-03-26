import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { ProductsContext } from "../../contexts/productsContext";

function Navbar() {
  const { products, dispatch } = useContext(ProductsContext).products;
  const [isScrolled, setIsScrolled] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);

  return (
    <div
      className={
        isScrolled === false
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      <div className="navbar">
        <div className="Navbar__logo">RStore</div>
        <div className="navbar__linkWrapper">
          <ul>
            <li
              onClick={() =>
                dispatch({
                  type: "PRODUCTS_TO_SHOW",
                  payload: "All Products",
                })
              }
            >
              All Products
            </li>
            <li
              onClick={() =>
                dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Wishlist" })
              }
            >
              Wishlist
            </li>
            <li>
              <div className="navbar__cartIconWrapper">
                <BsBag
                  onClick={() => {
                    dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Cart" });
                  }}
                />
                <span className="navbar__productCount">
                  {products.filter((ele) => ele.isInCart === true).length}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
