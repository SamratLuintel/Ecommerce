import React, { Component } from "react";
import bannerImg from "../../../../assets/images/banner/banner-cate-2.jpg";

class MobileBanner extends Component {
  render() {
    return (
      <div className="MobileBanner">
        <img src={bannerImg} alt="" className="MobileBanner__image" />
      </div>
    );
  }
}
export default MobileBanner;
