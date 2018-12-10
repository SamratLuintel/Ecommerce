import React, { Component } from "react";

class NewsLetter extends Component {
  render() {
    return (
      <div className="NewsLetter">
        <div className="container">
          <div className="NewsLetter__content">
            <h4 className="NewsLetter__title">NewsLetter</h4>
            <p className="NewsLetter__sub-title">
              Subscribe to receive coupons and gift cards
            </p>
            <div className="NewsLetter__form-content">
              <input
                type="text"
                placeholder="Email address"
                className="NewsLetter__form-content__input"
              />
              <div className="NewsLetter__btn-wrapper">
                <button className="NewsLetter__action-btn">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsLetter;
