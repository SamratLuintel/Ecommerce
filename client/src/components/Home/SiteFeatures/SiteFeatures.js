import React, { Component } from "react";
import FeatureBox from "./FeatureBox/FeatureBox";

class SiteFeatures extends Component {
  render() {
    return (
      <div className="SiteFeatures">
        <div className="container">
          <div className="SiteFeatures__wrapper">
            <div className="row SiteFeatures--border">
              <div className="col-md-4">
                <FeatureBox
                  icon={<i class="fas fa-shopping-cart" />}
                  title="Free ship over $99"
                  subtitle="Shipping free with order over $99"
                />
              </div>
              <div className="col-md-4">
                <FeatureBox
                  icon={<i class="fas fa-headphones" />}
                  title="SUPPORT ALL THE TIME"
                  subtitle="Free installation, maintenance"
                />
              </div>
              <div className="col-md-4">
                <FeatureBox
                  icon={<i class="fas fa-shopping-bag" />}
                  title="MONEY BACK GUARANTEE"
                  subtitle="Refund policy within 30 days"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SiteFeatures;
