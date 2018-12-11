import React, { Component } from "react";
import AddProductContext from "../../addProductContext";

class ProductDetails extends Component {
  static contextType = AddProductContext;
  render() {
    return (
      <div className="ProductDetails">
        <span dangerouslySetInnerHTML={{ __html: this.context.details }} />
      </div>
    );
  }
}
export default ProductDetails;
