import React, { Component, Fragment } from "react";
import ApplicationHeaderContext from "../../applicationHeaderContext";
import { registerUser } from "../../../../../store/actions/profile/profile";
import { connect } from "react-redux";
import formFields from "./formFields";
import classnames from "classnames";

class SignUpManual extends Component {
  static contextType = ApplicationHeaderContext;

  state = {
    name: "",
    email: "",
    password: "",
    password2: "",

    nameErr: "",
    emailErr: "",
    passwordErr: "",
    password2Err: ""
  };

  onTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      //resetting the error
      [`${e.target.name}Err`]: ""
    });
  };

  onCreateAccount = async () => {
    try {
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      await this.props.registerUser(data);
      this.context.closeSignUpModal();
    } catch (error) {
      this.setFormError(error);
    }
  };

  setFormError = error => {
    if (error.email) this.setState({ emailErr: error.email });
    if (error.name) this.setState({ nameErr: error.name });
    if (error.password) this.setState({ passwordErr: error.password });
    if (error.password2) this.setState({ password2Err: error.password2 });
  };

  renderFormFields = () => {
    return formFields.map(field => {
      const inputClasses = classnames({
        SignUpManual__input: true,
        "SignUpManual__input--error": this.state[`${field.name}Err`] !== ""
      });
      return (
        <Fragment>
          <input
            type={field.type}
            name={field.name}
            className={inputClasses}
            value={this.state[field.name]}
            onChange={this.onTextChange}
            placeholder={field.placeholder}
          />
          {this.state[`${field.name}Err`] && (
            <p className="SignUpManual__error">
              {this.state[`${field.name}Err`]}
            </p>
          )}
        </Fragment>
      );
    });
  };
  render() {
    return (
      <div className="SignUpManual">
        <legend className="SignUpManual__legend">Personal Information</legend>

        {this.renderFormFields()}
        <button
          onClick={this.onCreateAccount}
          className="SignUpManual__sign-in-btn"
        >
          Create An Account
        </button>

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
export default connect(
  null,
  { registerUser }
)(SignUpManual);
