import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdminProducts } from "../../../store/actions/products/adminProducts";
import AdminProduct from "./AdminProduct/AdminProduct";

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
            category={product.category}
            id={product._id}
          />
        );
      });
    }
  };
  render() {
    return (
      <div className="Products">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Product Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {this.renderProducts()}
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
