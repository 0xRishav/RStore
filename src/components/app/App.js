import React, { useContext, useEffect, useState } from "react";
import {
  Loader,
  Navbar,
  Product,
  CartProduct,
  Checkbox,
  SortRadioBtns,
  FilterCheckboxes,
  CouponModal,
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
    showFastDeliveryOnly,
    showFreeShippingOnly,
    dispatch,
  } = useContext(ProductsContext).products;

  const [selectedCoupon, setSelectedCoupon] = useState(false);

  const couponCodes = [
    { name: "OFF30", discount: 0.3 },
    { name: "OFF50", discount: 0.5 },
    { name: "OFF70", discount: 0.7 },
  ];

  const handleCouponClick = (index) => {
    setSelectedCoupon(couponCodes[index]);
    setIsOpen(false);
  };

  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("modal opened");
  }

  function closeModal() {
    setIsOpen(false);
  }

  // MODAL

  const getTotalPriceReducer = (acc, val) => {
    return acc + val.price * val.quantity;
  };

  const getTotalPrice = () => {
    const totalPrice = products
      .filter((product) => product.isInCart === true)
      .reduce(getTotalPriceReducer, 0);

    return totalPrice;
  };

  const getSortedDate = (productList, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return productList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy && sortBy === "HIGH_TO_LOW") {
      return productList.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return productList;
  };

  const getFilteredData = (
    productList,
    { showFastDeliveryOnly, showFreeShippingOnly }
  ) => {
    return productList
      .filter((product) => {
        return showFastDeliveryOnly ? product.fastDelivery : true;
      })
      .filter((product2) => {
        return showFreeShippingOnly ? product2.freeShipping : true;
      });
  };

  const totalPrice = getTotalPrice();

  let newTotal = selectedCoupon
    ? totalPrice - Math.round(getTotalPrice() * selectedCoupon.discount)
    : false;

  const sortedData = getSortedDate(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showFreeShippingOnly,
  });

  return (
    <div className="App__wrapper">
      <Navbar />
      <div className="App">
        <div className="App__checkboxRadioBtnWrapper">
          {productsToShow === "All Products" && <SortRadioBtns />}
          {productsToShow === "All Products" && <FilterCheckboxes />}
        </div>

        {isLoading && <Loader />}
        <div className="products-wrapper">
          {productsToShow === "All Products" &&
            filteredData.map((product) => (
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
            <div className="App__totalApplyOfferWrapper">
              <div className="App__totalCartPrice">
                Total: Rs.{" "}
                {newTotal ? (
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ textDecoration: "line-through", opacity: "50%" }}
                    >
                      {totalPrice}
                    </div>
                    <div style={{ color: "#34C759", marginLeft: "16px" }}>
                      {newTotal}
                    </div>
                  </div>
                ) : (
                  <div>{totalPrice}</div>
                )}
              </div>
              <CouponModal
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                afterOpenModal={afterOpenModal}
                openModal={openModal}
                couponCodes={couponCodes}
                handleCouponClick={handleCouponClick}
                selectedCoupon={selectedCoupon}
              />
            </div>
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
