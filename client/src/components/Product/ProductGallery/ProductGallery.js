import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import ProductContext from "../productContext";

class ProductGallery extends Component {
  static contextType = ProductContext;

  renderGalleryImages = () => {
    const imageRawUrl = "https://res.cloudinary.com/samrat/image/upload/";
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
export default ProductGallery;
