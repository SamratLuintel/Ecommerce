import React, { Component } from "react";
import { fetchRecentProducts } from "../../../store/actions/products/userProducts";
import { connect } from "react-redux";
import ProductItemCard from "../../common/Card/ProductItemCard/ProductItemCard";
import MobileBanner from "./MobileBanner/MobileBanner";

class RecentProducts extends Component {
  componentDidMount = async () => {
    this.props.fetchRecentProducts();
  };

  renderProducts = () => {
    if (!this.props.products.recent.fetched) return;

    return this.props.products.recent.lists.map(product => (
      <div className="col-md-3 col-sm-6">
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
      <div className="RecentProducts">
        <div className="container">
          <div className="RecentProducts__header-wrapper">
            <h3 className="RecentProducts__header">Recent Products</h3>
          </div>
          <div className="RecentProducts__product-lists">
            <div className="row">
              <div className="col-md-9 RecentProducts__first-col">
                <div className="row">{this.renderProducts()}</div>
              </div>
              <div className="col-md-3 RecentProducts__second-col">
                <MobileBanner />
              </div>
            </div>
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
  { fetchRecentProducts }
)(RecentProducts);
