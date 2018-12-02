import React, { Component } from "react";

class CheckoutItem extends Component {
  render() {
    const { props } = this;

    return (
      <div className="CheckoutItem">
        <p>{props.title}</p>
        <p>{props.desc}</p>
        <p>Price: {props.price}</p>
        <p>{props.amount}</p>
      </div>
    );
  }
}
export default CheckoutItem;
