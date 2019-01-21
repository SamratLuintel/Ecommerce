import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class HeaderTopPanel extends Component {
  renderUserInfo = () => {
    if (!this.props.profile.fetched) return;
    if (this.props.profile.authenticated) {
      return (
        <div className="HeaderTopPanel__right-section HeaderTopPanel__info">
          <span>Welcome {this.props.profile.fullname}</span>,{" "}
          <span
            className="HeaderTopPanel__admin"
            onClick={this.redirectToDashboard}
          >
            Admin Page
          </span>
        </div>
      );
    } else {
      return (
        <div className="HeaderTopPanel__right-section HeaderTopPanel__info">
          <span>
            <i class="far fa-user" />
            Account
          </span>
        </div>
      );
    }
  };

  redirectToDashboard = () => this.props.history.push("/admin/dashboard");

  render() {
    return (
      <div className="HeaderTopPanel">
        <div className="container">
          <div className="HeaderTopPanel__wrapper">
            <div className="HeaderTopPanel__left-section HeaderTopPanel__info">
              <span>
                <i class="fa fa-phone">&nbsp;</i>(+8400) 123 456 789
              </span>
              <span className="HeaderTopPanel__icon--left-margin">
                <i class="far fa-envelope" />
                Email: hello@company.co
              </span>
            </div>
            {this.renderUserInfo()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(connect(mapStateToProps)(HeaderTopPanel));
