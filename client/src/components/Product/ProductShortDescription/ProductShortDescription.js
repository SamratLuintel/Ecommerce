import React, { Component } from "react";
import ProductContext from "../productContext";

class ProductShortDescription extends Component {
  static contextType = ProductContext;

  render() {
    return (
      <div className="ProductShortDescription">
        <div className="ProductShortDescription__return">Home</div>
        <h1 className="ProductShortDescription__title">{this.context.title}</h1>
        <p className="ProductShortDescription__price">${this.context.price}</p>
        <p className="ProductShortDescription__description">
          {this.context.desc}
        </p>
        <div
          className="ProductShortDescription__btn"
          onClick={this.context.onAddProductToCart}
        >
          <p className="ProductShortDescription__btn-text">Add To Cart</p>
          <p className="ProductShortDescription__btn-icon">
            <i class="fas fa-shopping-cart" />
          </p>
        </div>
      </div>
    );
  }
}
export default ProductShortDescription;
