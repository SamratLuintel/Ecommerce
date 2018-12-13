import React, { Component } from "react";

class LogInOAuth extends Component {
  render() {
    return (
      <div className="LogInOAuth">
        <a
          href="/api/auth/facebook"
          className="LogInOAuth__element LogInOAuth__element--blue "
        >
          <i class="fab fa-facebook-f" />
        </a>
        <a
          href="/api/auth/google"
          className="LogInOAuth__element LogInOAuth__element--red"
        >
          <i class="fab fa-google" />
        </a>
        <div className="LogInOAuth__hr">
          <span>Or</span>
        </div>
      </div>
    );
  }
}
export default LogInOAuth;
