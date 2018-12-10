import React, { Component } from "react";
import { fetchPopularProducts } from "../../../store/actions/products/userProducts";
import { connect } from "react-redux";
import ProductItemCard from "../../common/Card/ProductItemCard/ProductItemCard";

class PopularProducts extends Component {
  componentDidMount = async () => {
    this.props.fetchPopularProducts();
  };

  renderProducts = () => {
    if (!this.props.products.popular.fetched) return;

    return this.props.products.popular.lists.map(product => (
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
      <div className="PopularProducts">
        <div className="container">
          <div className="PopularProducts__header-wrapper">
            <h3 className="PopularProducts__header">Popular Product</h3>
          </div>
          <div className="PopularProducts__product-lists">
            <div className="row">{this.renderProducts()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchPopularProducts }
)(PopularProducts);
