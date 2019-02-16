import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminProducts } from "../../../store/actions/products/adminProducts";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import AdminProduct from "./AdminProduct/AdminProduct";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";
import AdminProductsHeader from "./AdminProductsHeader/AdminProductsHeader";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class AdminProducts extends Component {
  state = { nav: "admin-products" };

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
            showDeletedMessage={this.showDeletedMessage}
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

  showDeletedMessage = () => {
    NotificationManager.info("Item have been successfully deleted");
  };
  render() {
    return (
      <div className="AdminProducts">
        <AdminSideNav nav={this.state.nav} />
        {/* Margin left of -260px */}
        <div className="AdminProducts__main-area admin-default-left-margin-mid">
          <AdminHeader />

          {/* Applies some padding */}
          <div className="AdminProducts__main-area__content">
            <AdminProductsHeader />
            {this.renderProducts()}
          </div>
          <NotificationContainer />
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
