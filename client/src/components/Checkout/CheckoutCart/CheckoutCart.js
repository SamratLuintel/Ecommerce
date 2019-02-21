import React, { Component } from "react";
import CheckoutItem from "./CheckoutItem/CheckoutItem";
import { connect } from "react-redux";
import { saveCart } from "../../../store/actions/carts/carts";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class CheckoutCart extends Component {
  renderCartItems = () => {
    if (this.props.carts.totalItems === 0)
      return <p>There are no items to show</p>;

    return this.props.carts.items.map((item, index) => {
      const cloudinaryName = this.props.keys.cloudinary
        ? this.props.keys.cloudinary.cloudName
        : "";
      const rawImageUrl = `https://res.cloudinary.com/${cloudinaryName}/image/upload/`;
      const imageUrl = `${rawImageUrl}${item.product.images[0]}`;
      return (
        <CheckoutItem
          index={index}
          image={imageUrl}
          title={item.product.title}
          price={item.product.price}
          amount={item.amount}
        />
      );
    });
  };

  onSaveCart = async () => {
    const items = this.props.carts.items;
    const cartId = this.props.carts.id;
    try {
      await this.props.saveCart(items, cartId);
      NotificationManager.info("Cart have been updated");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="CheckoutCart">
        <table className="CheckoutCart__table">
          <thead className="CheckoutCart__header">
            <tr className="CheckoutCart__header__tr">
              <th className="CheckoutCart__header__item">Product Name</th>
              <th className="CheckoutCart__header__item">Price</th>
              <th className="CheckoutCart__header__item">Quantity</th>
              <th className="CheckoutCart__header__item">Total</th>
              <th className="CheckoutCart__header__item" />
            </tr>
          </thead>
          <tbody>{this.renderCartItems()}</tbody>
        </table>
        <div onClick={this.onSaveCart} className="CheckoutCart__save-btn">
          SAVE CART
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  carts: state.carts,
  keys: state.profile.keys
});
export default connect(
  mapStateToProps,
  { saveCart }
)(CheckoutCart);
