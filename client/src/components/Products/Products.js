import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../store/actions/products/products";
import Product from "./Product/Product";

class Products extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.profile.authenticated && !this.props.products.fetched) {
      this.props.fetchProducts();
    }
  };

  componentDidMount = () => {
    if (this.props.profile.authenticated && !this.props.products.fetched) {
      this.props.fetchProducts();
    }
  };
  renderProducts = () => {
    if (this.props.products.fetched && this.props.profile.authenticated) {
      return this.props.products.lists.map(product => {
        return (
          <Product
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
  products: state.products
});

export default connect(
  mapStateToProps,
  { fetchProducts }
)(Products);
