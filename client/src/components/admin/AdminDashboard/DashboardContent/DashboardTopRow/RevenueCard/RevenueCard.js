import React, { Component } from "react";
import RevenueGraph from "./RevenueGraph/RevenueGraph";

class RevenueCard extends Component {
  render() {
    return (
      <div className="RevenueCard">
        <h2 className="RevenueCard__header">Revenue</h2>
        <div className="RevenueCard__body">
          <div className="RevenueCard__earning-info-wrapper">
            <div className="row">
              <div className="col-md-4">
                <h5 className="RevenueCard__earning-info__heading">
                  Current week
                </h5>
                <h2 className="RevenueCard__earning-info__earning RevenueCard__earning-info__earning--danger">
                  $85,600
                </h2>
              </div>
              <div className="col-md-4">
                <h5 className="RevenueCard__earning-info__heading">
                  Previous Week
                </h5>
                <h2 className="RevenueCard__earning-info__earning">$60,500</h2>
              </div>
            </div>
            <RevenueGraph />
          </div>
        </div>
      </div>
    );
  }
}
export default RevenueCard;
