import React, { Component } from "react";
import DashboardTopRow from "./DashboardTopRow/DashboardTopRow";
import DashboardMiddleRow from "./DashboardMiddleRow/DashboardMiddleRow";
import WorldVisitorsCard from "./WorldVisitorsCard/WorldVisitorsCard";

class DashboardContent extends Component {
  render() {
    return (
      <div className="DashboardContent">
        <DashboardTopRow />
        <DashboardMiddleRow />
        <WorldVisitorsCard />
      </div>
    );
  }
}
export default DashboardContent;
