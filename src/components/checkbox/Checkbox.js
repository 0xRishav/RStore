import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/productsContext";
import "./Checkbox.css";

function Checkbox({ type }) {
  const { showFreeShippingOnly, showFastDeliveryOnly, dispatch } = useContext(
    ProductsContext
  ).products;
  return (
    <label className="checkbox">
      <span className="checkbox__input">
        <input
          type="checkbox"
          name="checkbox"
          onChange={() =>
            dispatch({
              type:
                type === "Free Shipping"
                  ? "TOGGLE_SHOWFREESHIPPING"
                  : "TOGGLE_SHOWFASTDELIVERY",
            })
          }
          checked={
            type === "Free Shipping"
              ? showFreeShippingOnly === true
              : showFastDeliveryOnly === true
          }
        />
        <span className="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span className="radio__label">{type}</span>
    </label>
  );
}

export default Checkbox;
