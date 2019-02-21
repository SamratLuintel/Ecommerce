import React, { Component } from "react";
import ApplicationSideNavContext from "./applicationSideNavContext";
import MainSideNav from "./MainSideNav/MainSideNav";
import ApplicationHeaderContextProvider from "../ApplicationHeader/ApplicationHeaderContextProvider";

class ApplicationSideNav extends Component {
  state = {
    isSideNavOpen: false
  };
  openSideNav = () => this.setState({ isSideNavOpen: true });
  closeSideNav = () => this.setState({ isSideNavOpen: false });

  render() {
    const contextValue = {
      isSideNavOpen: this.state.isSideNavOpen,
      openSideNav: this.openSideNav,
      closeSideNav: this.closeSideNav
    };
    return (
      <ApplicationSideNavContext.Provider value={contextValue}>
        <div className="ApplicationSideNav">
          <div
            className="ApplicationSideNav__open-btn"
            onClick={this.openSideNav}
          >
            <i className="fas fa-bars" />
          </div>
          <MainSideNav />
        </div>
      </ApplicationSideNavContext.Provider>
    );
  }
}
export default ApplicationSideNav;
