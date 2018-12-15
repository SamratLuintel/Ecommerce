import React, { Component } from "react";
import { updateCartProductAmount } from "../../../../store/actions/carts/carts";
import { connect } from "react-redux";

class CheckoutItem extends Component {
  increaseProductAmount = () => {
    const newAmount = this.props.amount + 1;
    this.props.updateCartProductAmount(this.props.index, newAmount);
  };

  decreaseProductAmount = () => {
    const newAmount = this.props.amount - 1;
    if (newAmount <= 0) return;
    this.props.updateCartProductAmount(this.props.index, newAmount);
  };

  productTotalPrice = () => {
    return this.props.price * this.props.amount;
  };
  render() {
    const { props } = this;
    return (
      <tr className="CheckoutItem">
        <td className="CheckoutItem__product CheckoutItem__item">
          <div className="CheckoutItem__image-wrapper">
            <img src={props.image} alt="" className="CheckoutItem__image" />
          </div>

          <div className="CheckoutItem__product-name">
            <strong>{props.title}</strong>
          </div>
        </td>
        <td className="CheckoutItem__item CheckoutItem__medium-text">
          {props.price}
        </td>
        <td className="CheckoutItem__item">
          <div className="CheckoutItem__quantity-ctrl">
            <div
              onClick={this.decreaseProductAmount}
              className="CheckoutItem__quantity-ctrl__reduce-btn"
            >
              -
            </div>
            <input
              value={props.amount}
              type="text"
              className="CheckoutItem__quantity-ctrl__input"
            />
            <div
              onClick={this.increaseProductAmount}
              className="CheckoutItem__quantity-ctrl__increase-btn"
            >
              +
            </div>
          </div>
        </td>
        <td className="CheckoutItem__item CheckoutItem__medium-text">
          {this.productTotalPrice()}
        </td>
      </tr>
    );
  }
}
export default connect(
  null,
  { updateCartProductAmount }
)(CheckoutItem);
