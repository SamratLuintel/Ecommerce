import React, { Component } from "react";
import ApplicationHeaderContext from "../../applicationHeaderContext";

class LogInManual extends Component {
  static contextType = ApplicationHeaderContext;
  render() {
    return (
      <div className="LogInManual">
        <input
          type="text"
          placeholder="Email *"
          className="LogInManual__input"
        />
        <input
          type="password"
          placeholder="Password *"
          className="LogInManual__input"
        />
        <p className="LogInManual__required">* Required Fields</p>

        <div className="LogInManual__log-in-btn">LOG IN</div>

        <p
          className="LogInManual__dont-have-acc"
          onClick={() => {
            this.context.closeLoginModal();
            this.context.openSignUpModal();
          }}
        >
          Don't have an account? Register Now
        </p>
      </div>
    );
  }
}
export default LogInManual;
