import React, { Component } from "react";
import DealsDoughnut from "./DealsDoughnut/DealsDoughnut";

class DealsCard extends Component {
  render() {
    return (
      <div className="DealsCard">
        <div className="DealsCard__content">
          <div className="DealsCard__header">
            Hit Rate -12%
            <span>152/200</span>
          </div>
          <DealsDoughnut />
        </div>
      </div>
    );
  }
}
export default DealsCard;
