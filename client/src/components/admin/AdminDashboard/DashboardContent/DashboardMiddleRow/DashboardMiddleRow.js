import React, { Component } from "react";
import EmailCard from "./EmailCard/EmailCard";
import TopProducts from "./TopProducts/TopProducts";
import AverageDealCard from "./AverageDealCard/AverageDealCard";

class DashboardMiddleRow extends Component {
  render() {
    return (
      <div className="DashboardMiddleRow">
        <div className="row">
          <div className="col-md-3 DashboardMiddleRow__first-col">
            <EmailCard />
          </div>
          <div className="col-md-3 DashboardMiddleRow__second-col">
            <TopProducts />
          </div>
          <div className="col-md-6">
            <AverageDealCard />
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardMiddleRow;
