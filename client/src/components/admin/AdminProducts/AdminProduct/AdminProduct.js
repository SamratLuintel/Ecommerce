import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  deleteProduct,
  fetchProducts
} from "../../../../store/actions/products/products";

class Product extends Component {
  redirectToEditPage = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-product/${id}`);
  };

  onDeletePage = async () => {
    const id = this.props.id;
    await this.props.deleteProduct(id);
    this.props.fetchProducts();
  };
  render() {
    const { props } = this;
    return (
      <div>
        <tbody>
          <tr>
            <td>{props.title}</td>
            <td>{props.price}</td>
            <td>{props.category}</td>
            {/*Display all the images here*/}
            <td onClick={this.redirectToEditPage}>Edit</td>
            <td onClick={this.onDeletePage}>Delete</td>
          </tr>
        </tbody>
      </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    { deleteProduct, fetchProducts }
  )(Product)
);
