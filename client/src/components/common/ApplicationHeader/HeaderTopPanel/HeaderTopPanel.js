import React, { Component } from "react";
import { connect } from "react-redux";

class HeaderTopPanel extends Component {
  renderUserInfo = () => {
    if (!this.props.profile.fetched) return;
    if (this.props.profile.authenticated) {
      return (
        <div className="HeaderTopPanel__right-section HeaderTopPanel__info">
          <span>Welcome , {this.props.profile.fullname}</span>
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

  render() {
    return (
      <div className="HeaderTopPanel">
        <div className="container">
          <div className="HeaderTopPanel__wrapper">
            <div className="HeaderTopPanel__left-section HeaderTopPanel__info">
              <span>
                <i class="fa fa-phone">&nbsp;</i>(+8400) 123 456 789
              </span>
              <span>
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

export default connect(mapStateToProps)(HeaderTopPanel);
