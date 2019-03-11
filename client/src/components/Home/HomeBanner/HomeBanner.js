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
              <SingleBannerItem
                name="Audio & Headphones"
                discount="70"
                image={banner1}
                id="5c8520503fc05d0016b4b40a"
              />
            </div>
            <div className="col-md-4">
              <SingleBannerItem
                name="Video Games"
                discount="40"
                image={banner2}
                id="5c8521cb3fc05d0016b4b40d"
              />
            </div>
            <div className="col-md-4">
              <SingleBannerItem
                name="Mobile & Tablets"
                discount="25"
                image={banner3}
                id="5c8520413fc05d0016b4b409"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeBanner;
