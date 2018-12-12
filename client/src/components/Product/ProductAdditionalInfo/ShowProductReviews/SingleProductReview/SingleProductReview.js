import React from "react";
import StarRatingComponent from "react-star-rating-component";

const SingleProductReview = props => {
  return (
    <div className="SingleProductReview">
      <div className="SingleProductReview__info-wrapper">
        <div className="SingleProductReview__name">{props.name}</div>{" "}
        <StarRatingComponent
          name="rate1"
          value={props.rating}
          editable={false}
          renderStarIcon={() => (
            <i className="fas fa-star SingleProductReview__rating-star-icon" />
          )}
        />
      </div>
      <div className="SingleProductReview__comment">{props.comment}</div>
    </div>
  );
};
export default SingleProductReview;
