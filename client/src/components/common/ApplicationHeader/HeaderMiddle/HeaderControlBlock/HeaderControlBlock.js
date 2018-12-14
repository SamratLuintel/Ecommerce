import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationHeaderContext from "../../applicationHeaderContext";
import { logOutUser } from "../../../../../store/actions/profile/profile";
import { withRouter } from "react-router-dom";

class HeaderControlBlock extends Component {
  static contextType = ApplicationHeaderContext;

  //this button is set dynamically
  logInOrLogOutBtn = () => {
    if (!this.props.profile.fetched) return;
    if (this.props.profile.authenticated) {
      return (
        <div
          className="HeaderControlBlock__action-btn"
          onClick={() => this.props.logOutUser(this.props.history)}
        >
          <i class="fas fa-sign-out-alt" />
        </div>
      );
    } else {
      return (
        <div
          className="HeaderControlBlock__action-btn"
          onClick={this.context.openLoginModal}
        >
          <i class="fas fa-user" />
        </div>
      );
    }
  };
  render() {
    const { props } = this;
    return (
      <div className="HeaderControlBlock">
        <div className="HeaderControlBlock__action-btn">
          <i class="fas fa-shopping-cart" />
          <span className="HeaderControlBlock__action-btn__counter">
            {props.carts.totalItems}
          </span>
        </div>
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
