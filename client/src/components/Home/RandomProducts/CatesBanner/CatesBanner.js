import React, { Component } from "react";
import cateBanner from "../../../../assets/images/banner/banner-cate.jpg";
import { withRouter } from "react-router-dom";

class CatesBanner extends Component {
  redirectToTV = () => {
    this.props.history.push("/categories/5c85202e3fc05d0016b4b408");
  };
  render() {
    return (
      <div className="CatesBanner">
        <div
          className="CatesBanner__image"
          style={{ backgroundImage: `url(${cateBanner})` }}
        />
        <p onClick={this.redirectToTV} className="CatesBanner__action-btn">
          Discover Now <i class="fas fa-angle-right" />
        </p>
      </div>
    );
  }
}
export default withRouter(CatesBanner);
