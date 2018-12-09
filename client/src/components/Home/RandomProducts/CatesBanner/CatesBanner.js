import React, { Component } from "react";
import cateBanner from "../../../../assets/images/banner/banner-cate.jpg";

class CatesBanner extends Component {
  render() {
    return (
      <div className="CatesBanner">
        <img src={cateBanner} alt="" className="CatesBanner__image" />
        <p className="CatesBanner__action-btn">
          Discover Now <i class="fas fa-angle-right" />
        </p>
      </div>
    );
  }
}
export default CatesBanner;
