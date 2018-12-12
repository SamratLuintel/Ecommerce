import React, { Component } from "react";
import AdditionalInfoTabs from "./AdditionalInfoTabs/AdditionalInfoTabs";
import ProductDetails from "./ProductDetails/ProductDetails";
import AddProductReview from "./AddProductReview/AddProductReview";
import ProductContext from "../productContext";
import ShowProductReviews from "./ShowProductReviews/ShowProductReviews";

class ProductAdditionalInfo extends Component {
  static contextType = ProductContext;
  render() {
    let renderElement;
    if (this.context.selectedTab === "details")
      renderElement = <ProductDetails />;

    if (this.context.selectedTab === "add-review")
      renderElement = <AddProductReview />;

    if (this.context.selectedTab === "reviews")
      renderElement = <ShowProductReviews />;
    return (
      <div className="ProductAdditionalInfo">
        <AdditionalInfoTabs
          selectedTab={this.context.selectedTab}
          onSelectedTabChange={this.context.onSelectedTabChange}
        />
        {renderElement}
      </div>
    );
  }
}
export default ProductAdditionalInfo;
