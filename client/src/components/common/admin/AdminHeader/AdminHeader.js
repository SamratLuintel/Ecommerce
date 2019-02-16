import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AdminHeader extends Component {
  redirectToHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="AdminHeader">
        <div
          onClick={this.redirectToHome}
          className="AdminHeader__scroll-top-btn"
        >
          <i className="fas fa-home" />
        </div>
        <div className="AdminHeader__user">
          Hello, <strong>Samrat Luintel</strong>
        </div>
      </div>
    );
  }
}
export default withRouter(AdminHeader);
