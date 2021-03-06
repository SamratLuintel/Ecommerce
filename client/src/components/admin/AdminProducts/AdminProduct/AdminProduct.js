import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts
} from "../../../../store/actions/products/adminProducts";
import moment from "moment";

class Product extends Component {
  redirectToEditPage = () => {
    const id = this.props.id;
    this.props.history.push(`/admin/edit-product/${id}`);
  };

  onDeleteProduct = async () => {
    const id = this.props.id;
    await this.props.deleteProduct(id);
    this.props.showDeletedMessage();
    this.props.fetchAdminProducts();
  };

  render() {
    const { props } = this;
    const cloudinaryName = this.props.keys.cloudinary
      ? this.props.keys.cloudinary.cloudName
      : "";
    const rawURL = `https://res.cloudinary.com/${cloudinaryName}/image/upload/`;
    const imageURL = rawURL + props.images[0];
    return (
      <div className="AdminProduct">
        <div className="AdminProduct__header">
          <div
            onClick={this.redirectToEditPage}
            className="AdminProduct__header__left AdminProduct__header__btn AdminProduct__header__btn--blue"
          >
            Edit Product
          </div>
          <div
            onClick={this.onDeleteProduct}
            className="AdminProduct__header__right AdminProduct__header__btn AdminProduct__header__btn--red"
          >
            Delete
          </div>
        </div>
        <div className="AdminProduct__body">
          <div className="AdminProduct__body__details">
            <div className="AdminProduct__product__image-wrapper">
              <img
                className="AdminProduct__product__image"
                src={imageURL}
                alt=""
              />
            </div>
          </div>
          <div className="AdminProduct__body__details">
            <h6 className="AdminProduct__body__title">{props.title}</h6>
            <p className="AdminProduct__body__text-muted">Brief Description</p>
          </div>
          <div className="AdminProduct__body__details">
            <p className="AdminProduct__body__order-price">${props.price}</p>
          </div>
          <div className="AdminProduct__body__details">
            <h6 className="AdminProduct__body__delivered-on">
              Created On {moment(props.createdOn).format("YYYY-MM-DD")}
            </h6>
            <p className="AdminProduct__body__text-muted">Brief Description</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.profile.keys
});

export default withRouter(
  connect(
    mapStateToProps,
    { deleteProduct, fetchAdminProducts }
  )(Product)
);
