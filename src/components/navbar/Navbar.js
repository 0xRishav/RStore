import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { BsBag } from "react-icons/bs";
import { ProductsContext } from "../../contexts/productsContext";
import { Link } from "react-router-dom";

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

  let cartCount = 0;
  const cartCountReducer = (acc, val) => {
    return acc + val.quantity;
  };

  const getCartCount = () => {
    return products
      .filter((ele) => ele.isInCart === true)
      .reduce(cartCountReducer, 0);
  };

  cartCount = getCartCount();

  console.log({ cartCount });
  return (
    <div
      className={
        isScrolled === false
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      <div className="navbar">
        <Link
          to="/"
          className={
            isScrolled === false
              ? "Navbar__logo"
              : "Navbar__logo Navbar__logo--scrolled"
          }
        >
          <div>RStore</div>
        </Link>
        <div className="navbar__linkWrapper">
          <ul>
            <Link
              to="/"
              className={
                isScrolled === false
                  ? "navbar__Link"
                  : "navbar__Link navbar__Link--scrolled"
              }
            >
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
            </Link>

            <Link
              to="/"
              className={
                isScrolled === false
                  ? "navbar__Link"
                  : "navbar__Link navbar__Link--scrolled"
              }
            >
              <li
                onClick={() =>
                  dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Wishlist" })
                }
              >
                Wishlist
              </li>
            </Link>
            <Link
              to="/"
              className={
                isScrolled === false
                  ? "navbar__Link"
                  : "navbar__Link navbar__Link--scrolled"
              }
            >
              <li>
                <div className="navbar__cartIconWrapper">
                  <BsBag
                    onClick={() => {
                      dispatch({ type: "PRODUCTS_TO_SHOW", payload: "Cart" });
                    }}
                  />
                  <span className="navbar__productCount">{cartCount}</span>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
