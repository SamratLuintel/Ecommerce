import React, { Component } from "react";

class AdminHeader extends Component {
  render() {
    return (
      <div className="AdminHeader">
        <div className="AdminHeader__scroll-top-btn">
          <i class="far fa-square" />
        </div>
        <div className="AdminHeader__user">
          Hello, <strong>Samrat Luintel</strong>
        </div>
      </div>
    );
  }
}
export default AdminHeader;
