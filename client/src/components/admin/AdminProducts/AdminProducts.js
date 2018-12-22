import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminProducts } from "../../../store/actions/products/adminProducts";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import AdminProduct from "./AdminProduct/AdminProduct";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import AdminProductsHeader from "./AdminProductsHeader/AdminProductsHeader";

class AdminProducts extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.profile.authenticated && !this.props.products.fetched) {
      this.props.fetchAdminProducts();
    }
  };

  componentDidMount = () => {
    if (this.props.profile.authenticated && !this.props.products.fetched) {
      this.props.fetchAdminProducts();
    }
  };
  renderProducts = () => {
    if (this.props.products.fetched && this.props.profile.authenticated) {
      return this.props.products.lists.map(product => {
        return (
          <AdminProduct
            title={product.title}
            price={product.price}
            desc={product.desc}
            images={product.images}
            category={product.category}
            id={product._id}
          />
        );
      });
    }
  };
  render() {
    return (
      <div className="AdminProducts">
        <AdminSideNav />
        {/* Margin left of -260px */}
        <div className="AdminProducts__main-area">
          <AdminHeader />

          {/* Applies some padding */}
          <div className="AdminProducts__main-area__content">
            <AdminProductsHeader />
            {this.renderProducts()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  products: state.adminProducts
});

export default connect(
  mapStateToProps,
  { fetchAdminProducts }
)(AdminProducts);
