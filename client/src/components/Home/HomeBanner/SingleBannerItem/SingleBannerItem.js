import React, { Component } from "react";

class SingleBannerItem extends Component {
  render() {
    const { props } = this;
    return (
      <div className="SingleBannerItem">
        <img src={props.image} alt="" className="SingleBannerItem__image" />
        <div className="SingleBannerItem__wrapper">
          <div className="SingleBannerItem__content">
            <h3 className="SingleBannerItem__title">Music & Audio</h3>
            <p className="SingleBannerItem__sub-title">Up to 70%</p>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleBannerItem;
