import React, { Component } from "react";
import ProductContext from "../../productContext";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import classnames from "classnames";
class AddProductReview extends Component {
  static contextType = ProductContext;
  state = {
    comment: "",
    commentError: "",
    rating: 3
  };

  onCommentChange = e => {
    this.setState({ comment: e.target.value,commentError:"" });
  };

  onRatingChange = rating => {
    this.setState({ rating });
  };

  onProductReviewSubmit = async () => {
    try {
      const data = {
        productId: this.context.id,
        comment: this.state.comment,
        rating: this.state.rating
      };
      const res = await axios.post("/api/products/add-review", data);
      this.context.onSelectedTabChange("reviews");
      this.context.fetchProduct();
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        this.setFormError(error.response.data);
      }
    }
  };

  setFormError = error => {
    if (error.comment) this.setState({ commentError: error.comment });
  };
  render() {
    if (this.context.hasReviewed) {
      return (
        <div className="AddProductReview">
          <p className="AddProductReview__review-legend">
            You have already reviewed the product
          </p>
        </div>
      );
    }

    const commentBoxClasses = classnames({
      AddProductReview__comment: true,
      "AddProductReview__comment--red": this.state.commentError !== ""
    });
    return (
      <div className="AddProductReview">
        <p className="AddProductReview__review-legend">
          You're reviewing: <strong>{this.context.title}</strong>
        </p>

        <div className="AddProductReview__rating-wrapper">
          <p className="AddProductReview__label">Your Rating</p>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            default={3}
            value={this.state.rating}
            onStarClick={this.onRatingChange}
            renderStarIcon={() => (
              <i className="fas fa-star AddProductReview__rating-star-icon" />
            )}
          />
        </div>
        <div className="AddProductReview__comment-wrapper">
          <p className="AddProductReview__label">Comment</p>
          <textarea
            value={this.state.comment}
            onChange={this.onCommentChange}
            name=""
            id=""
            className={commentBoxClasses}
          />
          {this.state.commentError && (
            <p className="AddProductReview__error">{this.state.commentError}</p>
          )}
        </div>
        <div
          className="AddProductReview__submit-btn"
          onClick={this.onProductReviewSubmit}
        >
          SUBMIT
        </div>
      </div>
    );
  }
}
export default AddProductReview;
