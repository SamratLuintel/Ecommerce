import React, { Component } from "react";
import SingleInfoTab from "./SingleInfoTab/SingleInfoTab";
import ProductContext from "../../productContext";

class AdditionalInfoTabs extends Component {
  static contextType = ProductContext;
  render() {
    return (
      <div className="AdditionalInfoTabs">
        <SingleInfoTab
          name="details"
          selectedTab={this.context.selectedTab}
          onSelectedTabChange={this.context.onSelectedTabChange}
        />
        <SingleInfoTab
          name="reviews"
          selectedTab={this.context.selectedTab}
          onSelectedTabChange={this.context.onSelectedTabChange}
        />
        <SingleInfoTab
          name="add-review"
          selectedTab={this.context.selectedTab}
          onSelectedTabChange={this.context.onSelectedTabChange}
        />
      </div>
    );
  }
}
export default AdditionalInfoTabs;
