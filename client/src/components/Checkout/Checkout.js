import React, { Component } from "react";
import { connect } from "react-redux";

import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import CheckoutCart from "./CheckoutCart/CheckoutCart";
import CartSummary from "./CartSummary/CartSummary";

class Checkout extends Component {
  render() {
    return (
      <div className="Checkout">
        <ApplicationHeader />
        <div className="container">
          <h1 className="Checkout__heading">Shopping Cart</h1>
          <div className="row">
            <div className="col-md-8">
              <CheckoutCart />
            </div>
            <div className="col-md-4">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts
});
export default connect(mapStateToProps)(Checkout);
