import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationHeaderContext from "../../applicationHeaderContext";
import { logOutUser } from "../../../../../store/actions/profile/profile";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

class HeaderControlBlock extends Component {
  static contextType = ApplicationHeaderContext;

  //this button is set dynamically
  logInOrLogOutBtn = () => {
    if (!this.props.profile.fetched) return;
    if (this.props.profile.authenticated) {
      return (
        <div
          className="HeaderControlBlock__action-btn"
          data-tip="Logout"
          onClick={() => this.props.logOutUser(this.props.history)}
        >
          <i className="fas fa-sign-out-alt" />
        </div>
      );
    } else {
      return (
        <div
          className="HeaderControlBlock__action-btn"
          data-tip="Login"
          onClick={this.context.openLoginModal}
        >
          <i className="fas fa-user" />
        </div>
      );
    }
  };

  renderAdmin = () => {
    if (!this.props.profile.fetched) return;
    if (this.props.profile.authenticated) {
      return (
        <div
          className="HeaderControlBlock__action-btn"
          data-tip="Admin"
          onClick={this.redirectToAdminDashboard}
        >
          <i className="fas fa-cog" />
        </div>
      );
    }
    return;
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log("Component did update is called");
    ReactTooltip.rebuild();
  };

  redirectToAdminDashboard = () => {
    this.props.history.push("/admin/dashboard");
  };

  redirectToCheckout = () => {
    this.props.history.push("/checkout");
  };
  render() {
    const { props } = this;
    return (
      <div className="HeaderControlBlock">
        <ReactTooltip effect="solid" />
        <div
          className="HeaderControlBlock__action-btn"
          data-tip="Checkout"
          onClick={this.redirectToCheckout}
        >
          <i className="fas fa-shopping-cart" />
          <span className="HeaderControlBlock__action-btn__counter">
            {props.carts.totalItems}
          </span>
        </div>
        {this.renderAdmin()}
        {this.logInOrLogOutBtn()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  carts: state.carts
});
export default withRouter(
  connect(
    mapStateToProps,
    { logOutUser }
  )(HeaderControlBlock)
);
