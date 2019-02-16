import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPublicProducts } from "../../store/actions/public/publicProducts/publicProducts";
import CategoriesFilter from "./CategoriesFilter/CategoriesFilter";
import ProductCard from "./ProductCard/ProductCard";
import ApplicationHeader from "../common/ApplicationHeader/ApplicationHeader";
import ApplicationSideNav from "../common/ApplicationSideNav/ApplicationSideNav";

class Products extends Component {
  componentDidMount = () => {
    if (!this.props.publicProducts.fetched) {
      this.props.fetchPublicProducts();
    }
  };

  filterProducts = products => {
    if (!this.props.publicProducts.categoryFilter) return products;

    const filterId = this.props.publicProducts.categoryFilter;
    //Filter the product by category
    return this.props.publicProducts.lists.filter(
      product => product.category === filterId
    );
  };
  renderProducts = () => {
    const products = this.filterProducts(this.props.publicProducts.lists);
    return products.map(product => (
      <ProductCard
        id={product._id}
        title={product.title}
        desc={product.desc}
        price={product.price}
        category={product.category}
      />
    ));
  };
  render() {
    return (
      <div className="Products">
        <ApplicationHeader />
        <ApplicationSideNav />
        <CategoriesFilter />
        {this.renderProducts()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  publicProducts: state.publicProducts
});
export default connect(
  mapStateToProps,
  { fetchPublicProducts }
)(Products);
