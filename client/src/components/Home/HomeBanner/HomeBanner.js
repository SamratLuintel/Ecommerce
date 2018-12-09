import React, { Component } from "react";
import SingleBannerItem from "./SingleBannerItem/SingleBannerItem";
import banner1 from "../../../assets/images/banner/banner-01.jpg";
import banner2 from "../../../assets/images/banner/banner-02.jpg";
import banner3 from "../../../assets/images/banner/banner-03.jpg";

class HomeBanner extends Component {
  render() {
    return (
      <div className="HomeBanner">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <SingleBannerItem image={banner1} />
            </div>
            <div className="col-md-4">
              <SingleBannerItem image={banner2} />
            </div>
            <div className="col-md-4">
              <SingleBannerItem image={banner3} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeBanner;
