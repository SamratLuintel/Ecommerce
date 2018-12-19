import React, { Component } from "react";
import DashboardTopRow from "./DashboardTopRow/DashboardTopRow";

class DashboardContent extends Component {
  render() {
    return (
      <div className="DashboardContent">
        <DashboardTopRow />
      </div>
    );
  }
}
export default DashboardContent;
