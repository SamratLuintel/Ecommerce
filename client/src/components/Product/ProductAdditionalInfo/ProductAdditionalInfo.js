import React, { Component } from "react";
import AdditionalInfoTabs from "./AdditionalInfoTabs/AdditionalInfoTabs";
import ProductDetails from "./ProductDetails/ProductDetails";
import AddProductReview from "./AddProductReview/AddProductReview";

class ProductAdditionalInfo extends Component {
  state = {
    //Three options
    //details , reviews and add-review
    selectedTab: "details"
  };
  onSelectedTabChange = name => {
    this.setState({ selectedTab: name });
  };
  render() {
    let renderElement;
    if (this.state.selectedTab === "details")
      renderElement = <ProductDetails />;

    if (this.state.selectedTab === "add-review")
      renderElement = <AddProductReview />;
    return (
      <div className="ProductAdditionalInfo">
        <AdditionalInfoTabs
          selectedTab={this.state.selectedTab}
          onSelectedTabChange={this.onSelectedTabChange}
        />
        {renderElement}
      </div>
    );
  }
}
export default ProductAdditionalInfo;
