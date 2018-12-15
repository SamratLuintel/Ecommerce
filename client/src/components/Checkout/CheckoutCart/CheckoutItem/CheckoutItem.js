import React, { Component } from "react";

class CheckoutItem extends Component {
  render() {
    return (
      <tr className="CheckoutItem">
        <td className="CheckoutItem__product CheckoutItem__item">
          <div className="CheckoutItem__image-wrapper">
            <img
              src="http://mediamart.zooextension.com/media/catalog/product/cache/2f58bf1051a2f0ceba166b720ec0a490/1/-/1-5_2.jpg"
              alt=""
              className="CheckoutItem__image"
            />
          </div>

          <div className="CheckoutItem__product-name">
            <strong>Gopro Camera</strong>
          </div>
        </td>
        <td className="CheckoutItem__item CheckoutItem__medium-text">100$</td>
        <td className="CheckoutItem__item">
          <div className="CheckoutItem__quantity-ctrl">
            <div className="CheckoutItem__quantity-ctrl__reduce-btn">-</div>
            <input
              value={2}
              type="text"
              className="CheckoutItem__quantity-ctrl__input"
            />
            <div className="CheckoutItem__quantity-ctrl__increase-btn">+</div>
          </div>
        </td>
        <td className="CheckoutItem__item CheckoutItem__medium-text">$1500</td>
      </tr>
    );
  }
}
export default CheckoutItem;
