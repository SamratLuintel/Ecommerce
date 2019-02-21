import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import FadeIn from "react-fade-in";

class FeaturedProductSlider extends Component {
  renderFeaturedProducts = () => {
    const { featuredProducts } = this.props;
    if (!featuredProducts.fetched || featuredProducts.lists.length === 0)
      return;

    //We will pick a random featured Item from all the featured Item list

    const length = featuredProducts.lists.length;
    const productIndex = Math.floor(Math.random() * length);
    const cloudinaryName = this.props.keys.cloudinary
      ? this.props.keys.cloudinary.cloudName
      : "";
    const imageRawUrl = `https://res.cloudinary.com/${cloudinaryName}/image/upload/`;
    const product = featuredProducts.lists[productIndex];

    //We will trust on our backend that the product will have two image
    //We will generate two divs for slider and push it to below array
    let productsDiv = [];

    for (let i = 0; i < 2; i++) {
      const imageId = product.images[i];
      const fullImageUrl = `${imageRawUrl}${imageId}`;

      const productDiv = (
        <div className="FeaturedProductSlider" key={i}>
          <img
            src={fullImageUrl}
            className="FeaturedProductSlider__image"
            alt="Smart watch "
          />
          <div className="FeaturedProductSlider__content">
            <h2 className="FeaturedProductSlider__content__title">
              {product.title}
            </h2>

            <FadeIn>
              <h3 className="FeaturedProductSlider__content__subtitle">
                New Features & Design 2017
              </h3>
            </FadeIn>
            <FadeIn>
              <div className="FeaturedProductSlider__content__button">
                Shop Now
              </div>
            </FadeIn>
          </div>
        </div>
      );
      productsDiv.push(productDiv);
    }

    return productsDiv;
  };

  render() {
    return (
      <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
        {this.renderFeaturedProducts()}
      </Carousel>
    );
  }
}

const mapStateToProps = state => ({
  featuredProducts: state.products.featured,
  keys: state.profile.keys
});

export default connect(mapStateToProps)(FeaturedProductSlider);
