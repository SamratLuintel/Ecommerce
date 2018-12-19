import React, { Component } from "react";
import RevenueCard from "./RevenueCard/RevenueCard";

class DashboardContent extends Component {
  render() {
    return (
      <div className="DashboardContent">
        <div className="row">
          <div className="col-md-6">
            <RevenueCard />
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardContent;
