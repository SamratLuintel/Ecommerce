import React, { Component, Fragment } from "react";
import ApplicationHeaderContext from "../../applicationHeaderContext";
import { connect } from "react-redux";
import formFields from "./formFields";
import classnames from "classnames";
import { logInUser } from "../../../../../store/actions/profile/profile";

class LogInManual extends Component {
  static contextType = ApplicationHeaderContext;
  state = {
    email: "",
    password: "",
    emailErr: "",
    passwordErr: ""
  };

  onTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      //resetting the error
      [`${e.target.name}Err`]: ""
    });
  };

  setFormError = error => {
    if (error.email) this.setState({ emailErr: error.email });
    if (error.password) this.setState({ passwordErr: error.password });
  };

  renderFormFields = () => {
    return formFields.map(field => {
      const inputClasses = classnames({
        LogInManual__input: true,
        "LogInManual__input--error": this.state[`${field.name}Err`] !== ""
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
            <p className="LogInManual__error">
              {this.state[`${field.name}Err`]}
            </p>
          )}
        </Fragment>
      );
    });
  };

  onLogInUser = async () => {
    try {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      await this.props.logInUser(data);
      this.context.closeLoginModal();
    } catch (error) {
      this.setFormError(error);
    }
  };
  render() {
    return (
      <div className="LogInManual">
        {this.renderFormFields()}
        <p className="LogInManual__required">* Required Fields</p>

        <div onClick={this.onLogInUser} className="LogInManual__log-in-btn">
          LOG IN
        </div>

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
export default connect(
  null,
  { logInUser }
)(LogInManual);
