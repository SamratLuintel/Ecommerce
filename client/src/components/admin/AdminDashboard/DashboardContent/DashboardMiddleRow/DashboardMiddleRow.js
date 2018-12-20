import React, { Component } from "react";
import EmailCard from "./EmailCard/EmailCard";
import TopProducts from "./TopProducts/TopProducts";
import AverageDealCard from "./AverageDealCard/AverageDealCard";

class DashboardMiddleRow extends Component {
  render() {
    return (
      <div className="DashboardMiddleRow">
        <div className="row">
          <div className="col-md-3">
            <EmailCard />
          </div>
          <div className="col-md-3">
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
