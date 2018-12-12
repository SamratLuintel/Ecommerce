import React, { Component } from "react";
import ProductContext from "../../productContext";

class ProductDetails extends Component {
  static contextType = ProductContext;
  render() {
    return (
      <div className="ProductDetails">
        <span dangerouslySetInnerHTML={{ __html: this.context.details }} />
      </div>
    );
  }
}
export default ProductDetails;
