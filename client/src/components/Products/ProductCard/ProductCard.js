import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductCard extends Component {
  redirectToProductPage = () => {
    const id = this.props.id;
    this.props.history.push(`/product/${id}`);
  };

  render() {
    const { props } = this;
    return (
      <div className="ProductCard">
        <p className="ProductCard__title">{props.title}</p>
        <p className="ProductCard__price">{props.price}</p>
        <p
          onClick={this.redirectToProductPage}
          className="ProductCard_-view-details"
        >
          View Details{" "}
        </p>
      </div>
    );
  }
}
export default withRouter(ProductCard);
