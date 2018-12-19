import React, { Component } from "react";

class OrderValueCard extends Component {
  render() {
    return (
      <div className="OrderValueCard">
        <div className="OrderValueCard__left">
          <h6 className="OrderValueCard__left__title">Order Value</h6>
          <h3 className="OrderValueCard__left__subtitle">$ 88,568</h3>
        </div>
        <div className="OrderValueCard__right">
          <i class="fas fa-trophy" />
        </div>
      </div>
    );
  }
}
export default OrderValueCard;
