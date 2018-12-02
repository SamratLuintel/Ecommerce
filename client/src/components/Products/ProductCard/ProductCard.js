import React, { Component } from "react";

class ProductCard extends Component {
  render() {
    const { props } = this;
    return (
      <div className="ProductCard">
        <p className="ProductCard__title">{props.title}</p>
        <p className="ProductCard__price">{props.price}</p>
      </div>
    );
  }
}
export default ProductCard;
