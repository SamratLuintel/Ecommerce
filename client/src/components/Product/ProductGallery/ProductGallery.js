import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import ProductContext from "../productContext";
import { connect } from "react-redux";

class ProductGallery extends Component {
  static contextType = ProductContext;

  renderGalleryImages = () => {
    const cloudinaryName = this.props.keys.cloudinary
      ? this.props.keys.cloudinary.cloudName
      : "";
    const imageRawUrl = `https://res.cloudinary.com/${cloudinaryName}/image/upload/`;
    return this.context.images.map(singleImage => {
      const imageUrl = `${imageRawUrl}${singleImage}`;
      return (
        <div className="ProductGallery__image-wrapper">
          <img src={imageUrl} alt="Item" className="ProductGallery__image" />
        </div>
      );
    });
  };

  render() {
    return (
      <Carousel showThumbs={true} infiniteLoop={true} showStatus={false}>
        {this.renderGalleryImages()}
      </Carousel>
    );
  }
}
const mapStateToProps = state => ({
  keys: state.profile.keys
});

export default connect(mapStateToProps)(ProductGallery);
