import React, { Component } from "react";
import RandomProductsContext from "../randomProductsContext";
import SingleTab from "./SingleTab/SingleTab";

class TabsCollection extends Component {
  static contextType = RandomProductsContext;

  renderTabs = () => {
    return this.context.displayCategories.map((category, index) => (
      <SingleTab
        name={category.name}
        selected={index === this.context.selectedCategory}
        onChangeTab={() => this.context.onSelectedCategoryChange(index)}
      />
    ));
  };
  render() {
    const { props, context } = this;
    return <div className="TabsCollection">{this.renderTabs()}</div>;
  }
}
export default TabsCollection;
