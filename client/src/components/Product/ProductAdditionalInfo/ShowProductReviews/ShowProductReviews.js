import React, { Component } from "react";
import SingleProductReview from "./SingleProductReview/SingleProductReview";
import ProductContext from "../../productContext";

class ShowProductReviews extends Component {
  static contextType = ProductContext;

  renderProductReviews = () => {
    if (this.context.reviews.length === 0)
      return (
        <p className="ShowProductReviews__text">There are no reviews to show</p>
      );

    return this.context.reviews.map(review => (
      <SingleProductReview
        name={review.createdBy.fullname}
        rating={review.rating}
        comment={review.comment}
      />
    ));
  };
  render() {
    return (
      <div className="ShowProductReviews">{this.renderProductReviews()}</div>
    );
  }
}
export default ShowProductReviews;
