import React, { Component } from "react";
import bannerImg from "../../../../assets/images/banner/banner-cate-2.jpg";

class MobileBanner extends Component {
  render() {
    return (
      <div className="MobileBanner">
        <div
          className="MobileBanner__image"
          style={{ backgroundImage: `url(${bannerImg})` }}
        />
      </div>
    );
  }
}
export default MobileBanner;
