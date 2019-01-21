import React, { Component } from "react";
import ApplicationSideNavContext from "../applicationSideNavContext";
import classnames from "classnames";

class MainSideNav extends Component {
  static contextType = ApplicationSideNavContext;
  render() {
    return (
      <div
        className={classnames({
          MainSideNav: true,
          "MainSideNav--open": this.context.isSideNavOpen
        })}
      >
        <div
          className="MainSideNav__close-btn"
          onClick={this.context.closeSideNav}
        >
          <i className="fas fa-times" />
        </div>
        <div className="MainSideNav__nav-wrapper">
          <div className="MainSideNav__single-nav">Checkout</div>
          <div className="MainSideNav__single-nav">Admin</div>
          <div className="MainSideNav__single-nav">Logout</div>
        </div>
      </div>
    );
  }
}
export default MainSideNav;
