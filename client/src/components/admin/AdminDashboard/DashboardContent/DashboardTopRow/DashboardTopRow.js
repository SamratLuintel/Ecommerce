import React, { Component } from "react";
import RevenueCard from "./RevenueCard/RevenueCard";
import HitRateCard from "./HitRateCard/HitRateCard";
import DealsCard from "./DealsCard/DealsCard";
import OrderValueCard from "./OrderValueCard/OrderValueCard";
import CallsCard from "./CallsCard/CallsCard";

class DashboardTopRow extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col-12">
          <RevenueCard />
        </div>
        <div className="col-lg-6 col-12 DashboardTopRow__right-wrapper">
          <div className="row DashboardTopRow__upper-row">
            <div className="col-lg-6 col-12">
              <HitRateCard />
            </div>
            <div className="col-lg-6 col-12">
              <DealsCard />
            </div>
          </div>
          <div className="row DashboardTopRow__bottom-row">
            <div className="col-lg-6 col-12">
              <OrderValueCard />
            </div>
            <div className="col-lg-6 col-12">
              <CallsCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardTopRow;
