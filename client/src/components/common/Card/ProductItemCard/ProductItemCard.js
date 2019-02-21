import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ProductItemCard extends Component {
  state = {
    hovered: false
  };

  onHoveredOn = () => {
    console.log("It is hovered");
    this.setState({ hovered: true });
  };

  onHoveredOff = () => {
    this.setState({ hovered: false });
  };

  redirectToProductPage = () => {
    this.props.history.push(`/product/${this.props.id}`);
  };
  render() {
    const { props } = this;
    const cloudinaryName = this.props.keys.cloudinary
      ? this.props.keys.cloudinary.cloudName
      : "";
    const rawImageUrl = `https://res.cloudinary.com/${cloudinaryName}/image/upload/`;

    let imageUrl = `${rawImageUrl}${props.images[0]}`;
    if (this.state.hovered) {
      imageUrl = `${rawImageUrl}${props.images[1]}`;
    }
    const swapElmClass = classnames({
      "ProductItemCard__swap-elements": true,
      "ProductItemCard__swap-wrap--trigger-swap": this.state.hovered
    });
    return (
      <div
        className="ProductItemCard"
        onMouseEnter={this.onHoveredOn}
        onMouseLeave={this.onHoveredOff}
      >
        <div className="ProductItemCard__main-content">
          <div className="ProductItemCard__image-container">
            <img src={imageUrl} className="ProductItemCard__image" alt="" />
          </div>
          <div className="ProductItemCard__item-details">
            <div
              onClick={this.redirectToProductPage}
              className="ProductItemCard__title"
            >
              {props.title}
            </div>
            <div className="ProductItemCard__swap-wrap">
              <div className={swapElmClass}>
                <div className="ProductItemCard__price">${props.price}</div>
                <div
                  className="ProductItemCard__view-product"
                  onClick={this.redirectToProductPage}
                >
                  View Product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.profile.keys
});
export default withRouter(connect(mapStateToProps)(ProductItemCard));
