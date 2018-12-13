import React, { Component } from "react";

class SignUpOAuth extends Component {
  render() {
    return (
      <div className="SignUpOAuth">
        <a
          href="/api/auth/facebook"
          className="SignUpOAuth__element SignUpOAuth__element--blue "
        >
          <i class="fab fa-facebook-f" />
        </a>
        <a
          href="/api/auth/google"
          className="SignUpOAuth__element SignUpOAuth__element--red"
        >
          <i class="fab fa-google" />
        </a>
        <div className="SignUpOAuth__hr">
          <span>Or</span>
        </div>
      </div>
    );
  }
}
export default SignUpOAuth;
