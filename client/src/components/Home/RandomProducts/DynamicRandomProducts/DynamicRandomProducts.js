import React, { Component } from "react";
import TabsCollection from "./TabsCollection/TabsCollection";
import RandomProductsContext from "./randomProductsContext";
import ProductItems from "./ProductItems/ProductItems";
import { fetchProductPerCategory } from "../../../../store/actions/products/userProducts";
import { connect } from "react-redux";

class DynamicRandomProducts extends Component {
  //displays the product of below category
  //Name is for showing it in tabs collection

  state = {
    //Index of selectedCategory
    selectedCategory: 1,

    //Id of categories is to be checked in the database
    //So this field is more open to manual customization
    displayCategories: [
      { id: "5c85202e3fc05d0016b4b408", name: "Computer" },
      { id: "5c8520413fc05d0016b4b409", name: "Mobile" },
      { id: "5c8520503fc05d0016b4b40a", name: "Audio" },
      { id: "5c85212c3fc05d0016b4b40b", name: "Watches" }
    ]
  };
  onSelectedCategoryChange = index => {
    console.log("On selected category change is called");
    this.setState({ selectedCategory: index });
  };

  componentDidMount = () => {
    this.fetchRequiredProducts();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      this.fetchRequiredProducts();
    }
  };
  fetchRequiredProducts = async () => {
    const selectedCategoryId = this.state.displayCategories[
      this.state.selectedCategory
    ].id;

    //IF there is not item in products with the category selected in tab
    //fetch the item
    if (!this.props.products[selectedCategoryId])
      await this.props.fetchProductPerCategory(selectedCategoryId);
  };
  render() {
    const contextValue = {
      selectedCategory: this.state.selectedCategory,
      displayCategories: this.state.displayCategories,
      onSelectedCategoryChange: this.onSelectedCategoryChange
    };
    return (
      <RandomProductsContext.Provider value={contextValue}>
        <div className="DynamicRandomProducts">
          <TabsCollection />
          <ProductItems />
        </div>
      </RandomProductsContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchProductPerCategory }
)(DynamicRandomProducts);
