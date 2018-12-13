import React, { Component } from "react";
import ApplicationHeaderContext from "../../applicationHeaderContext";

class SignUpManual extends Component {
  static contextType = ApplicationHeaderContext;
  render() {
    return (
      <div className="SignUpManual">
        <legend className="SignUpManual__legend">Personal Information</legend>
        <input
          type="text"
          className="SignUpManual__input"
          placeholder="First Name"
        />
        <input
          type="text"
          className="SignUpManual__input"
          placeholder="Last Name"
        />
        <input
          type="email"
          className="SignUpManual__input"
          placeholder="Email"
        />

        <legend className="SignUpManual__legend">Sign In Information</legend>

        <input
          type="password"
          className="SignUpManual__input"
          placeholder="Password"
        />
        <input
          type="password"
          className="SignUpManual__input"
          placeholder="Confirm Password"
        />

        <button className="SignUpManual__sign-in-btn">Create An Account</button>

        <p
          className="SignUpManual__already-have-acc"
          onClick={() => {
            this.context.closeSignUpModal();
            this.context.openLoginModal();
          }}
        >
          Already have an account? Log In
        </p>
      </div>
    );
  }
}
export default SignUpManual;
