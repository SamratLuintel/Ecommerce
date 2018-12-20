import React, { Component } from "react";
import DashboardTopRow from "./DashboardTopRow/DashboardTopRow";
import DashboardMiddleRow from "./DashboardMiddleRow/DashboardMiddleRow";

class DashboardContent extends Component {
  render() {
    return (
      <div className="DashboardContent">
        <DashboardTopRow />
        <DashboardMiddleRow />
      </div>
    );
  }
}
export default DashboardContent;
