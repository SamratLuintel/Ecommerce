import React, { Component } from "react";
import CatesBanner from "./CatesBanner/CatesBanner";
import DynamicRandomProducts from "./DynamicRandomProducts/DynamicRandomProducts";

class RandomProducts extends Component {
  render() {
    return (
      <div className="RandomProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <CatesBanner />
            </div>
            <div className="col-md-9">
              <DynamicRandomProducts />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RandomProducts;
