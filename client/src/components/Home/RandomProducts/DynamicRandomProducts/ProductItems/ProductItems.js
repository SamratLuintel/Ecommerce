import React, { Component } from "react";
import RandomProductsContext from "../randomProductsContext";
import { connect } from "react-redux";

import ProductItemCard from "../../../../common/Card/ProductItemCard/ProductItemCard";

class ProductItems extends Component {
  static contextType = RandomProductsContext;
  renderProductItems = () => {
    const selectedCategoryId = this.context.displayCategories[
      this.context.selectedCategory
    ].id;

    if (!this.props.products[selectedCategoryId]) return;
    const slicedProducts = this.props.products[selectedCategoryId].lists.slice(
      0,
      3
    );
    return slicedProducts.map(product => (
      <div className="col-md-3">
        <ProductItemCard
          title={product.title}
          images={product.images}
          price={product.price}
          id={product._id}
        />
      </div>
    ));
  };
  render() {
    return (
      <div className="ProductItems">
        <div className="row">{this.renderProductItems()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
export default connect(mapStateToProps)(ProductItems);
