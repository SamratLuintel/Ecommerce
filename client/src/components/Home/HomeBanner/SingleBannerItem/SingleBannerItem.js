import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SingleBannerItem extends Component {
  redirectToCategory = () => {
    this.props.history.push(`/categories/${this.props.id}`);
  };
  render() {
    const { props } = this;
    return (
      <div className="SingleBannerItem" onClick={this.redirectToCategory}>
        <img src={props.image} alt="" className="SingleBannerItem__image" />
        <div className="SingleBannerItem__wrapper">
          <div className="SingleBannerItem__content">
            <h3 className="SingleBannerItem__title">{props.name}</h3>
            <p className="SingleBannerItem__sub-title">
              Up to {props.discount}%
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SingleBannerItem);
