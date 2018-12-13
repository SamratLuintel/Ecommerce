import React, { Component } from "react";
import Modal from "react-modal";
import ApplicationHeaderContext from "../applicationHeaderContext";
import FadeIn from "react-fade-in";
import SignUpOAuth from "./SignUpOAuth/SignUpOAuth";
import SignUpManual from "./SignUpManual/SignUpManual";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    "z-index": "9999",
    border: "none",
    padding: "0px"
  },
  overlay: {
    background: "rgba(0,0,0,.8)",
    "z-index": "999"
  }
};
Modal.setAppElement("#root");

class SignUpModal extends Component {
  static contextType = ApplicationHeaderContext;
  render() {
    const { props, context } = this;
    return (
      <Modal
        isOpen={this.context.signupModalOpen}
        onRequestClose={this.context.closeSignUpModal}
        style={customStyles}
        contentLabel="Sign Up"
      >
        <div className="SignUpModal">
          <div
            className="SignUpModal__cross"
            onClick={context.closeSignUpModal}
          >
            <i class="fas fa-times" />
          </div>
          <FadeIn>
            <h1 className="SignUpModal__title">Create New Customer Account</h1>
            <p className="SignUpModal__sub-title">
              Register with your social account
            </p>
            <SignUpOAuth />
            <SignUpManual />
          </FadeIn>
        </div>
      </Modal>
    );
  }
}
export default SignUpModal;
