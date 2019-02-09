import React, { Component } from "react";
import FeaturedProductSlider from "./FeaturedProductSlider/FeaturedProductSlider";
import { fetchFeaturedProducts } from "../../../store/actions/products/userProducts";
import { connect } from "react-redux";

class FeaturedProduct extends Component {
  componentDidMount = () => {
    this.props.fetchFeaturedProducts();
  };

  render() {
    return (
      <div className="FeaturedProduct">
        <div className="container">
          <div className="row FeaturedProduct__row">
            <div className="offset-md-3 col-md-9">
              <FeaturedProductSlider />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { fetchFeaturedProducts }
)(FeaturedProduct);
