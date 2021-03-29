import React from "react";
import "./FilterCheckboxes.css";
import { Checkbox } from "../index";

function FilterCheckboxes() {
  return (
    <div className="filterCheckboxes">
      <h5>Filter By Offer:</h5>
      <div className="filterCheckboxes__checkboxContainer">
        <Checkbox type="Free Shipping" />
        <Checkbox type="Fast Delivery" />
      </div>
    </div>
  );
}

export default FilterCheckboxes;
