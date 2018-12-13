import React, { Component } from "react";
import Modal from "react-modal";
import ApplicationHeaderContext from "../applicationHeaderContext";
import LogInOAuth from "./LogInOAuth/LogInOAuth";
import LogInManual from "./LogInManual/LogInManual";
import FadeIn from "react-fade-in";
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

class LogInModal extends Component {
  static contextType = ApplicationHeaderContext;
  render() {
    const { props, context } = this;
    return (
      <Modal
        isOpen={this.context.loginModalOpen}
        onRequestClose={this.context.closeLoginModal}
        style={customStyles}
        contentLabel="Log In"
      >
        <div className="LogInModal">
          <div className="LogInModal__cross" onClick={context.closeLoginModal}>
            <i class="fas fa-times" />
          </div>
          <FadeIn>
            <h1 className="LogInModal__title">Customer Login</h1>
            <p className="LogInModal__sub-title">
              Login with your social account
            </p>
            <LogInOAuth />
            <LogInManual />
          </FadeIn>
        </div>
      </Modal>
    );
  }
}
export default LogInModal;
