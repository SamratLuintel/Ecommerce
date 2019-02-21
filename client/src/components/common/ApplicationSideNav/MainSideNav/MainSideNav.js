import React, { Component } from "react";
import ApplicationSideNavContext from "../applicationSideNavContext";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { logOutUser } from "../../../../store/actions/profile/profile";
import ApplicationHeaderContext from "../../ApplicationHeader/applicationHeaderContext";

class MainSideNav extends Component {
  static contextType = ApplicationSideNavContext;

  redirectToCheckout = () => {
    this.props.history.push("/checkout");
    this.context.closeSideNav();
  };

  redirectToAdmin = () => {
    this.props.history.push("/admin/dashboard");
    this.context.closeSideNav();
  };

  redirectToHome = () => {
    this.props.history.push("/");
    this.context.closeSideNav();
  };

  onLogOutClick = async () => {
    try {
      await this.props.logOutUser(this.props.history);
      NotificationManager.info("You have successfully logged out");
      this.context.closeSideNav();
    } catch (error) {
      console.log(error);
    }
  };

  onLoginOpen = context => {
    console.log("On login open called");
    context.openLoginModal();
    this.context.closeSideNav();
  };
  render() {
    let content = (
      <div className="MainSideNav__nav-wrapper">
        <div onClick={this.redirectToHome} className="MainSideNav__single-nav">
          Home
        </div>
        <div
          onClick={this.redirectToCheckout}
          className="MainSideNav__single-nav"
        >
          Checkout
        </div>
        <ApplicationHeaderContext.Consumer>
          {context => {
            return (
              <div
                onClick={() => this.onLoginOpen(context)}
                className="MainSideNav__single-nav"
              >
                Log In
              </div>
            );
          }}
        </ApplicationHeaderContext.Consumer>
        <NotificationContainer />
      </div>
    );

    if (this.props.profile.authenticated) {
      content = (
        <div className="MainSideNav__nav-wrapper">
          <div
            onClick={this.redirectToHome}
            className="MainSideNav__single-nav"
          >
            Home
          </div>
          <div
            onClick={this.redirectToCheckout}
            className="MainSideNav__single-nav"
          >
            Checkout
          </div>
          <div
            onClick={this.redirectToAdmin}
            className="MainSideNav__single-nav"
          >
            Admin
          </div>
          <div onClick={this.onLogOutClick} className="MainSideNav__single-nav">
            Logout
          </div>
          <NotificationContainer />
        </div>
      );
    }
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
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    { logOutUser }
  )(MainSideNav)
);
