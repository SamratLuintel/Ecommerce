import React, { Component } from "react";
import CheckoutItem from "./CheckoutItem/CheckoutItem";

class CheckoutCart extends Component {
  render() {
    return (
      <table className="CheckoutCart">
        <thead className="CheckoutCart__header">
          <tr className="CheckoutCart__header__tr">
            <th className="CheckoutCart__header__item">Product Name</th>
            <th className="CheckoutCart__header__item">Price</th>
            <th className="CheckoutCart__header__item">Quantity</th>
            <th className="CheckoutCart__header__item">Total</th>
          </tr>
        </thead>
        <tbody>
          <CheckoutItem />
        </tbody>
      </table>
    );
  }
}
export default CheckoutCart;
