import React, { Component } from "react";
import HitRateDoughnut from "./HitRateDoughnut/HitRateDoughnut";

class HitRateCard extends Component {
  render() {
    return (
      <div className="HitRateCard">
        <div className="HitRateCard__header">
          Hit Rate <span>-12%</span>
        </div>
        <HitRateDoughnut />
      </div>
    );
  }
}
export default HitRateCard;
