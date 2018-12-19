import React, { Component } from "react";

class DashboardHeader extends Component {
  render() {
    return (
      <div className="DashboardHeader">
        <div className="DashboardHeader__scroll-top-btn">
          <i class="far fa-square" />
        </div>
        <div className="DashboardHeader__user">
          Hello, <strong>Samrat Luintel</strong>
        </div>
      </div>
    );
  }
}
export default DashboardHeader;
